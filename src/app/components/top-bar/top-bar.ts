import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'obs-top-bar',
  templateUrl: './top-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
})
export class TopBar {
  protected readonly svc = inject(MarketDataService);
  protected readonly isLight = signal(false);

  protected baseSymbol(symbol: string): string {
    return symbol.replace('-PERP', '');
  }

  protected toggleTheme() {
    this.isLight.update((v) => !v);
    document.documentElement.classList.toggle('light');
  }
}
