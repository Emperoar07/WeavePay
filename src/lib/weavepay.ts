import { parseUnits } from "viem";

export const appConfig = {
  chainId: process.env.NEXT_PUBLIC_INITIA_CHAIN_ID || "weavepay-1",
  rpcUrl: process.env.NEXT_PUBLIC_INITIA_RPC_URL || "http://localhost:26657",
  restUrl: process.env.NEXT_PUBLIC_INITIA_REST_URL || "http://localhost:1317",
  indexerUrl: process.env.NEXT_PUBLIC_INITIA_INDEXER_URL || "http://localhost:8080",
  jsonRpcUrl: process.env.NEXT_PUBLIC_INITIA_JSON_RPC_URL || "http://localhost:8545",
  denom: process.env.NEXT_PUBLIC_INITIA_DENOM || "GAS",
  contractAddress: process.env.NEXT_PUBLIC_WEAVEPAY_CONTRACT || "",
  decimals: Number(process.env.NEXT_PUBLIC_INITIA_DECIMALS || 18),
};

export const weavePayAbi = [
  {
    type: "function",
    name: "createInvoice",
    stateMutability: "nonpayable",
    inputs: [
      { name: "merchant", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "metadataURI", type: "string" },
    ],
    outputs: [{ name: "invoiceId", type: "uint256" }],
  },
  {
    type: "function",
    name: "payInvoice",
    stateMutability: "payable",
    inputs: [{ name: "invoiceId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "cancelInvoice",
    stateMutability: "nonpayable",
    inputs: [{ name: "invoiceId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "invoiceCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "protocolFeeBps",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "feeRecipient",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "invoices",
    stateMutability: "view",
    inputs: [{ name: "invoiceId", type: "uint256" }],
    outputs: [
      { name: "merchant", type: "address" },
      { name: "payer", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "feeBps", type: "uint256" },
      { name: "status", type: "uint8" },
      { name: "metadataURI", type: "string" },
      { name: "createdAt", type: "uint64" },
      { name: "paidAt", type: "uint64" },
    ],
  },
] as const;

export const invoiceStatusLabels = ["Unpaid", "Paid", "Canceled"] as const;

export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const demoInvoices = [
  {
    id: "1042",
    label: "WP 1042",
    customer: "Nexa Labs",
    merchant: "Lagos Merchants",
    amount: "420",
    amountLabel: "$420.00",
    status: "Paid",
    route: "Initia L1 to WeavePay",
    time: "2 min ago",
    description: "Design sprint deposit",
  },
  {
    id: "1041",
    label: "WP 1041",
    customer: "Orbit Shop",
    merchant: "Lagos Merchants",
    amount: "125",
    amountLabel: "$125.00",
    status: "Pending",
    route: "Wallet funded on rollup",
    time: "11 min ago",
    description: "Limited drop checkout",
  },
  {
    id: "1040",
    label: "WP 1040",
    customer: "Design DAO",
    merchant: "Lagos Merchants",
    amount: "860",
    amountLabel: "$860.00",
    status: "Paid",
    route: "Interwoven bridge",
    time: "28 min ago",
    description: "Contributor payout escrow",
  },
];

export function toBaseUnits(amount: string) {
  return parseUnits(amount || "0", appConfig.decimals);
}

export function checkoutPath(invoiceId: string) {
  return `/checkout/${invoiceId}`;
}

