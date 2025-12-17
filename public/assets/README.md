# PadWorld Asset Routing Guide

This document outlines the file structure for local image/video assets. 
The application is pre-configured to look for these specific filenames in the `public/assets/` folder.
If a local file is found, it automatically overrides the default remote/cloud URL.

## 📂 Directory: `public/assets/`

### 1. Hero Section (Intro - Section 3.1)
| Filename | Type | Recommended Res | Usage |
|----------|------|-----------------|-------|
| `hero.mp4` | Video | 1920x1080 | **Priority Hero Background.** Cinematic, slow-motion Padel gameplay or futuristic abstract data loops. |
| `hero_poster.jpg` | Image | 1920x1080 | Fallback image displayed while the video loads or on mobile. High contrast, dark-toned. |

### 2. Section Dividers (Parallax Backgrounds)
| Filename | Recommended Res | Usage |
|----------|-----------------|-------|
| `divider_1.jpg` | 4K / 3840x2160 | **"The Arena"** divider (Section 3.2, Matchmaker intro). |
| `divider_2.jpg` | 4K / 3840x2160 | **"Break Limits"** divider (Section 3.5, Coaching intro). |
| `divider_3.jpg` | 4K / 3840x2160 | **"Global Nexus"** divider (Section 3.8, Social intro). |
| `divider_4.jpg" | 4K / 3840x2160 | **"The Code"** divider (Section 3.9, Principle intro). |

### 3. Coaching Mode
| Filename | Recommended Res | Usage |
|----------|-----------------|-------|
| `coaching_bg.jpg` | 1920x1080 | Background image for the AI Coaching/Camera analysis interface. |

### 4. Global Leaderboard Players (Principle Section)
| Filename | Player Rank | Usage |
|----------|-------------|-------|
| `player_01.jpg` | Rank 01 | Alejandro G. (Spain) |
| `player_03.jpg` | Rank 03 | Sofia R. (Argentina) |
| `player_08.jpg` | Rank 08 | Marcus T. (Sweden) |
| `player_12.jpg` | Rank 12 | Elena V. (Italy) |
| `player_15.jpg` | Rank 15 | K. Tanaka (Japan) |
| `player_22.jpg` | Rank 22 | L. Dubois (France) |

---

## ⚠️ How to Use
1. **Name your files** exactly as listed in the "Filename" column above.
2. **Upload/Move** them into the `public/assets/` folder of your project.
3. **Refresh** the application. The system (via `IntroSection.tsx`, `ImageDivider.tsx`, etc.) automatically detects local files and displays them with the pre-configured cinematic effects. No code changes required.