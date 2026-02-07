# ReachInbox — Email Scheduler (starter)

This repository contains a starter implementation for an email scheduler service using BullMQ, Redis, Postgres, Ethereal Email and a minimal Next.js frontend.

Overview:
- Backend: TypeScript + Express + TypeORM + BullMQ
- Worker: BullMQ Worker that processes delayed jobs and sends via Ethereal (nodemailer)
- DB: Postgres (via Docker)
- Queue: Redis (via Docker)
- Frontend: Next.js + Tailwind (minimal)

Key behaviors implemented:
- Schedule emails via `/api/email/schedule` (POST)
- Persist emails in Postgres
- Use BullMQ delayed jobs (jobId set to DB id)
- Worker ensures idempotency by atomically claiming DB rows before sending
- Rate limit per hour using Redis counters (configurable via `MAX_EMAILS_PER_HOUR`)
- Minimum delay between sends enforced across workers using Redis SETNX lock (`MIN_DELAY_MS`)

Run locally (requires Docker):

1. Start Redis and Postgres

```bash
docker-compose up -d
```

2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed
npm run dev

# in another terminal run worker
npm run worker
```

3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Env notes:
- `MIN_DELAY_MS` — minimum delay between sends across workers (default 2000 ms)
- `MAX_EMAILS_PER_HOUR` — hourly limit per sender (default 200)

Design notes:
- Rate limiting uses a Redis hourly counter keyed by sender+hour. `INCR` is atomic so it is safe across workers. When limit is exceeded, the worker re-schedules job to the next hour window.
- Idempotency: Worker updates DB row from `scheduled` -> `processing` using an atomic update; if no rows affected the job is skipped. This prevents duplicate sends.
