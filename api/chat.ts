import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are the "Mensor AI Architect" (Менсор AI Архитектор), a virtual assistant for Mensor, a premier surveying and engineering firm based in Belarus (Minsk), established in 2011.

Mensor specializes in:
1. 3D Laser Scanning & Scan-to-BIM (LOD 200-500).
2. Geodesy and Engineering Surveys (Topo, Monitoring).
3. Digital Twins and Industrial Metrology.
4. Saving construction budgets by detecting collisions early.

Your tone should be:
- Professional, technical, and innovative.
- Use Russian language primarily, as the client is in Belarus (Minsk).
- Precise when discussing LiDAR, Point Clouds (.RCP, .E57), and Revit/ArchiCAD.

Key Knowledge Base:
- Experience: Operating since 2011.
- Equipment: Leica P-series, RTC360, SLAM systems.
- Accuracy: 1-3mm relative accuracy.
- Speed: Up to 15,000 m2 per shift.
- Formats: RVT, PLN, DWG, IFC, RCP, E57.

If asked about pricing, explain that it depends on the area (m2), geometry complexity, and required detail (LOD). Offer to accept a technical task (TZ) for a calculation within 24 hours.

Keep responses concise (under 150 words) unless detailed technical explanation is requested.
`;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  try {
    const body = await parseBody(req);
    const message = body?.message;
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const model = ai.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const contents = [
      ...history.map((entry: any) => ({
        role: entry.role,
        parts: entry.parts,
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    res.status(200).json({ text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to reach Gemini' });
  }
}

async function parseBody(req: any) {
  let data = '';
  for await (const chunk of req) {
    data += chunk;
  }
  return data ? JSON.parse(data) : {};
}
