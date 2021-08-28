import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrometheusModule } from './prometheus/prometheus.module';
import { MetricsService } from './metrics/metrics.service';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [PrometheusModule, MetricsModule],
  controllers: [AppController, MetricsController],
  providers: [AppService, MetricsService],
})
export class AppModule {}
