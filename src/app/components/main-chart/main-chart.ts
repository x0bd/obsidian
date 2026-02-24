import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MarketDataService } from '../../services/market-data.service';

interface CandleBar {
  type: 'bull' | 'bear';
  heightPct: number;
  bottomPct: number;
}

@Component({
  selector: 'obs-main-chart',
  templateUrl: './main-chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainChart implements OnInit, OnDestroy {
  protected readonly svc = inject(MarketDataService);

  protected candles = signal<CandleBar[]>([]);

  private _interval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this._buildCandles();
    this._interval = setInterval(() => this._buildCandles(), 1500);
  }

  ngOnDestroy() {
    if (this._interval) clearInterval(this._interval);
  }

  protected readonly ohlc = computed(() => {
    const p = this.svc.activeInstrument().price;
    const decimals = p < 10 ? 4 : 2;
    const h = (p * 1.0015).toFixed(decimals);
    const l = (p * 0.9985).toFixed(decimals);
    const o = (p * 1.0003).toFixed(decimals);
    return { o, h, l, c: p.toFixed(decimals) };
  });

  protected buy() {
    this.svc.placeOrder('BUY');
  }
  protected sell() {
    this.svc.placeOrder('SELL');
  }

  private _buildCandles() {
    const bars: CandleBar[] = Array.from({ length: 28 }, () => {
      const isBull = Math.random() > 0.42;
      const heightPct = Math.floor(Math.random() * 55) + 8;
      const bottomPct = Math.floor(Math.random() * (85 - heightPct));
      return { type: isBull ? 'bull' : 'bear', heightPct, bottomPct };
    });
    this.candles.set(bars);
  }
}
