import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class MetricsService {

  constructor(
    private promClientService: PrometheusService,
  ) {}

  public get metrics(): Promise<string> {
    return this.promClientService.metrics;
  }

}