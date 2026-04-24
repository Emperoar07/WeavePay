# WeavePay

WeavePay is a checkout link and merchant settlement rail for Initia appchains.

Merchants create payment links, buyers connect through InterwovenKit, and invoices settle on a WeavePay Initia EVM rollup with protocol fee capture.

## Hackathon Fit

Track: DeFi and consumer payments

VM: EVM

Network: Initia testnet

Core Initia features:

1. InterwovenKit wallet connection
2. Interwoven bridge entry point
3. Own Initia EVM rollup

## Product Flow

1. Merchant creates an invoice.
2. WeavePay generates a checkout link.
3. Buyer connects with InterwovenKit.
4. Buyer pays the invoice on the WeavePay rollup.
5. The contract splits merchant revenue and protocol fee.
6. Dashboard shows invoice status and settlement state.

## Project Structure

```txt
contracts/src/WeavePay.sol
src/app/page.tsx
src/app/dashboard/page.tsx
src/app/invoices/new/page.tsx
src/app/checkout/[invoiceId]/page.tsx
src/app/settings/page.tsx
src/components/providers.tsx
.initia/submission.json
.env.example
```

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Initia Setup

Expected rollup target:

```txt
VM: EVM
L1: initiation-2
Rollup chain ID: weavepay-1
Native denom: GAS
RPC: http://localhost:26657
REST: http://localhost:1317
JSON RPC: http://localhost:8545
```

After launching the rollup, update `.env.local` with live endpoint values and the deployed WeavePay contract address.

Required app variables:

```bash
NEXT_PUBLIC_INITIA_CHAIN_ID=weavepay-1
NEXT_PUBLIC_INITIA_RPC_URL=http://localhost:26657
NEXT_PUBLIC_INITIA_REST_URL=http://localhost:1317
NEXT_PUBLIC_INITIA_INDEXER_URL=http://localhost:8080
NEXT_PUBLIC_INITIA_JSON_RPC_URL=http://localhost:8545
NEXT_PUBLIC_INITIA_DENOM=GAS
NEXT_PUBLIC_INITIA_DECIMALS=18
NEXT_PUBLIC_WEAVEPAY_CONTRACT=0x...
```

## Pages

1. `/` landing page
2. `/dashboard` merchant dashboard
3. `/invoices/new` invoice creation
4. `/checkout/1041` buyer checkout
5. `/settings` testnet configuration

## Live Transaction Wiring

The frontend uses InterwovenKit to submit MiniEVM `MsgCall` transactions:

1. `createInvoice` on `/invoices/new`
2. `payInvoice` on `/checkout/[invoiceId]`

These actions become live after the rollup is running and `NEXT_PUBLIC_WEAVEPAY_CONTRACT` is set.

## Contract

`WeavePay.sol` supports:

1. invoice creation
2. native token payments
3. ERC20 payments
4. protocol fee split
5. merchant cancellation before payment
6. events for indexers and dashboards

## Submission Checklist

1. Rollup chain ID
2. Contract deployment transaction
3. Live app link
4. Demo video link
5. `.initia/submission.json`
6. README
