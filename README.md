# Gather · wedding planning foundation

A modular Next.js foundation for the wedding planning platform described in the repository PDFs. It includes a responsive Admin/Manager workspace shell, sample pages for the planning areas, public wedding/invitation/album page shells, and server-side integration boundaries.

## Start locally

Requirements: Node.js 20.9 or newer and npm.

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts in **demo mode** by default and uses clearly labeled sample content. No production credentials or MongoDB instance are needed. The dashboard is at `/workspace`; guest-facing samples are `/w/anaya-arjun`, `/i/demo-invitation`, and `/album/demo-album`.

To run the worker shell separately:

```sh
npm run worker
```

The demo worker logs its mode and waits for shutdown signals. It does not process jobs. Even with `DEMO_MODE=false`, it deliberately leaves jobs untouched until handlers are implemented.

## Project map

- `src/app`: App Router pages, public route shells, and `/api/health`.
- `src/modules`: feature boundaries for auth, weddings, events, guests, invitations, RSVPs, expenses, albums, photos, jobs, and email.
- `src/infrastructure`: MongoDB connection/index/repository boundaries and R2 adapter setup.
- `src/worker`: separate graceful worker entry point.
- `render.yaml`: Render web and worker service definitions.

The main MongoDB collection names and a first-pass index initializer match the database structure PDF. Call `ensureIndexes()` from an explicitly controlled release task after reviewing existing data; it is not run automatically at app startup.

## Integration status

- **Working locally:** Next.js pages, responsive shell, sample content, health endpoint, password derivation and opaque token primitives using Node.js `crypto`.
- **Boundaries only:** MongoDB connection/repository and index setup; app-owned session/membership and guest-link access interfaces; Cloudflare R2 client creation; Resend client creation; MongoDB job record and atomic claim contract.
- **Not implemented:** login/session cookie routes, guest token exchange and RSVP persistence, business CRUD, R2 presigning or image transformations, email templates/delivery, and job handlers/retries. UI controls labeled “coming soon” are placeholders.

`GET /api/health` reports demo mode as healthy with MongoDB marked `demo`. In live mode it pings MongoDB and returns `503` if MongoDB is unavailable. This reports web readiness; it does not claim the worker or other providers are healthy.

## Environment and deployment

Copy `.env.example` to `.env.local` if you want to configure local services. Keep all provider keys server-side; do not add them to `NEXT_PUBLIC_*` variables. The example contains placeholders only. `render.yaml` defaults both services to demo mode; configure private Render environment values before using real services.

The product documents conflict on auth library use: the architecture proposal says Better Auth, while the database/API documents say application-managed auth without a third-party auth library. The project instruction resolves this scaffold in favor of application-owned auth. The PRD leaves several release behaviors open; those flows remain unimplemented. No separate Stitch export or standalone UI design document was present, so the visual shell uses a restrained editorial wedding palette based on the responsive and guest-friendly product requirements.
