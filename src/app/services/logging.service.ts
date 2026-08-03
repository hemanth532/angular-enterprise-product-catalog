import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private lokiEndpoint = 'http://localhost:3100/loki/api/v1/push';

  constructor(private logger: NGXLogger, private http: HttpClient) {}

  debug(message: string, context?: any) {
    this.logger.debug(message, context);
  }

  info(message: string, context?: any) {
    this.logger.info(message, context);
  }

  warn(message: string, context?: any) {
    this.logger.warn(message, context);
  }

  error(message: string, context?: any) {
    this.logger.error(message, context);
    this.pushToLoki('error', message, context);
  }

  private pushToLoki(level: string, message: string, context?: any) {
    const ts = (Date.now() * 1e6).toString();
    const entry = {
      streams: [
        {
          stream: { level },
          values: [[ts, JSON.stringify({ message, context })]]
        }
      ]
    };
    this.http.post(this.lokiEndpoint, entry).subscribe({
      next: () => {},
      error: () => {}
    });
  }
}
