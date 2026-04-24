"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { defineChain } from "viem";
import { PropsWithChildren, useMemo } from "react";
import {
  InterwovenKitProvider,
  TESTNET,
  injectStyles,
} from "@initia/interwovenkit-react";
import InterwovenKitStyles from "@initia/interwovenkit-react/styles.js";
import "@initia/interwovenkit-react/styles.css";
import { appConfig } from "@/lib/weavepay";

if (typeof window !== "undefined") {
  injectStyles(InterwovenKitStyles);
}

const queryClient = new QueryClient();

const weavepayEvmChain = defineChain({
  id: 1421, // derived numeric ID for weavepay-1 EVM JSON-RPC; overridable via env
  name: "WeavePay",
  nativeCurrency: { name: "WeavePay Gas", symbol: "GAS", decimals: 18 },
  rpcUrls: {
    default: { http: [appConfig.jsonRpcUrl] },
  },
});

const wagmiConfig = createConfig({
  chains: [weavepayEvmChain],
  transports: {
    [weavepayEvmChain.id]: http(appConfig.jsonRpcUrl),
  },
  ssr: true,
});

function buildCustomChain() {
  return {
    chain_id: appConfig.chainId,
    chain_name: "WeavePay",
    network_type: "testnet" as const,
    bech32_prefix: "init",
    apis: {
      rpc: [{ address: appConfig.rpcUrl }],
      rest: [{ address: appConfig.restUrl }],
      indexer: [{ address: appConfig.indexerUrl }],
      "json-rpc": [{ address: appConfig.jsonRpcUrl }],
    },
    fees: {
      fee_tokens: [
        {
          denom: appConfig.denom,
          fixed_min_gas_price: 0,
          low_gas_price: 0,
          average_gas_price: 0,
          high_gas_price: 0,
        },
      ],
    },
    staking: {
      staking_tokens: [{ denom: appConfig.denom }],
    },
    native_assets: [
      {
        denom: appConfig.denom,
        name: "WeavePay Gas",
        symbol: "GAS",
        decimals: 18,
      },
    ],
    metadata: { is_l1: false, minitia: { type: "minievm" } },
  };
}

export function Providers({ children }: PropsWithChildren) {
  const customChain = useMemo(() => buildCustomChain(), []);
  const providerProps = {
    ...TESTNET,
    customChain,
    customChains: [customChain],
    defaultChainId: customChain.chain_id,
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <InterwovenKitProvider {...providerProps}>{children}</InterwovenKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
