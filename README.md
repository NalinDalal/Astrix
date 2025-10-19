# Gambling Website

- **Project:** Build a complex gaming website for profit, similar to Stake
- **Reference:** [Stake-plinko](https://stake.bet/casino/games/plinko?c=okbrvplink3Ind)

[Jargon/Simulation](https://github.com/NalinDalal/plinko-simulation)

**Version:** Final
**Last updated:** 2025-10-18

## 1) High-level Architecture (Mermaid)

```mermaid
%% System Architecture - Refined (GitHub-safe)
flowchart TB
  %% Client layer
  subgraph CLIENT ["Client Layer"]
    A1["Next.js Web App\nReact + TypeScript"]
    A2["Mobile App\nReact Native"]
    A3["Electron Desktop"]
  end

  %% Edge / CDN / WAF
  subgraph EDGE ["Edge Layer - Cloudflare"]
    B1["CDN - Static Assets"]
    B2["WAF - DDoS / Bot Mitigation"]
    B3["Rate Limit - Redis-backed"]
  end

  %% Gateway
  subgraph GATEWAY ["Gateway Layer"]
    C1["API Gateway - NGINX/Kong"]
    C2["WebSocket Gateway - Socket.io Cluster"]
  end

  %% Services
  subgraph SERVICES ["Service Layer - Node.js / TypeScript"]
    D1["Auth Service\nJWT, Sessions, 2FA, KYC"]
    D2["Game Service\nPlinko Engine, Deterministic Simulation"]
    D3["Wallet Service\nBalance mgmt, Ledgers, Fiat/On-chain"]
    D4["RNG Service\nSeed mgmt, HMAC + VRF verification"]
    D5["Blockchain Service\nContract ops, TX watch, Chainlink VRF client"]
    D6["Notification Service\nEmail/SMS/Push/Webhook"]
  end

  %% Message bus / workers
  subgraph MQ ["Message Bus & Workers"]
    E1["Kafka / Redis Streams"]
    E2["Workers: Analytics, Settlements, Withdraws, KYC jobs"]
  end

  %% Data layer
  subgraph DATA ["Data Layer"]
    F1[(Postgres - Primary DB)]
    F2[(Redis Cluster - Cache & Sessions)]
    F3[(ClickHouse - Analytics)]
    F4[(S3 - KYC, Logs)]
  end

  %% Blockchain
  subgraph CHAIN ["Blockchain Layer"]
    G1["Polygon / Arbitrum / Base"]
    G2["Platform Token (ERC-20)"]
    G3["Game Contract (Escrow + Verify)"]
    G4["Chainlink VRF"]
  end

  %% Observability
  subgraph OBS ["Monitoring"]
    H1["Datadog / CloudWatch / Sentry"]
  end

  %% Connections
  A1 --> B1
  A2 --> B1
  A3 --> B1
  B1 --> B2
  B2 --> B3

  B3 --> C1
  B3 --> C2

  C1 --> D1
  C1 --> D3
  C1 --> D5
  C2 --> D2
  C2 --> D6

  D2 --> D4
  D2 --> D3
  D3 --> D5
  D5 --> G1
  D4 --> G4

  D2 --> E1
  D3 --> E1
  D5 --> E1
  E1 --> E2
  E2 --> F3

  D1 --> F1
  D2 --> F1
  D3 --> F1
  D1 --> F2
  D2 --> F2
  D3 --> F2
  D2 --> F3
  D1 --> F4

  D1 -.-> H1
  D2 -.-> H1
  D3 -.-> H1
  F1 -.-> H1

  %% Styling (GitHub/VScode-friendly)
  classDef service fill:#8b5cf6,stroke:#333,stroke-width:1px;
  classDef infra fill:#f97316,stroke:#333,stroke-width:1px;
  class D1,D2,D3 service;
  class D4,D5 infra;
```

---

## 3) Key Design Decisions (short)

- **Hybrid approach**: Fast game loop off-chain (Web2) + on-chain anchoring for fairness and optional on-chain bets.
- **Provably fair**: Server publishes `serverSeedHash` prior to a betting session, signs `serverSeed` after outcome, client seed + server seed deterministic simulation. Optionally verify with Chainlink VRF when high-value bets requested.
- **Wallet model**: Ledger-first — use a double-entry ledger in DB as source of truth; on-chain reconciled asynchronously.
- **Scaling**: WebSocket gateway scale horizontally with sticky sessions (or token-based reconnection), Kafka for event-driven settlement, ClickHouse for analytics.
- **Security**: KYC for withdrawals, rate-limits, hardware HSMs for key storage, signed proofs for seeds.

---

## 4) Minimal API & WebSocket Contracts (examples)

### REST — Auth

`POST /api/v1/auth/login`

Request:

```json
{ "email": "user@example.com", "password": "hunter2" }
```

Response 200:

```json
{
  "token": "eyJhbGci...",
  "refreshToken": "...",
  "user": { "id": "u_123", "username": "nalin" }
}
```

---

### REST — Wallet

`POST /api/v1/wallet/deposit-notify` (internal webhook from payment provider)

Request:

```json
{
  "txId": "tx_abc",
  "userId": "u_123",
  "amount": 100000,
  "currency": "USD",
  "status": "confirmed"
}
```

Response 200:

```json
{ "ok": true }
```

---

### WebSocket — Game channel (events)

Connect: `wss://api.example.com/ws?token=<JWT>`

Subscribe: `{"action":"subscribe"}`
