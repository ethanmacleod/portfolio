# ethanmacleod.com

My personal website, built to look like a personal homepage from the early 2000s.

Built with TanStack Start (React), Tailwind 4 and Prisma on Postgres, with Redis for counters and rate limits. It deploys to Vercel through Nitro.

## Setup

```sh
npm install
cp .env.example .env
```

Fill in `.env`. The guestbook needs `DATABASE_URL` and `DIRECT_URL`, the visitor and high-five counters need `REDIS_URL`, and the contact form needs the `SMTP_*` values.

## Scripts

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Starts the Vite dev server                          |
| `npm run build`     | Generates the Prisma client and builds to `.output` |
| `npm run start`     | Serves the built app from `.output`                 |
| `npm run typecheck` | Type checks with tsgo                               |
| `npm run lint`      | Lints with oxlint                                   |
| `npm run format`    | Formats with oxfmt                                  |

A lefthook pre-commit hook runs oxfmt on staged files, so you shouldn't need `npm run format` by hand.

## Credits

- The cursor sparkle trail is adapted from [Tinkerbell Magic Sparkle](http://www.mf2fm.com/rv) by mf2fm web-design (2005-13).
- The boids simulation follows Conrad Parker's [boids pseudocode](https://vergenet.net/~conrad/boids/pseudocode.html).
