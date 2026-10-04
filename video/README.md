# Lumora Nails Studio — promo video

15 s vertical promo (1080 × 1920, 30 fps) for Instagram Reels and TikTok, built with [Remotion](https://www.remotion.dev).

| Time | Scene | What happens |
| --- | --- | --- |
| 0–2 s | Hook | An arch of light rises from a gold hairline and opens onto gold chrome nails. |
| 2–5 s | Signature nails | Rack focus on hand-painted nail art, then the premium set floats in an arch over its own defocused reflection. |
| 5–9 s | Services | Nude editorial spreads: Semipermanente, Pedicure and Pestañas, with photo, numeral and type moving at different depths. |
| 9–12 s | Brand | The studio's lit arch draws itself while the camera pulls back from the Lumora sign. |
| 12–15 s | Close | LUMORA NAILS STUDIO · *Detalles que brillan*. |

Source code is in `src/Lumora/`. Photos (copied from the website) are in `public/images/`, and the brand fonts (Cormorant Garamond, Poppins) are in `public/fonts/`.

## Commands

```bash
npm i
npm run dev                                              # preview in Remotion Studio
npx remotion render LumoraPromo out/lumora-promo.mp4     # render the MP4
```

In a Claude Code cloud session, add `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` because Remotion cannot download its own browser there.
