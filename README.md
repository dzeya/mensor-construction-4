<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy the site

This repo uses a standard Vite + Tailwind toolchain for the Mensor marketing site.

## Prerequisites
- Node.js 18+

## Local setup
1) Install dependencies:
   ```bash
   npm install
   ```
2) Run the dev server:
   ```bash
   npm run dev
   ```
3) Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## Deployment (Vercel)
- `vercel.json` is configured for a Vite static build (`dist`).
