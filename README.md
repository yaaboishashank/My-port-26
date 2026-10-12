# Shashank Sharma — React + Express Portfolio

The final portfolio rebuilt as a React application with reusable components, vanilla CSS, GSAP animations, and a small Express MVC API.

The main folder is intentionally named **`portpholio`**, as requested. Its two application folders are **`client`** and **`server`**.

## Start here

Install **Node.js 24 LTS** and open the extracted `portpholio` folder in VS Code. This project requires Node **22.12 or newer** and npm.

Run these commands in the VS Code terminal (PowerShell, Command Prompt, or Bash):

```bash
cd portpholio
npm install
npm run dev
```

If your terminal is already inside `portpholio`, skip the `cd` command.

Open **http://localhost:5173** for the portfolio. The API runs at **http://localhost:5000/api/health**. Press **Ctrl+C** to stop both.

You do not need a database, API key, email service, or environment file to start locally.

## What is included

- The final midnight-blue/lavender design, responsive layouts, and dark/light themes.
- Reusable React components for the hero, projects, skill selector, education, social profiles, contact area, and technology strip.
- Exactly two projects: **HyperClip** and **CampusVerse**.
- Your exact objective and the verified GitHub, LinkedIn, email, project-source, and live-site links.
- A compact animated technology-logo strip using local SVG assets.
- GSAP ScrollSmoother on desktop, staggered name animation, scroll reveals, and animated skill changes.
- Native scrolling on touch devices; reduced-motion support and a persisted animation pause control.
- Accessible project dialogs, keyboard navigation, a skip link, and email copying.
- A small, read-only MVC API, automated tests, configuration examples, and a dependency lockfile.

The removed CV, leadership section, and certification are not included in the UI or public assets. Instagram and Twitter/X remain visibly pending until you add your real URLs.

## Folder guide

| Path                              | Purpose                                                          |
| --------------------------------- | ---------------------------------------------------------------- |
| `client/src/App.jsx`              | Assembles the portfolio sections and project dialog              |
| `client/src/components/sections/` | Main page sections                                               |
| `client/src/components/projects/` | Project cards, illustrations, and modal                          |
| `client/src/components/layout/`   | Header, footer, and scroll progress                              |
| `client/src/components/common/`   | Shared section labels, external links, and logos                 |
| `client/src/context/`             | Theme and animation preferences                                  |
| `client/src/hooks/`               | Content loading, GSAP scrolling, and pointer tilt                |
| `client/src/services/`            | Fetches the Express API                                          |
| `client/src/styles/portfolio.css` | All styling; plain, readable CSS                                 |
| `client/public/logos/`            | Local technology and social vectors                              |
| `server/src/routes/`              | Maps URLs to controller functions                                |
| `server/src/controllers/`         | Handles requests and sends API responses                         |
| `server/src/models/`              | Reads the portfolio data                                         |
| `server/src/data/portfolio.json`  | Main editable content source                                     |
| `server/src/config/`              | Environment settings                                             |
| `server/src/middleware/`          | Consistent 404 and error responses                               |
| `sync-content.mjs`                | Copies server content into the frontend fallback                 |
| `ARCHITECTURE.md`                 | Data flow, MVC explanation, animation setup, and extension guide |

## Edit your content

Edit **`server/src/data/portfolio.json`** for projects, skills, education, objective, email, and profiles. Then restart `npm run dev`, or run:

```bash
npm run sync:content
```

Restart the API after editing the JSON, because the model loads it at startup. Vite automatically updates the client when its synced JSON changes. Root-level `npm run dev` and `npm run build` both sync content automatically.

To enable Instagram and Twitter/X, set the `url` and `handle` values on those profile objects:

```json
{
  "id": "instagram",
  "name": "Instagram",
  "description": "A little beyond the screen",
  "handle": "@your_actual_username",
  "url": "https://www.instagram.com/your_actual_username/"
}
```

The card automatically becomes a working external link when `url` is set. Use your real URL; this example is a placeholder.

The large display name and general profile details come from the JSON. Presentation copy and the decorative `ss` monogram are edited in their section components. Change color variables at the top of `client/src/styles/portfolio.css` and the final refinement block for the existing overrides.

## Commands

| Command                | Result                                                              |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Starts the React client and Express API together                    |
| `npm run dev:client`   | Starts only Vite; local portfolio data is used if the API is absent |
| `npm run dev:server`   | Starts only Express in watch mode                                   |
| `npm run build`        | Syncs data and creates `client/dist`                                |
| `npm start`            | Runs Express and serves `client/dist` if built                      |
| `npm test`             | Runs server API tests and React interaction tests                   |
| `npm run format`       | Formats code and CSS                                                |
| `npm run format:check` | Checks formatting                                                   |

## Test the production setup locally

Stop `npm run dev` first so port 5000 is free. Then:

```bash
npm run build
npm start
```

Open **http://localhost:5000**. Express serves both the built React app and the API from the same origin.

## Configuration and deployment

Example files are supplied in `client/.env.example` and `server/.env.example`. Defaults work locally. Copy an example to `.env` only when you need to change its settings.

For a single Node host:

1. Build command: `npm ci && npm run build`.
2. Start command: `npm start`.
3. Set `NODE_ENV=production`. Leave `SERVE_CLIENT=true`.
4. Let the host provide `PORT`.

For separate frontend and backend hosting:

1. Deploy the client output directory `client/dist` to a static host.
2. Before building the client, set `VITE_API_BASE_URL` to the backend origin, such as `https://your-api.example.com` (without `/api`).
3. Set the server's `CLIENT_ORIGIN` to the exact frontend origin. Multiple origins can be comma-separated.
4. Set `SERVE_CLIENT=false` on the API host and start with `npm start` from the repository root.

Environment variables beginning with `VITE_` are public, compiled into the browser bundle. Do not put secrets in them. The app is configured for deployment at a domain root.

If you change the local API port, also change the Vite proxy target in `client/vite.config.js`. Google Fonts is the only optional visual network dependency; fallback fonts work without it. The SVG logos are included locally.

## API

| Method and endpoint                | Response                     |
| ---------------------------------- | ---------------------------- |
| `GET /api/health`                  | Server status                |
| `GET /api/v1/portfolio`            | All public portfolio content |
| `GET /api/v1/projects`             | The two project records      |
| `GET /api/v1/projects/hyperclip`   | HyperClip details            |
| `GET /api/v1/projects/campusverse` | CampusVerse details          |

Responses follow `{ "success": true, "data": ... }`, with JSON errors for invalid or missing routes. The API does not send email or save messages. Contact buttons open the visitor's email application.

## Validation

The production build, API tests, React interaction tests, and production static-file checks were run during preparation. Browser-based visual verification was unavailable. The project illustrations are the same HTML/CSS interface concepts used in the final portfolio; they are not screenshots of the linked projects. Third-party live sites have their own availability.

`node_modules`, generated `dist`, private `.env` files, and Git history are intentionally excluded from the downloadable source archive. `npm install` restores dependencies using the included lockfile.

## References and assets

- [React documentation](https://react.dev/learn)
- [Vite guide](https://vite.dev/guide/)
- [GSAP ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)
- [GSAP and React](https://gsap.com/resources/React/)
- [Express documentation](https://expressjs.com/)
- Technology and social vectors: [Simple Icons](https://github.com/simple-icons/simple-icons); the LinkedIn mark uses a local SVG. Third-party packages retain their own licenses.
