# Curriculum Vitae

A personal CV / résumé website built with **React** and **JavaScript**, bundled with **Vite**.

> Replace the placeholders marked with `<...>` (project name, your name, repo URL, live link) before publishing.

---

## Tech Stack

- **React** — UI library
- **JavaScript (JSX)** — application code
- **Vite** — dev server and build tool
- **npm** — package manager
- **i18n** — internationalization for multi-language support
- **React Context** — global app state (e.g. active language)

---

## Prerequisites

Make sure you have these installed:

- **Node.js** `22.x` or later (LTS recommended) — check with `node -v`
- **npm** `10.x` or later (ships with Node) — check with `npm -v`

If you don't have Node, download it from [nodejs.org](https://nodejs.org/).

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be available at **http://localhost:5173** (Vite's default port). It hot-reloads as you edit files.

---

## Available Scripts

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Start the local dev server with hot module replacement.   |
| `npm run build`   | Create an optimized production build in `dist/`.          |
| `npm run preview` | Serve the production build locally to test before deploy. |

---

## Project Structure

```
.
├── public/                  # Static assets served as-is (favicon, resume.pdf, etc.)
├── src/
│   ├── assets/              # Images, icons imported by components
│   ├── components/          # Shared, reusable UI components
│   │   ├── Company/         # Company card/entry component
│   │   └── Navbar/          # Navigation bar
│   ├── context/             # React Context providers (global app state)
│   ├── fonts/               # Custom font files
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization setup
│   │   └── translations/    # Per-language translation files
│   ├── Pages/               # One folder per CV section / route
│   │   ├── About/
│   │   ├── Companies/
│   │   ├── Contacts/
│   │   ├── Hobbies/
│   │   ├── Languages/
│   │   ├── Profile/
│   │   ├── Schooling/
│   │   └── Skills/
│   ├── App.jsx              # Root component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template (Vite entry)
├── package.json
└── vite.config.js
```

### Folder roles

- **`components/`** — Reusable building blocks shared across pages (`Company`, `Navbar`).
- **`context/`** — Global state via React Context (e.g. current language, theme).
- **`hooks/`** — Custom hooks that encapsulate shared logic.
- **`i18n/` + `translations/`** — Multi-language support; add a new language by dropping a translation file into `translations/`.
- **`Pages/`** — Each subfolder is a distinct CV section (`About`, `Profile`, `Skills`, `Schooling`, etc.), keeping section markup self-contained.

---

## Building for Production

```bash
npm run build
```

This outputs static files to the `dist/` folder. Verify the build locally before deploying:

```bash
npm run preview
```

---

## Internationalization (i18n)

This site supports multiple languages. Translations live in `src/i18n/translations/`,
with one file per language. The active language is managed through React Context
(`src/context/`), so any component can read the current language and switch it.

To add a new language:

1. Create a new translation file in `src/i18n/translations/` (mirror the keys of an existing one).
2. Register it in your i18n config (`src/i18n/`).
3. Add the language to your language switcher in the UI.

> Keep translation keys identical across all language files — a missing key in one
> language is the most common cause of blank or fallback text.

---

## Deployment

### Vercel

1. Push your repo to GitHub.
2. Import the repo at [vercel.com](https://vercel.com/new).
3. Vercel auto-detects Vite. Defaults are correct:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Every push to your main branch redeploys automatically.

---

## Customization Checklist

- [ ] Update `index.html` `<title>` and meta description
- [ ] Replace favicon in `public/`
- [ ] Fill in each section under `src/Pages/` (Profile, About, Skills, etc.)
- [ ] Complete translation files in `src/i18n/translations/` for every supported language
- [ ] Add a downloadable `resume.pdf` to `public/` and link to it
- [ ] Set Open Graph / social preview meta tags
- [ ] Confirm the site is responsive on mobile

---

## Troubleshooting

- **Port 5173 already in use** → run `npm run dev -- --port 3000` to use another port.
- **Changes not showing** → hard-refresh the browser (Ctrl/Cmd + Shift + R) to clear cache.

---

Built by **Pedro Silvestre** · [Live site](your-live-url) · [Source](https://github.com/Petora12/curriculum-vitae)
