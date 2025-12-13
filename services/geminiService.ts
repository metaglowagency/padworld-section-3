import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Requires process.env.API_KEY to be set
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
