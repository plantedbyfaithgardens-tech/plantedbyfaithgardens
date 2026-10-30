# Tyson, Shadow & Friends Cartoon Studio — launch checklist

This is the working checklist for the first account-linking and device-testing session. It is deliberately honest about what is and is not connected.

## Current code baseline

- One static HTML app, configured for Netlify with `netlify.toml`.
- Fifteen character loaders: Tyson, Shadow, Bruno, Bella, Mary, Martha, Sarah, Putin the Duck, DJ, Matthew the Robin, Bernadette the Sheep, Jackie the Lamb, Richard the Rat, Lorraine the Ladybug, and Wiggles.
- Character artwork libraries, ZIP import, local project storage, project backup/restore, script and scene planning, audio import/recording, motion previews, 3D GLB viewer, mouth-driver test controls, basic WebM export, and a manual publishing/analytics tracker.
- A GitHub Actions workflow checks the 15 loader buttons and JavaScript syntax on pushes/PRs.

## Before calling the app ready

- [ ] Publish the GitHub `main` branch to the separate Netlify project `tyson-shadow-friends-cartoon-studio`.
- [ ] Confirm the live homepage opens on Android Chrome (the last observed Netlify response was HTTP 404, so deployment is not yet verified).
- [ ] Load each of the 15 GLB models and confirm the model is visible; test available animation clips and mouth controls where present.
- [ ] Test character-image upload, ZIP import, backup download, and restore.
- [ ] Test microphone permission, imported audio playback, audio mix, and video export on the actual Android phone.
- [ ] Check whether the browser can save the resulting WebM to Downloads and play it back.
- [ ] Keep an exported backup before testing or clearing site data.

## Account setup order

Create/sign into the accounts with the owner’s own details. Do not paste passwords, recovery codes, API secrets, or private access tokens into the app or chat.

1. **GitHub** — confirm access to [the project repository](https://github.com/plantedbyfaithgardens-tech/plantedbyfaithgardens).
2. **Netlify** — open [the Cartoon Studio project](https://app.netlify.com/projects/tyson-shadow-friends-cartoon-studio), connect the repository/production branch, set the publish directory to the repository root (`.`) if asked, then deploy. Do not change the separate Planted by Faith Garden Service site.
3. **YouTube** — [YouTube Studio](https://studio.youtube.com/). Set channel details and audience settings. For content primarily directed to children, make the appropriate Made for Kids designation for each video/channel as applicable; do not choose a setting just to unlock features.
4. **TikTok** — [TikTok Studio](https://www.tiktok.com/tiktokstudio).
5. **Facebook / Instagram** — [Meta Business Suite](https://business.facebook.com/). Confirm the Facebook Page and Instagram professional account are owned/managed by the same appropriate Meta business and that permissions allow publishing and insights.
6. **ElevenLabs** — [ElevenLabs](https://elevenlabs.io/). Confirm the intended voice IDs and usage rights for each character before any voice generation. The app’s voice register is currently a record/reference view; direct text-to-speech generation is not connected.

## What linking accounts will and will not do

At this stage the app does **not** contain completed OAuth/API connections to YouTube, TikTok, Facebook, Instagram, or ElevenLabs. It cannot publish posts directly, retrieve live analytics, check monetization eligibility/earnings, or sync projects to cloud storage yet. The tracker is manual and can import/export CSV data. Account creation alone will not activate these features; each integration needs supported authorization, permissions, and implementation.

## First testing sequence

1. Open the deployed site in Android Chrome and verify it is the correct Cartoon Studio.
2. Add one test image to a character library, refresh, and verify the project remains available.
3. Export a backup, then test restoring that backup.
4. Load the 3D models one at a time; note any model that fails, appears incorrectly oriented/scaled, or has no usable motion.
5. Test a short scene with one character, then two; export a short WebM and play the downloaded file.
6. Test audio import/recording and final episode export only after the simple visual export succeeds.
7. Only after those checks, begin platform-specific account authorization and publishing workflow work.

## Known limits to keep visible

- Project data is stored locally in the browser/device; there is no cross-device cloud sync.
- Image-sequence rendering needs a sufficiently large set of character frames; 120/200/300 frames are targets, not artwork already included automatically.
- 3D models are loaded into the viewer; this does not mean the whole episode is rendered using the 3D rigs.
- Mouth-driver controls are tests, not true speech-aligned phoneme/viseme lip-sync.
- The current renderer exports WebM where supported; MP4 output is not implemented.
- Real platform publishing, live analytics, monetization reporting, sponsorship tracking, rights records, and automated best-time scheduling remain integration work.

## Privacy and child-safety reminder

Use official account dashboards and grant only the permissions required. Do not upload private child information. Confirm ownership/licensing of artwork, voices, music and sound effects, and review platform audience/disclosure rules before publishing.
