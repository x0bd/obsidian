export interface Instrument {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
}

export interface OrderBookRow {
  price: string;
  size: string;
  total: string;
  depthPct: number;
}

export interface RecentTrade {
  price: string;
  size: string;
  time: string;
  isBid: boolean;
  isWhale: boolean;
  id: number;
}

export interface Position {
  id: number;
  symbol: string;
  sizeLabel: string;
  entry: number;
  mark: number;
  pnlValue: number;
}

export interface TelemetryEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'EXEC' | 'SYS';
  message: string;
}

export interface OrderFeedback {
  message: string;
}
