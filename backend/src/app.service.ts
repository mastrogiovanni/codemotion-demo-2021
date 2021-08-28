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
      [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
    )
  }

  getHello(): string {
    const end = this.httpRequestDurationMicroseconds.startTimer()
    end({ route: '/hello', code: 200, method: '/hello' })
    return 'Hello World!';
  }
}
