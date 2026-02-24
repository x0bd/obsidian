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
        return 'var(--cyber)';
      case 'WARN':
        return 'var(--burn)';
      case 'SYS':
        return '#888';
      default:
        return 'var(--text-dim)';
    }
  }

  protected trackById(_: number, entry: { id: number }) {
    return entry.id;
  }
}
