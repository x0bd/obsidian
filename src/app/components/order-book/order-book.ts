import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'obs-order-book',
  templateUrl: './order-book.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBook {
  protected readonly svc = inject(MarketDataService);
}
