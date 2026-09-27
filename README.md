# Me & Me

**Me & Me** is a personal AI skincare and beauty companion created and owned by **Iqra Sultana**, the Head & Creator of Me & Me.

It understands your skin, recommends products tailored to your concerns, builds personalized routines, explains ingredients, compares products, and guides you through smarter skincare choices — all through a friendly, natural conversation.

## Quick start

```bash
npm install
cp .env.example .env   # fill in values
npm run dev
```

Health check: `GET /health` → `{ "ok": true }`

## Deploy

- **Render**: New → Web Service from this repo, build `npm install`, start `npm start`. Set env vars from `.env.example`. Health check path `/health`. Or `render.yaml` blueprint.
- **Railway / Fly.io**: same build/start commands.
- **Docker**: `docker build -t me-me . && docker run -p 3000:3000 --env-file .env me-me`

Never commit `.env` — `npm run check-secrets` scans staged files pre-push.

## License

MIT
