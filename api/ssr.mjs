// Vercel Function that renders the Angular app on the server (see src/server.ts).
// vercel.json sends every path that is not a static file or /api/* here.
const { reqHandler } = await import('../dist/ecommerce-frontend/server/server.mjs');

export default function handler(req, res) {
  return reqHandler(req, res);
}
