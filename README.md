# Rahul Suresh Chavan — Portfolio Website

**Live site:** [rahulsureshchavan.github.io/My-first-website-end-to-end/](https://rahulsureshchavan.github.io/My-first-website-end-to-end/)

A personal portfolio site showcasing my data analytics work to recruiters and freelance clients — directed and iterated by me, built in collaboration with Claude (Anthropic's AI assistant). No website builder, no template.

---

## About this project

I'm a Data Analyst, not a web developer. This site was built through a hands-on collaboration with Claude (Anthropic's AI assistant): I directed the process — the content, the structure, the design decisions, what to fix and iterate on — while Claude wrote the actual code. Every round of feedback, every layout change, every bug fix came from me testing the live site and prompting specific corrections, back and forth, until it matched what I wanted.

I think this is worth stating plainly rather than implying otherwise: I approached this the way I'd approach a new tool at work — understanding what's possible, directing the outcome, and taking ownership of the result — without pretending to be a front-end developer I'm not. The site itself, the content editor that lets me update it without touching code, and the deployment are all things I can now explain and maintain myself, even though I didn't write the original code by hand.

## Features

- **Bilingual** — full English / German toggle, switches instantly without reloading the page
- **No-code content editing** — a private, password-protected admin page (`admin.html`) lets me edit every section (projects, experience, skills, etc.) through a form and export an updated content file, with no code changes required
- **Fully responsive** — works cleanly on mobile, tablet, and desktop
- **Accessible by default** — respects `prefers-reduced-motion`, semantic HTML, keyboard-navigable
- **Zero cost to run** — hosted free on GitHub Pages, no server, no monthly fees

## Tech stack

| Layer | Choice |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties / design tokens, no framework) |
| Interactivity | Vanilla JavaScript (no build step, no dependencies) |
| Content | JSON-driven — all page text lives in `content.json`, decoupled from markup |
| Hosting | GitHub Pages |

No React, no build tools, no npm packages — deliberately kept dependency-free so it's fast, simple to host for free, and easy for me to maintain without a dev environment.

## How the content system works

All visible text (both languages) lives in [`content.json`](./content.json), separate from the page markup in `index.html`. The site fetches this file on load and renders it dynamically. To make an update, I use `admin.html` — a lightweight form-based editor — which reads the current content, lets me add/edit/remove projects, jobs, or skills, and exports a new `content.json` that I commit back to the repo. Visitors to the public site only ever see the read-only result.

## Project structure

```
├── index.html          # Main site markup
├── admin.html           # Private content editor (not linked from the public site)
├── content.json          # All page text, English & German
├── css/
│   └── style.css        # Design system & layout
├── js/
│   ├── script.js         # Renders content.json into the page, language toggle
│   └── admin.js          # Editor logic for admin.html
└── assets/               # Photo, downloadable CV
```

## About me

Data Analyst based in Magdeburg, Germany — SQL, Power BI, Python, and data warehousing, with cross-functional experience across Finance, Sales, and Supply Chain. 

- **Portfolio:** https://rahulsureshchavan.github.io/My-first-website---end-to-end/
- **LinkedIn:** https://www.linkedin.com/in/rahul-suresh-chavan-737baaa7/
- **Email:** rahulsuresh.chavan@icloud.com
