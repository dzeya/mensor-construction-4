<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI app

This repo now uses a standard Vite + Tailwind toolchain and a serverless Gemini proxy for Vercel.

View your app in AI Studio: https://ai.studio/apps/drive/16FOoKxawJJiGwaqr9E5Bq6v_FM2C-zT2

## Prerequisites
- Node.js 18+
- Gemini API key

## Local setup
1) Install dependencies:
   ```bash
   npm install
   ```
2) Copy env sample and add your key:
   ```bash
   cp .env.example .env.local
   # Set GEMINI_API_KEY=...
   ```
3) Run the dev server:
   ```bash
   npm run dev
   ```
4) Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## Deployment (Vercel)
- `vercel.json` is configured for a Vite static build (`dist`).
- The Gemini proxy lives at `/api/chat` (serverless). Add `GEMINI_API_KEY` in Vercel project settings (Environment Variables).
- No client-side API keys are exposed; all LLM calls flow through the API route.
