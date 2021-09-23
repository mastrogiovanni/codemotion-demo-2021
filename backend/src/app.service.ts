import { Inject, Injectable } from '@nestjs/common';
import { PrometheusService } from './prometheus/prometheus.service';

@Injectable()
export class AppService {

  private httpRequestDurationMicroseconds;

  constructor(private prometheusService: PrometheusService) {

    this.httpRequestDurationMicroseconds = this.prometheusService.registerMetrics(
      'http_request_duration_seconds',
      'Duration of HTTP requests in microseconds',
      ['method', 'route', 'code'],
      [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    )
  }

  async getHello(): Promise<string> {
    const end = this.httpRequestDurationMicroseconds.startTimer();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    end({ route: '/hello', code: 200, method: '/hello' });
    return 'Hello World!';
  }
}
