import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'obs-telemetry-log',
  templateUrl: './telemetry-log.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelemetryLog {
  protected readonly svc = inject(MarketDataService);

  protected levelColor(level: string): string {
    switch (level) {
      case 'EXEC':
        return 'var(--positive)';
      case 'WARN':
        return 'var(--accent)';
      case 'SYS':
        return 'var(--blue)';
      default:
        return 'var(--text-3)';
    }
  }

  protected trackById(_: number, entry: { id: number }) {
    return entry.id;
  }
}
