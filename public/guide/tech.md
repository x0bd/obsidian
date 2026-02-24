# Project: Obsidian – High-Frequency Quantitative Nerve Center

## 1. Executive Summary

Obsidian is a mission-critical, high-density financial terminal engineered for deep-market intelligence. Designed with a **Cyberpunk-Industrial** aesthetic, it simulates a high-stakes Quantitative Trading desk. The UI features a high-contrast "Burn Orange" on Obsidian black color palette, utilizing **Angular 17 Signals** and **RxJS** to orchestrate thousands of concurrent data points with sub-millisecond latency.

## 2. Technical Stack (The "Hard" Engine)

- **Framework:** Angular 17+ (Standalone Components, Signals-based State).
- **Reactive Engine:** RxJS (Pipeable operators for data throttling and backpressure).
- **Styling:** Tailwind CSS + Custom CSS Variables for "Neon-Glow" effects.
- **Charts:** TradingView Lightweight Charts (Customized with Orange/Amber themes).
- **Performance Strategy:** Exclusive `ChangeDetectionStrategy.OnPush` to ensure the UI stays responsive at 60FPS.

---

## 3. High-Density "Nerve Center" Features

### A. The "Pulse" Order Book

- **The Flex:** A vertically scrolling bid/ask spread where rows flash in **Cyberpunk Orange** when a "Whale Trade" is detected.
- **Under the Hood:** Uses RxJS `windowCount` and `switchMap` to analyze trade volume on-the-fly, triggering Signal updates that change component styles dynamically.

### B. The Kinetic Telemetry Log

- **The Flex:** A monospaced system log at the bottom of the screen that tracks "System Heartbeats." It looks like a terminal boot sequence but tracks live API health and execution status.
- **The Aesthetic:** Uses a "Scanline" overlay and monospaced typography to mimic a hardware-level debugger.

### C. The Volatility Heatmap

- **The Flex:** A grid of 100+ assets where the intensity of the **Orange Glow** represents market volatility.
- **Under the Hood:** Built with Angular's new `@for` block and optimized `track` functions to handle massive grid updates without a single frame drop.

---

## 4. Senior Engineering Flexes for Afrosoft

1. **Real-Time Data Orchestration:** Drawing from my work at **3 Degrees** (Simbisa Brands), I’ve built the backend simulation to mimic the high-concurrency environment of global food retail integrations.
2. **Signal-Driven Architecture:** Moving beyond standard state management, Obsidian uses **Computed Signals** to derive market trends instantly from raw data streams.
3. **Enterprise UI Density:** This isn't a "mobile-first" app; it's a "Data-First" terminal designed for professional monitors, proving I can manage the information density required for Afrosoft’s telecom and health systems.
