# KANA Kinetic Text Lab

KANA Kinetic Text Lab is a beginner-friendly After Effects ScriptUI panel for creating stylish text effects for titles, lyrics, captions, logos, and MV-style motion graphics.

Created by [KANA / KanaWorks_AI](https://x.com/KanaWorks_AI).

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

## Features

- Glitch text reveal
- Cyber decode animation
- Type-on text
- Looping text scramble
- Neon flicker
- Hologram scan effect
- RGB split
- Slice jitter
- Impact title animation
- Echo trail
- Beat-reactive lyrics
- One-click cleanup
- Built-in KanaWorks_AI logo branding
- `X @KanaWorks_AI` button that opens the creator profile

## Requirements

- Adobe After Effects 2026
- macOS or Windows
- No third-party After Effects plugins required

## Installation

### macOS

Copy both of these into the After Effects ScriptUI Panels folder:

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

Target folder:

```text
/Applications/Adobe After Effects 2026/Scripts/ScriptUI Panels/
```

### Windows

Copy both of these into the After Effects ScriptUI Panels folder:

```text
KANA Kinetic Text Lab.jsx
KANA Kinetic Text Lab Assets/
```

Target folder:

```text
C:\Program Files\Adobe\Adobe After Effects 2026\Support Files\Scripts\ScriptUI Panels\
```

Then restart After Effects and open:

```text
Window > KANA Kinetic Text Lab.jsx
```

## Basic Usage

1. Create or select a text layer in an After Effects composition.
2. Open `Window > KANA Kinetic Text Lab.jsx`.
3. Adjust:
   - `Strength`: effect intensity
   - `Speed`: animation speed
   - `Reveal Sec`: reveal duration in seconds
4. Click an effect button.

If nothing happens, make sure the selected layer is a text layer.

The `X @KanaWorks_AI` button opens the creator profile:

```text
https://x.com/KanaWorks_AI
```

If After Effects blocks browser opening, the panel asks whether to enable After Effects script file/network access. Choose OK to allow the panel to open the X profile in the system browser.

## Effects

### Reveal

- `Glitch Reveal`: starts as random characters, then resolves into the original text.
- `Cyber Decode`: a sharper terminal-style decode animation.
- `Type On`: reveals text character by character.
- `Scramble Loop`: keeps characters randomly changing over time.

### Style

- `Neon Flicker`: glowing neon-style flicker.
- `Hologram`: scanlines, glow, noise, and slight signal movement.
- `RGB Split`: red/cyan channel separation.
- `Slice Jitter`: jittery, torn digital text.

### Motion

- `Impact Title`: punchy scale burst for title hits.
- `Echo Trail`: colorful text afterimages.
- `Beat Lyrics`: scale and opacity react to an `Audio Amplitude` layer.

## Beat Lyrics Setup

To make text react to music:

1. Add your audio file to the composition.
2. Select the audio layer.
3. Use `Animation > Keyframe Assistant > Convert Audio to Keyframes`.
4. After Effects creates an `Audio Amplitude` layer.
5. Select your text layer.
6. Click `Beat Lyrics`.

## Cleanup

Click `Clean KTL` to remove effects, expressions, and helper layers created by this panel.

## Notes

This is a ScriptUI panel, not a native C++ After Effects plugin. It works by combining built-in After Effects effects, expressions, and helper layers.

The logo assets are included in `KANA Kinetic Text Lab Assets/`.

No license has been selected yet.
