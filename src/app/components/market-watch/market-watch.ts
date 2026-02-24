import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketDataService } from '../../services/market-data.service';
import { Instrument } from '../../models/market.models';

@Component({
  selector: 'obs-market-watch',
  templateUrl: './market-watch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class MarketWatch {
  protected readonly svc = inject(MarketDataService);

  protected select(inst: Instrument) {
    this.svc.setActiveSymbol(inst.symbol);
  }

  protected pctColor(changePct: number): string {
    if (changePct > 0) return 'var(--cyber)';
    if (changePct < 0) return 'var(--burn)';
    return 'var(--text-dead)';
  }

  protected formatPct(changePct: number): string {
    const sign = changePct >= 0 ? '+' : '';
    return `${sign}${changePct.toFixed(2)}%`;
  }
}
