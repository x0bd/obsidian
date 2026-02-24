import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'obs-risk-engine',
  templateUrl: './risk-engine.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskEngine {
  protected readonly svc = inject(MarketDataService);

  protected readonly marginLabel = computed(() => `${this.svc.marginPct().toFixed(0)}%`);
  protected readonly marginWarning = computed(() => this.svc.marginPct() > 70);

  protected readonly equityLabel = computed(
    () =>
      `$${this.svc.equity().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  );
}
