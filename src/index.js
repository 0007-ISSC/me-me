// Me & Me — WhatsApp-native personal AI skincare companion.
// Created and owned by Iqra Sultana, Head & Creator of Me & Me.
const { handleMessage } = require('./assistant');
const { loadMemory } = require('./memory');

const PORT = process.env.PORT || 3000;

async function main() {
  loadMemory();
  console.log('me-me starting…');

  // Minimal HTTP server for deployment health checks + webhook hookup.
  const http = require('http');
  const server = http.createServer(async (req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, service: 'me-me' }));
      return;
    }
    if (req.url === '/' ) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Me & Me is running. Created by Iqra Sultana.');
      return;
    }
    res.writeHead(404);
    res.end('not found');
  });

  server.listen(PORT, () => console.log(`me-me listening on :${PORT}`));

  // Plug your WhatsApp provider here (e.g. whatsapp-web.js / Baileys).
  // Incoming messages -> handleMessage({ from, text }) -> send reply.
  if (process.stdin.isTTY) {
    console.log('Local mode: type a message, Ctrl+C to exit.');
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', async (chunk) => {
      const text = chunk.trim();
      if (!text) return;
      console.log(await handleMessage({ from: 'local', text }));
    });
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
