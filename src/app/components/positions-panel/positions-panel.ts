import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'obs-positions-panel',
  templateUrl: './positions-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class PositionsPanel {
  protected readonly svc = inject(MarketDataService);

  protected readonly totalPnlLabel = computed(() => {
    const v = this.svc.totalPnl();
    const sign = v >= 0 ? '+' : '';
    return `${sign}$${Math.abs(v).toFixed(2)}`;
  });

  protected readonly totalPnlPositive = computed(() => this.svc.totalPnl() >= 0);

  protected pnlLabel(pnl: number): string {
    const sign = pnl >= 0 ? '+' : '';
    return `${sign}$${Math.abs(pnl).toFixed(2)}`;
  }

  protected close(id: number) {
    this.svc.closePosition(id);
  }
}
