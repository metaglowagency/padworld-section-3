import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Requires process.env.API_KEY to be set
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Audio Context Singleton
let audioContext: AudioContext | null = null;

export const generatePlayerAnalysis = async (
  age: number,
  style: string,
  level: string
): Promise<{ summary: string; improvement: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Act as an elite Padel sports scientist. 
      Analyze a player with these stats: Age ${age}, Style ${style}, Level ${level}.
      
      Return a JSON object with two fields:
      1. "summary": A 1-sentence intense, futuristic technical analysis of their playstyle.
      2. "improvement": A predicted time frame to reach the next tier (e.g., "3.5 MONTHS").
      
      Do not include markdown code blocks. Just the raw JSON string.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "DATA LINK INTERRUPTED. ESTIMATING BASED ON LOCAL CACHE.",
      improvement: "UNKNOWN"
    };
  }
};

export const generateCoachingTip = async (weakness: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
          Give a short, punchy, futuristic coaching command for a Padel player struggling with: ${weakness}.
          Max 15 words. Imperative tone.
        `;
    
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
    
        return response.text?.trim() || "INCREASE REACTION SPEED IMMEDIATELY.";
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "OPTIMIZE FOOTWORK.";
      }
}

export const generateMatchReportSummary = async (): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            Generate 3 bullet points of a futuristic Padel match analysis. 
            Use technical jargon like "Smash Efficiency", "Net Dominance", "Lobe Precision".
            Return as a plain string with newlines.
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        
        return response.text || "Analysis pending...";
    } catch (error) {
        return "Unable to retrieve match telemetry.";
    }
}

// --- TTS Implementation ---

export const speakText = async (text: string): Promise<void> => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"], // Modality.AUDIO
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return Promise.resolve();

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      audioContext,
      24000,
      1
    );
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    return new Promise((resolve) => {
        source.onended = () => resolve();
    });

  } catch (e) {
    console.error("TTS Error", e);
    // Resolve immediately on error to not block the demo flow
    return Promise.resolve();
  }
};

// Helper: Decode Base64 to Uint8Array
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Convert PCM to AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
