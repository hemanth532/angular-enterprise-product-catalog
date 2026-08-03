# Enterprise Product Catalog (Angular)

This project is a sample Angular application built with Angular Material, Signals, and a public product API.

## What this project includes

- Angular application shell with Material UI components
- Product list page loading data from `https://fakestoreapi.com/products`
- Signal-based state tracking in service and component
- Loading and error handling UI
- Unit tests for both service and component
- Strict TypeScript, ESLint, and Karma test configuration

## How to use it

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the application:
   ```bash
   npm start
   ```
3. Run unit tests:
   ```bash
   npm test
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```

## Module Federation and Observability (added)

This workspace includes a basic Module Federation setup and an observability stack.

- Start the dev server with Module Federation wiring:

```bash
npm run start:mf
```

- Run the observability stack (Docker required):

```bash
docker compose -f docker-compose.observability.yml up --build
```

OpenTelemetry is initialized from `src/otel/otel-init.ts` and sends traces/metrics to the OTEL Collector at `http://localhost:4318`.

What this documentation covers:
- How Module Federation is configured and how to consume this app as a remote.
- How OpenTelemetry is initialized and where to change exporters.
- How logs are forwarded to Loki and how to adjust configuration.
- How to run the observability stack and common troubleshooting steps.

Module Federation (quick reference)
- Exposed remote entry: `remoteEntry.js` — produced by `webpack.config.js` when building with `npm run build:mf` or serving with `npm run start:mf`.
- Exposes: `./AppModule` (see `webpack.config.js` exposes section).
- To consume this remote from another host app, use Module Federation's `remotes` configuration and point to `http://<host>:<port>/remoteEntry.js`.
- This workspace also contains a separate React enterprise-grade host at `react-enterprise-mfe-host/` that loads the Angular remote via MF.

OpenTelemetry (quick reference)
- Initialization: `src/otel/otel-init.ts` — currently uses a console exporter for safe local development.
- To send data to the OTEL Collector or an OTLP endpoint, replace the console exporter with an OTLP exporter and ensure the exporter package is added to `package.json`.
- Example change: replace `ConsoleSpanExporter` with an OTLP exporter and set the URL to `http://localhost:4318/v1/traces`.

Logging
- `ngx-logger` is configured in `src/app/app.module.ts` and a `LoggingService` forwards `error()` logs to Loki's push API at `http://localhost:3100/loki/api/v1/push`.
- If you run into CORS or network issues from the browser, create a small proxy endpoint (Node/Express) to accept logs and forward them server-side to Loki or the Collector.

Observability stack (quick commands)
- Start app (dev w/ Module Federation):

```bash
npm run start:mf
```

- Build app (production remote):

```bash
npm run build:mf
```

- Start observability services (Docker required):

```bash
docker compose -f docker-compose.observability.yml up --build
```

Troubleshooting
- Docker daemon not running: start Docker Desktop or the daemon before `docker compose`.
- CORS when sending logs from browser: either enable CORS on the target endpoint, or proxy logs through a server-side endpoint on the same origin.
- If you switch OTEL exporters, ensure the exporter packages are compatible with browser bundling; some exporters are server-only.

Support & next steps
- I can switch the OTEL init to use an OTLP exporter and add the required packages, or add a small log-proxy service to avoid browser CORS issues. Tell me which you prefer and I will update the code and docs accordingly.

> Note: This project was generated for Angular 22 and requires Node.js `24.15.0` or newer.

## Key features

- `AppComponent` provides the application shell and toolbar.
- `ProductService` fetches product data and manages loading and error state.
- `ProductListComponent` renders product cards with Material styles.
- Signals are used to keep state reactive and simple.

## Why use this project

This app demonstrates a modern enterprise Angular setup with:

- strong typing and strict compile settings
- single responsibility by separating services, models, and UI components
- reusable Material design patterns
- adequate test coverage for business behavior

## File names and purpose

The companion document `project-files-explanation.md` explains every file and important Angular concepts in detail.
