Observability stack (Prometheus, Grafana, Loki, Jaeger, OTEL Collector)

Run the stack (Docker required):

```bash
docker compose -f docker-compose.observability.yml up --build
```

What it provides:
- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090
- Loki: http://localhost:3100
- Jaeger UI: http://localhost:16686
- OTEL Collector OTLP endpoints: http://localhost:4318 (HTTP), gRPC: localhost:4317

Notes:
- The Angular app's OpenTelemetry init posts traces/metrics to the OTEL Collector endpoints.
- `ngx-logger` is configured to POST error logs to `/api/logs` by default; you can route these through a small proxy or forward them to the collector or Loki directly.

Configuration notes
- OTEL Collector: see `otel-collector-config.yaml` — it receives OTLP and forwards traces to Jaeger and metrics to Prometheus. Adjust exporters under `exporters:` as needed.
- Loki: `loki-config.yaml` is a simple local config for development. For production use a durable storage backend and proper retention.

Grafana
- After the stack is up, add data sources in Grafana: Prometheus (http://prometheus:9090) and Loki (http://loki:3100).
- Import or create dashboards for metrics and logs. Example dashboards:
	- Prometheus Node/OTEL metrics: create a panel querying `otel_*` metrics or instrument your app-specific meters.
	- Logs: use Loki query language `{level="error"}` to find error logs forwarded from the app.

Security & production
- The provided configs are for local development only. For production, secure Grafana, enable authentication for Loki, and configure TLS and authentication for the OTEL Collector exporters.

Next steps you can ask me to implement
- Replace console OTEL exporter with browser OTLP exporter and add exporter packages.
- Add a small Node proxy to receive browser logs and forward them to Loki/Collector to avoid CORS.
- Provision Grafana dashboards automatically.
