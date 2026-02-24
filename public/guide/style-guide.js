import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  body: {
    backgroundColor: '#050505',
    color: '#e0e0e0',
    fontFamily: "'JetBrains Mono', monospace",
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
    `,
    backgroundSize: '100% 2px, 3px 100%',
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr 320px',
    gridTemplateRows: '60px 1fr 240px',
    gap: '8px',
    padding: '8px',
    height: '100%',
    width: '100%',
  },
  panel: {
    background: '#0a0a0a',
    border: '1px solid #1A1A1A',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderBottom: '1px solid #1A1A1A',
    background: 'rgba(255, 255, 255, 0.02)',
    fontSize: '0.75rem',
  },
  hazardStripe: {
    height: '4px',
    width: '100%',
    background: 'repeating-linear-gradient(45deg, #050505, #050505 4px, #FF8C00 4px, #FF8C00 8px)',
    opacity: 0.3,
  },
  mainChartArea: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `
      linear-gradient(rgba(26, 26, 26, 0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26, 26, 26, 0.5) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  chartVisual: {
    flex: 1,
    position: 'relative',
    padding: '20px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '4px',
  },
  crosshairOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '20px',
    height: '20px',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  depthBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.1,
    zIndex: 0,
  },
  progressBar: {
    height: '4px',
    background: '#111',
    marginTop: '4px',
    position: 'relative',
    overflow: 'hidden',
  },
  volatilityWarning: {
    fontSize: '10px',
    color: '#FF4500',
    border: '1px solid #FF4500',
    padding: '4px',
    textAlign: 'center',
    background: 'rgba(255, 69, 0, 0.1)',
  },
};

useEffect(() => {}, []);

const PanelLabel = ({ children }) => (
  <span style={{
    fontFamily: "'Rajdhani', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 700,
    color: '#444444',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }}>
    <span style={{ color: '#FF8C00', fontSize: '0.6em', letterSpacing: '-1px' }}>///</span>
    {children}
  </span>
);

const BtnAction = ({ children, danger, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const baseStyle = {
    background: hovered ? (danger ? '#FF4500' : '#FF8C00') : '#050505',
    border: `1px solid ${danger ? '#FF4500' : '#FF8C00'}`,
    color: hovered ? '#000' : (danger ? '#FF4500' : '#FF8C00'),
    padding: '8px 16px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: hovered ? `0 0 15px ${danger ? '#FF4500' : '#FF8C00'}` : 'none',
  };
  return (
    <button
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ProgressFill = ({ width, color }) => (
  <div style={{
    height: '100%',
    background: color || '#FF8C00',
    position: 'relative',
    width,
    animation: 'shine 2s infinite',
  }} />
);

const TopBar = () => (
  <div style={{
    ...customStyles.panel,
    gridColumn: '1 / -1',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '2px solid #1A1A1A',
    padding: '0 16px',
    gap: '24px',
  }}>
    <div style={{
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      color: '#fff',
      position: 'relative',
      paddingRight: '20px',
      marginRight: '20px',
      borderRight: '1px solid #1A1A1A',
    }}>
      Obsidian<span style={{ color: '#FF8C00' }}>.OS</span>
    </div>
    <div style={{ flex: 1, display: 'flex', gap: '32px', overflow: 'hidden', fontSize: '0.8rem', color: '#444444' }}>
      <div style={{ display: 'flex', gap: '8px' }}>BTC <span style={{ color: '#FF8C00' }}>48,291.00</span></div>
      <div style={{ display: 'flex', gap: '8px' }}>ETH <span style={{ color: '#FF8C00' }}>3,102.45</span></div>
      <div style={{ display: 'flex', gap: '8px' }}>SOL <span style={{ color: '#444444', textDecoration: 'line-through' }}>98.20</span></div>
      <div style={{ display: 'flex', gap: '8px' }}>NDX <span style={{ color: '#FF8C00' }}>17,420.10</span></div>
      <div style={{ display: 'flex', gap: '8px' }}>VIX <span style={{ color: '#FF4500' }}>14.20 +2.1%</span></div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#444444', fontSize: '0.7rem' }}>LATENCY: 4ms</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
      <div style={{ width: '8px', height: '8px', background: '#FF8C00', borderRadius: '50%', boxShadow: '0 0 5px #FF8C00' }} />
    </div>
  </div>
);

const MarketWatch = ({ activeSymbol, setActiveSymbol }) => {
  const instruments = [
    { symbol: 'BTC-PERP', price: '48,291', change: '+1.2%', up: true },
    { symbol: 'ETH-PERP', price: '3,102', change: '+0.4%', neutral: true },
    { symbol: 'SOL-PERP', price: '98.20', change: '-0.8%', down: true },
    { symbol: 'XRP-PERP', price: '0.52', change: '0.0%', neutral: true },
    { symbol: 'ADA-PERP', price: '0.48', change: '-1.1%', down: true },
    { symbol: 'AVAX-PERP', price: '34.10', change: '+2.3%', up: true },
  ];

  return (
    <div style={{ ...customStyles.panel, gridRow: '2 / -1', display: 'flex', flexDirection: 'column' }}>
      <div style={customStyles.hazardStripe} />
      <div style={customStyles.panelHeader}>
        <PanelLabel>MARKET WATCH</PanelLabel>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
        </svg>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {instruments.map((item) => (
          <div
            key={item.symbol}
            onClick={() => setActiveSymbol(item.symbol)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '10px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'background 0.1s',
              background: activeSymbol === item.symbol ? 'rgba(255, 140, 0, 0.1)' : 'transparent',
              borderLeft: activeSymbol === item.symbol ? '2px solid #FF8C00' : '2px solid transparent',
            }}
            onMouseEnter={(e) => { if (activeSymbol !== item.symbol) e.currentTarget.style.background = 'rgba(255, 140, 0, 0.05)'; }}
            onMouseLeave={(e) => { if (activeSymbol !== item.symbol) e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ color: activeSymbol === item.symbol ? '#FF8C00' : '#e0e0e0' }}>{item.symbol}</span>
            <span style={{ textAlign: 'right' }}>{item.price}</span>
            <span style={{ textAlign: 'right', color: item.up ? '#FF8C00' : item.down ? '#FF4500' : '#444444' }}>{item.change}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ color: '#444444', fontSize: '10px', marginBottom: '4px' }}>SYSTEM MSG</div>
        <div style={{ fontSize: '0.75rem', color: '#FF8C00' }}>WHALE ALERT: 500 BTC MOVED</div>
      </div>
    </div>
  );
};

const MainChart = ({ activeSymbol, onBuy, onSell }) => {
  const candles = [
    { type: 'bull', height: '40%', marginBottom: '20%' },
    { type: 'bear', height: '20%', marginBottom: '30%' },
    { type: 'bull', height: '50%', marginBottom: '25%' },
    { type: 'bull', height: '15%', marginBottom: '50%' },
    { type: 'bear', height: '30%', marginBottom: '35%' },
    { type: 'bull', height: '60%', marginBottom: '20%' },
    { type: 'bear', height: '10%', marginBottom: '70%' },
    { type: 'bull', height: '45%', marginBottom: '35%' },
    { type: 'bull', height: '25%', marginBottom: '55%' },
    { type: 'bear', height: '35%', marginBottom: '45%' },
    { type: 'bull', height: '70%', marginBottom: '10%' },
    { type: 'bull', height: '20%', marginBottom: '60%' },
  ];

  return (
    <div style={{ ...customStyles.panel, ...customStyles.mainChartArea }}>
      <div style={customStyles.panelHeader}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <PanelLabel>{activeSymbol} [1H]</PanelLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem' }}>
            <span style={{ color: '#444444' }}>O: 48,100</span>
            <span style={{ color: '#444444' }}>H: 48,400</span>
            <span style={{ color: '#444444' }}>L: 48,050</span>
            <span>C: <span style={{ color: '#FF8C00', textShadow: '0 0 8px rgba(255, 140, 0, 0.4)' }}>48,291</span></span>
          </div>
        </div>
      </div>
      <div style={customStyles.crosshairOverlay}>
        <div style={{ position: 'absolute', top: '9px', left: 0, width: '100%', height: '1px', background: 'rgba(255, 140, 0, 0.3)' }} />
        <div style={{ position: 'absolute', left: '9px', top: 0, height: '100%', width: '1px', background: 'rgba(255, 140, 0, 0.3)' }} />
      </div>
      <div style={customStyles.chartVisual}>
        {candles.map((candle, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              height: candle.height,
              marginBottom: candle.marginBottom,
              background: candle.type === 'bull' ? '#FF8C00' : '#333',
              border: candle.type === 'bear' ? '1px solid #FF4500' : 'none',
              boxShadow: candle.type === 'bull' ? '0 0 10px rgba(255, 140, 0, 0.15)' : 'none',
              position: 'relative',
              minWidth: '6px',
            }}
          >
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '-10px',
              bottom: '-10px',
              width: '1px',
              background: candle.type === 'bull' ? '#FF8C00' : '#333',
              opacity: 0.5,
              transform: 'translateX(-50%)',
            }} />
          </div>
        ))}
        <span style={{ fontSize: '10px', color: '#444444', position: 'absolute', right: '8px', bottom: '8px', letterSpacing: '1px' }}>
          SCANNING MODULE 04A // ACTIVE
        </span>
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '8px' }}>
        <BtnAction onClick={onBuy}>BUY MKT</BtnAction>
        <BtnAction danger onClick={onSell}>SELL MKT</BtnAction>
      </div>
    </div>
  );
};

const OrderBook = () => {
  const asks = [
    { price: '48,300.0', size: '0.54', total: '26K', width: '40%' },
    { price: '48,298.5', size: '1.20', total: '58K', width: '60%' },
    { price: '48,295.0', size: '2.50', total: '120K', width: '80%' },
    { price: '48,292.0', size: '0.10', total: '4K', width: '10%' },
  ];
  const bids = [
    { price: '48,291.0', size: '5.00', total: '241K', width: '90%' },
    { price: '48,290.5', size: '1.10', total: '53K', width: '30%' },
    { price: '48,288.0', size: '0.50', total: '24K', width: '15%' },
    { price: '48,285.0', size: '3.20', total: '150K', width: '50%' },
  ];
  const trades = [
    { price: '48,291.0', size: '0.05', time: '14:02:01', bid: true, opacity: 0.7 },
    { price: '48,291.5', size: '1.20', time: '14:02:00', bid: false, opacity: 1 },
    { price: '48,291.0', size: '0.10', time: '14:01:58', bid: true, opacity: 0.5 },
  ];

  return (
    <div style={{ ...customStyles.panel, display: 'flex', flexDirection: 'column', fontSize: '0.75rem' }}>
      <div style={customStyles.panelHeader}>
        <PanelLabel>ORDER BOOK</PanelLabel>
        <span style={{ color: '#444444', fontSize: '10px' }}>L2 DATA</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse', borderBottom: '1px solid #1A1A1A' }}>
          {asks.map((ask, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '4px 12px', position: 'relative' }}>
              <span style={{ zIndex: 1, position: 'relative', color: '#FF4500' }}>{ask.price}</span>
              <span style={{ textAlign: 'right', zIndex: 1, position: 'relative' }}>{ask.size}</span>
              <span style={{ textAlign: 'right', zIndex: 1, position: 'relative' }}>{ask.total}</span>
              <div style={{ ...customStyles.depthBar, width: ask.width, background: '#FF4500' }} />
            </div>
          ))}
        </div>
        <div style={{ padding: '4px 12px', fontSize: '0.7rem', textAlign: 'center', color: '#444444', background: '#000' }}>
          SPREAD 1.0
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {bids.map((bid, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '4px 12px', position: 'relative' }}>
              <span style={{ zIndex: 1, position: 'relative', color: '#FF8C00' }}>{bid.price}</span>
              <span style={{ textAlign: 'right', zIndex: 1, position: 'relative' }}>{bid.size}</span>
              <span style={{ textAlign: 'right', zIndex: 1, position: 'relative' }}>{bid.total}</span>
              <div style={{ ...customStyles.depthBar, width: bid.width, background: '#FF8C00' }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: '120px', borderTop: '1px solid #1A1A1A', background: '#000' }}>
        <div style={{ ...customStyles.panelHeader, padding: '4px 12px', fontSize: '10px' }}>
          <PanelLabel>RECENT TRADES</PanelLabel>
        </div>
        {trades.map((trade, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '4px 12px', position: 'relative', opacity: trade.opacity }}>
            <span style={{ color: trade.bid ? '#FF8C00' : '#FF4500' }}>{trade.price}</span>
            <span style={{ textAlign: 'right' }}>{trade.size}</span>
            <span style={{ textAlign: 'right' }}>{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PositionsPanel = ({ positions, onClose }) => (
  <div style={{ ...customStyles.panel, gridColumn: 2, gridRow: 3 }}>
    <div style={customStyles.panelHeader}>
      <PanelLabel>OPEN POSITIONS</PanelLabel>
      <span style={{ color: '#444444', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
        UNREALIZED PNL: <span style={{ color: '#FF8C00' }}>+ $2,401.20</span>
      </span>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
      <thead>
        <tr>
          {['SYMBOL', 'SIZE', 'ENTRY PRICE', 'MARK PRICE', 'PNL', 'ACTIONS'].map((h) => (
            <th key={h} style={{ padding: '8px 12px', color: '#444444', fontWeight: 400, borderBottom: '1px solid #1A1A1A' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {positions.map((pos, i) => (
          <tr key={i}>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: pos.active ? '#FF8C00' : '#444444' }}>{pos.symbol}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{pos.size}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{pos.entry}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>{pos.mark}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', color: pos.pnl.startsWith('+') ? '#FF8C00' : '#FF4500' }}>{pos.pnl}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <button
                onClick={() => onClose(i)}
                style={{ background: 'none', border: '1px solid #333', color: '#666', fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              >
                CLOSE
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RiskPanel = () => (
  <div style={{ ...customStyles.panel, gridColumn: 3, gridRow: 3, display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
    <div style={{ ...customStyles.panelHeader, margin: '-16px -16px 16px -16px' }}>
      <PanelLabel>RISK ENGINE</PanelLabel>
    </div>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
        <span style={{ color: '#444444' }}>MARGIN USAGE</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>42%</span>
      </div>
      <div style={customStyles.progressBar}>
        <ProgressFill width="42%" color="#FF8C00" />
      </div>
    </div>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
        <span style={{ color: '#444444' }}>LEVERAGE</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FF8C00' }}>10x</span>
      </div>
      <div style={customStyles.progressBar}>
        <ProgressFill width="25%" color="#FF4500" />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #1A1A1A' }}>
      <span style={{ color: '#444444' }}>ACCOUNT EQUITY</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 8px rgba(255, 140, 0, 0.4)' }}>$142,050.22</span>
    </div>
    <div style={{ marginTop: 'auto' }}>
      <div style={customStyles.volatilityWarning}>VOLATILITY WARNING</div>
    </div>
  </div>
);

const TradeFeedback = ({ message, onDismiss }) => (
  <div
    onClick={onDismiss}
    style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: '#0a0a0a',
      border: '1px solid #FF8C00',
      color: '#FF8C00',
      padding: '12px 20px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.8rem',
      zIndex: 9999,
      cursor: 'pointer',
      boxShadow: '0 0 15px rgba(255, 140, 0, 0.2)',
      textTransform: 'uppercase',
    }}
  >
    {message}
  </div>
);

const HomePage = () => {
  const [activeSymbol, setActiveSymbol] = useState('BTC-PERP');
  const [positions, setPositions] = useState([
    { symbol: 'BTC-PERP', size: '2.50 BTC', entry: '47,500.00', mark: '48,291.00', pnl: '+ $1,977.50', active: true },
    { symbol: 'SOL-PERP', size: '100 SOL', entry: '94.00', mark: '98.20', pnl: '+ $420.00', active: true },
    { symbol: 'ETH-PERP', size: '10 ETH', entry: '3,150.00', mark: '3,102.45', pnl: '- $475.50', active: false },
  ]);
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleBuy = () => showFeedback(`ORDER PLACED: BUY MKT ${activeSymbol}`);
  const handleSell = () => showFeedback(`ORDER PLACED: SELL MKT ${activeSymbol}`);
  const handleClose = (i) => {
    const sym = positions[i].symbol;
    setPositions((prev) => prev.filter((_, idx) => idx !== i));
    showFeedback(`POSITION CLOSED: ${sym}`);
  };

  return (
    <div style={{ ...customStyles.body, width: '100%', height: '100vh' }}>
      {feedback && <TradeFeedback message={feedback} onDismiss={() => setFeedback(null)} />}
      <div style={customStyles.layoutGrid}>
        <TopBar />
        <MarketWatch activeSymbol={activeSymbol} setActiveSymbol={setActiveSymbol} />
        <MainChart activeSymbol={activeSymbol} onBuy={handleBuy} onSell={handleSell} />
        <OrderBook />
        <PositionsPanel positions={positions} onClose={handleClose} />
        <RiskPanel />
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Rajdhani:wght@500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { height: 100%; overflow: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #000; }
      ::-webkit-scrollbar-thumb { background: #333; }
      ::-webkit-scrollbar-thumb:hover { background: #FF8C00; }
      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;