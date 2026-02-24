import { Injectable, signal, computed } from '@angular/core';
import { interval } from 'rxjs';
import {
  Instrument,
  OrderBookRow,
  RecentTrade,
  Position,
  TelemetryEntry,
} from '../models/market.models';

const SYMBOLS = ['BTC-PERP', 'ETH-PERP', 'SOL-PERP', 'XRP-PERP', 'ADA-PERP', 'AVAX-PERP'];

const BASE_PRICES: Record<string, number> = {
  'BTC-PERP': 48291,
  'ETH-PERP': 3102.45,
  'SOL-PERP': 98.2,
  'XRP-PERP': 0.52,
  'ADA-PERP': 0.48,
  'AVAX-PERP': 34.1,
};

let _tradeId = 0;
let _telId = 100;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals);
}
function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  // ─── Instruments ───────────────────────────────────────────────
  private readonly _instruments = signal<Instrument[]>(
    SYMBOLS.map((s) => ({ symbol: s, price: BASE_PRICES[s], change: 0, changePct: 0 })),
  );
  readonly instruments = this._instruments.asReadonly();

  // ─── Active symbol ─────────────────────────────────────────────
  readonly activeSymbol = signal<string>('BTC-PERP');

  readonly activeInstrument = computed(() => {
    const sym = this.activeSymbol();
    return this._instruments().find((i) => i.symbol === sym) ?? this._instruments()[0];
  });

  // ─── Order Book ────────────────────────────────────────────────
  readonly asks = signal<OrderBookRow[]>(this._genAsks(BASE_PRICES['BTC-PERP']));
  readonly bids = signal<OrderBookRow[]>(this._genBids(BASE_PRICES['BTC-PERP']));

  // ─── Recent Trades ─────────────────────────────────────────────
  readonly recentTrades = signal<RecentTrade[]>(this._genInitTrades(BASE_PRICES['BTC-PERP']));

  // ─── Positions ─────────────────────────────────────────────────
  readonly positions = signal<Position[]>([
    { id: 1, symbol: 'BTC-PERP', sizeLabel: '2.50 BTC', entry: 47500, mark: 48291, pnlValue: 0 },
    { id: 2, symbol: 'SOL-PERP', sizeLabel: '100 SOL', entry: 94.0, mark: 98.2, pnlValue: 0 },
    { id: 3, symbol: 'ETH-PERP', sizeLabel: '10 ETH', entry: 3150, mark: 3102.45, pnlValue: 0 },
  ]);

  // ─── Telemetry log ────────────────────────────────────────────
  readonly telemetry = signal<TelemetryEntry[]>(this._initTelemetry());

  // ─── Risk ─────────────────────────────────────────────────────
  readonly marginPct = signal(42);
  readonly leveragePct = signal(25);
  readonly equity = signal(142050.22);

  // ─── Toast ────────────────────────────────────────────────────
  readonly toastMessage = signal<string | null>(null);

  // ─── Computed ─────────────────────────────────────────────────
  readonly totalPnl = computed(() => this.positions().reduce((sum, p) => sum + p.pnlValue, 0));

  constructor() {
    // Price tick every 600ms
    interval(600).subscribe(() => this._tickPrices());
    // Order book every 400ms
    interval(400).subscribe(() => this._tickOrderBook());
    // Telemetry every 2.8s
    interval(2800).subscribe(() => this._tickTelemetry());
    // Equity drift every 1.5s
    interval(1500).subscribe(() => {
      this.equity.update((v) => parseFloat((v + rand(-120, 180)).toFixed(2)));
      this.marginPct.update((v) => Math.min(95, Math.max(10, v + rand(-2, 2))));
    });
  }

  // ─── Actions ──────────────────────────────────────────────────
  setActiveSymbol(sym: string) {
    this.activeSymbol.set(sym);
  }

  placeOrder(side: 'BUY' | 'SELL') {
    const sym = this.activeSymbol();
    const price = this.activeInstrument().price.toFixed(2);
    const msg = `ORDER PLACED: ${side} MKT ${sym} @ ${price}`;
    this.toastMessage.set(msg);
    this._addTelemetry('EXEC', `${side} MKT ${sym} — filled @ ${price}`);
    setTimeout(() => this.toastMessage.set(null), 3200);
  }

  closePosition(id: number) {
    const pos = this.positions().find((p) => p.id === id);
    if (!pos) return;
    this.positions.update((ps) => ps.filter((p) => p.id !== id));
    this._addTelemetry('EXEC', `POSITION CLOSED: ${pos.symbol} | PNL locked`);
    this.toastMessage.set(`POSITION CLOSED: ${pos.symbol}`);
    setTimeout(() => this.toastMessage.set(null), 3200);
  }

  // ─── Private helpers ──────────────────────────────────────────
  private _tickPrices() {
    this._instruments.update((instruments) =>
      instruments.map((inst) => {
        const move = rand(-0.0015, 0.0015);
        const newPrice = parseFloat((inst.price * (1 + move)).toFixed(inst.price < 10 ? 4 : 2));
        const base = BASE_PRICES[inst.symbol];
        const change = newPrice - base;
        return { ...inst, price: newPrice, change, changePct: (change / base) * 100 };
      }),
    );
    // Sync order book to active price
    const mid = this.activeInstrument().price;
    this.asks.set(this._genAsks(mid));
    this.bids.set(this._genBids(mid));
    // Sync position marks
    this.positions.update((ps) =>
      ps.map((pos) => {
        const inst = this._instruments().find((i) => i.symbol === pos.symbol);
        if (!inst) return pos;
        const mark = inst.price;
        // rough pnl calculation based on size label
        const units = parseFloat(pos.sizeLabel.split(' ')[0]);
        const pnlValue = (mark - pos.entry) * units;
        return { ...pos, mark, pnlValue };
      }),
    );
    // Random recent trade
    const mid2 = this.activeInstrument().price;
    const isWhale = Math.random() < 0.05;
    const trade: RecentTrade = {
      id: ++_tradeId,
      price: mid2.toFixed(mid2 < 10 ? 4 : 2),
      size: rand(0.01, isWhale ? 25 : 2).toFixed(3),
      time: nowTime(),
      isBid: Math.random() > 0.5,
      isWhale,
    };
    this.recentTrades.update((trades) => [trade, ...trades].slice(0, 12));
    if (isWhale) {
      this._addTelemetry(
        'WARN',
        `WHALE ALERT: ${rand(100, 800).toFixed(0)} ${this.activeSymbol().split('-')[0]} MOVED`,
      );
    }
  }

  private _tickOrderBook() {
    const mid = this.activeInstrument().price;
    this.asks.set(this._genAsks(mid));
    this.bids.set(this._genBids(mid));
  }

  private _tickTelemetry() {
    const messages: Array<[TelemetryEntry['level'], string]> = [
      ['SYS', 'HEARTBEAT // FEED-A NOMINAL'],
      ['INFO', `LATENCY PROBE: ${rand(2, 8).toFixed(0)}ms`],
      ['INFO', `VIX SNAPSHOT: ${rand(12, 22).toFixed(2)}`],
      ['SYS', 'RISK ENGINE RECALC COMPLETE'],
      ['WARN', `SPREAD WIDENED: ${this.activeSymbol()} +${rand(0.5, 2.5).toFixed(1)}`],
      ['INFO', 'ORDER BOOK DEPTH SYNC OK'],
      ['SYS', `MODULE 04A ACTIVE // SCAN CYCLE ${Math.floor(rand(100, 999))}`],
    ];
    const [level, message] = messages[Math.floor(Math.random() * messages.length)];
    this._addTelemetry(level, message);
  }

  private _addTelemetry(level: TelemetryEntry['level'], message: string) {
    const entry: TelemetryEntry = { id: ++_telId, timestamp: nowTime(), level, message };
    this.telemetry.update((t) => [entry, ...t].slice(0, 60));
  }

  private _genAsks(mid: number): OrderBookRow[] {
    const decimals = mid < 10 ? 4 : 2;
    const rows: OrderBookRow[] = [];
    const maxSize = rand(3, 8);
    for (let i = 4; i >= 1; i--) {
      const price = mid + i * rand(0.1, 0.5) * (mid / 1000);
      const size = rand(0.05, maxSize);
      const total = price * size;
      rows.push({
        price: fmt(price, decimals),
        size: fmt(size, 3),
        total: _fmtTotal(total),
        depthPct: Math.round(rand(15, 95)),
      });
    }
    return rows;
  }

  private _genBids(mid: number): OrderBookRow[] {
    const decimals = mid < 10 ? 4 : 2;
    const rows: OrderBookRow[] = [];
    const maxSize = rand(3, 8);
    for (let i = 1; i <= 4; i++) {
      const price = mid - i * rand(0.1, 0.5) * (mid / 1000);
      const size = rand(0.05, maxSize);
      const total = price * size;
      rows.push({
        price: fmt(price, decimals),
        size: fmt(size, 3),
        total: _fmtTotal(total),
        depthPct: Math.round(rand(15, 95)),
      });
    }
    return rows;
  }

  private _genInitTrades(mid: number): RecentTrade[] {
    return Array.from({ length: 8 }, (_, i) => ({
      id: ++_tradeId,
      price: (mid - i * rand(0, 1)).toFixed(mid < 10 ? 4 : 2),
      size: rand(0.01, 3).toFixed(3),
      time: nowTime(),
      isBid: Math.random() > 0.5,
      isWhale: false,
    }));
  }

  private _initTelemetry(): TelemetryEntry[] {
    const e = (level: TelemetryEntry['level'], message: string): TelemetryEntry => ({
      id: ++_telId,
      timestamp: nowTime(),
      level,
      message,
    });
    return [
      e('SYS', 'OBSIDIAN.OS v3.1.4 BOOT SEQUENCE COMPLETE'),
      e('SYS', 'NEURAL FEED ENGINE INITIALISED'),
      e('INFO', 'MARKET DATA STREAMS CONNECTED: 6 INSTRUMENTS'),
      e('SYS', 'RISK ENGINE ONLINE // MARGIN CHECKS ACTIVE'),
      e('INFO', 'ORDER BOOK DEPTH FEED: L2 READY'),
    ].reverse();
  }
}

function _fmtTotal(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toFixed(0);
}
