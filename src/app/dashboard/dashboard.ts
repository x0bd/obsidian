import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TopBar } from '../components/top-bar/top-bar';
import { MarketWatch } from '../components/market-watch/market-watch';
import { MainChart } from '../components/main-chart/main-chart';
import { OrderBook } from '../components/order-book/order-book';
import { PositionsPanel } from '../components/positions-panel/positions-panel';
import { RiskEngine } from '../components/risk-engine/risk-engine';
import { TelemetryLog } from '../components/telemetry-log/telemetry-log';
import { MarketDataService } from '../services/market-data.service';

@Component({
  selector: 'obs-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopBar, MarketWatch, MainChart, OrderBook, PositionsPanel, RiskEngine, TelemetryLog],
})
export class Dashboard {
  protected readonly svc = inject(MarketDataService);
}
