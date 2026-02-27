# Souvik Mahanta — Portfolio

> Cinematic, ultra-premium portfolio built with React + Vite + Framer Motion.

---

## Prerequisites

Make sure these are installed on your machine before starting.

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Git | any | `git --version` |

Download Node.js from [nodejs.org](https://nodejs.org) if you don't have it.

---

## Step 1 — Scaffold a Vite + React project

Open your terminal and run:

```bash
npm create vite@latest souvik-portfolio -- --template react
cd souvik-portfolio
```

---

## Step 2 — Install dependencies

```bash
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Step 3 — Configure Tailwind

Open `tailwind.config.js` and replace its contents with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

Open `src/index.css` and replace everything with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Step 4 — Drop in the portfolio file

Copy `SouvikPortfolio.jsx` (the file you downloaded) into the `src/` folder of your project.

Then open `src/App.jsx` and replace everything with:

```jsx
import SouvikPortfolio from './SouvikPortfolio'

export default function App() {
  return <SouvikPortfolio />
}
```

---

## Step 5 — Add your assets

Create these folders inside `src/`:

```
src/
└── assets/
    ├── branding/
    │    └── souvik.svg          ← your signature SVG (optional)
    ├── profile/
    │    └── profile.jpg         ← your photo
    └── background-art/
         └── *.jpg / *.png       ← art images for cursor trail (optional)
```

> The site works fine without these files — they just add the personal touch. The signature and cursor trail have elegant fallbacks built in.

---

## Step 6 — Run locally

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

You should see the preloader animation, then the full portfolio.

---

## Step 7 — Build for production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with your optimised static site.

To preview the production build locally before deploying:

```bash
npm run preview
```

---

## Deploying

### Vercel (recommended — free)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site goes live in under 60 seconds.

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder at netlify.com/drop
```

### GitHub Pages

```bash
npm install -D gh-pages
```

Add this to `package.json` scripts:

```json
"deploy": "gh-pages -d dist"
```

Then:

```bash
npm run build
npm run deploy
```

---

## Project Structure

```
souvik-portfolio/
├── src/
│   ├── assets/
│   │   ├── branding/
│   │   │   └── souvik.svg
│   │   ├── profile/
│   │   │   └── profile.jpg
│   │   └── background-art/
│   ├── SouvikPortfolio.jsx     ← main portfolio component
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Customisation Cheatsheet

| What to change | Where to find it |
|---------------|-----------------|
| Name, bio, tagline | `HERO` section in `SouvikPortfolio.jsx` |
| Services | `SERVICES` array near the top |
| Projects | `PROJECTS` array near the top |
| Skills | `SKILLS` array near the top |
| Colour scheme | `:root` CSS variables in `GlobalStyles` |
| Fonts | `@import` line in `GlobalStyles` |
| Email / links | `CONTACT` section and `Nav` component |

---

## Troubleshooting

**Blank screen on load**
→ Check the browser console (`F12`). Usually a missing import or syntax error.

**Framer Motion not found**
→ Run `npm install framer-motion` again and restart the dev server.

**Fonts not loading**
→ You need an internet connection — fonts load from Google Fonts.

**Port 5173 already in use**
→ Run `npm run dev -- --port 3000` to use a different port.

---

## Tech Stack

- **React 18** — UI
- **Vite** — Build tool
- **Framer Motion** — All animations
- **Tailwind CSS** — Utility styles
- **Google Fonts** — Cormorant Garamond, Syne, DM Mono

---

*Built by Souvik Mahanta · souvikmahanta2003@gmail.com*