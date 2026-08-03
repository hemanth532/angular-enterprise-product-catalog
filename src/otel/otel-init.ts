import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
// Avoid importing the shared `@opentelemetry/instrumentation` wrapper
// to prevent pulling node-only modules into the browser bundle.
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { MeterProvider } from '@opentelemetry/sdk-metrics';

// Trace setup (console exporter as a safe default)
const traceExporter = new ConsoleSpanExporter();

const tracerProvider = new WebTracerProvider();
tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
tracerProvider.register();

// Metrics setup (basic placeholder)
const meterProvider = new MeterProvider({});

// Auto-instrument XHR/fetch and page load (enable manually)
new DocumentLoadInstrumentation().enable();
new FetchInstrumentation({
  ignoreUrls: [/localhost:4318/],
  propagateTraceHeaderCorsUrls: [/.*/]
}).enable();

console.info('OpenTelemetry initialized (traces -> http://localhost:4318/v1/traces)');
