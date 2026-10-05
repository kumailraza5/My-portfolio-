# Kumail Raza Portfolio — Render Static Site

A standalone React + TypeScript + Vite export of the latest portfolio.
The components, CSS, screenshots, technology logos, portrait and intro video
are copied from the published portfolio. No database, backend, ChatGPT login,
HeyGen API key or environment secrets are needed.

## Deploy to Render (Roman Urdu)

1. ZIP extract karo. `Kumail-Portfolio-Render` folder ke andar files hain.
2. GitHub par naya repository banao aur is folder ka content push/upload karo.
   Repository root mein `package.json`, `package-lock.json`, `index.html`,
   `src/` aur `public/` hone chahiye. Sirf ZIP upload mat karna.
3. Render Dashboard → **New → Static Site** select karo aur repository connect karo.
4. Settings:

| Setting | Value |
| --- | --- |
| Branch | Apni uploaded branch, aam tor par `main` |
| Root Directory | Blank, agar package.json repo root mein hai |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |
| Start Command | Static Site ke liye nahi chahiye |
| Database | Nahi chahiye |
| API keys | Nahi chahiye |

5. Optional: `SKIP_INSTALL_DEPS=true` set karo taake Render automatic dependency
   install skip kare; build command khud `npm ci` chalati hai.
6. **Create Static Site** click karo. Build successful hone par Render ka URL khol lo.

`render.yaml` bhi included hai. Render Blueprint se repo connect karoge to
static site ki settings is file se mil jayengi. Manual Static Site setup mein
upar wali settings use karo. Existing service reuse kar rahe ho to uska type
Static Site hona chahiye.

## Run on your computer

Use Node.js 22.16.0 or a compatible newer version (minimum 22.13).
Open a terminal inside this extracted project folder:

```bash
npm ci
npm run dev
```

Open the localhost URL printed in the terminal. For production output:

```bash
npm run build
npm run preview
```

Do not double-click index.html: React source needs Vite's server or a build.

## Audio/video and content: no database

- `public/intro.webm`: the introduction video WITH its voice/audio track.
- `public/portrait.png`: the seated image shown before/after playback.
- `public/tech/`: technology logos.
- `public/`: project screenshots, including Zeina Atelier and ScentedVenture.
- `src/App.tsx`: project descriptions, links, about text and contact details.
- `src/globals.css`: theme, responsive layout and animations.
- `src/HeroPortrait.tsx`: introduction playback behavior.

Vite copies the public assets into `dist` during build. Render serves them
from your own site, e.g. `https://your-site.onrender.com/intro.webm`.
You do not need Supabase, MongoDB, PostgreSQL, Cloudinary or a separate video host.
Contact links open the visitor's email app; no contact submissions are stored.
Google Fonts remains the same external font dependency as in the original site.

To change content later, edit the relevant files and push the changes to GitHub;
Render can redeploy the connected branch automatically.

## Introduction playback

The initial page load attempts to play the introduction once WITH sound.
Browsers can block autoplay with sound until the visitor interacts. When blocked,
the portrait and play button remain available. Clicking play starts the intro;
when it ends, the portrait returns. The same button supports replay/stop.
Playback stops when the hero goes offscreen or the tab becomes hidden.
No video loop or separate voice control is added.

## Verification

The export is validated with a TypeScript check and production build. Asset
bytes and portfolio component/CSS files are compared with the latest source.
No Render account deployment or browser/device visual test was performed here.
After deploying, check the hero, intro sound/replay, project filters, modal links,
mobile menu and your preferred phones/browsers.

## Official Render references

- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
