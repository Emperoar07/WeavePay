"use client";

import { useInterwovenKit } from "@initia/interwovenkit-react";
import { encodeFunctionData, isAddress, toHex } from "viem";
import { Link2, LoaderCircle, Wallet } from "lucide-react";
import { appConfig, toBaseUnits, weavePayAbi, zeroAddress } from "@/lib/weavepay";

function shortenAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}

function HeaderButtonsInner() {
  const { initiaAddress, openBridge, openConnect, openWallet } = useInterwovenKit();

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black/15 bg-white px-3 text-sm font-bold shadow-sm transition hover:bg-black hover:text-white sm:h-10"
        onClick={() => openBridge?.({ srcChainId: "initiation-2", srcDenom: "uinit" })}
      >
        <Link2 size={16} />
        Bridge funds
      </button>
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-3 text-sm font-black text-[var(--ink)] shadow-sm transition hover:brightness-95 sm:h-10"
        onClick={() => (initiaAddress ? openWallet?.() : openConnect?.())}
      >
        <Wallet size={16} />
        {initiaAddress ? shortenAddress(initiaAddress) : "Connect wallet"}
      </button>
    </div>
  );
}

function ContractActionButtonInner({
  action,
  amount,
  children,
  className,
  invoiceId,
  merchant,
  metadataURI,
  onSuccess,
}: {
  action: "create" | "pay";
  amount?: string;
  children: React.ReactNode;
  className: string;
  invoiceId?: string;
  merchant?: string;
  metadataURI?: string;
  onSuccess?: (result: unknown) => void;
}) {
  const { initiaAddress, openConnect, requestTxBlock } = useInterwovenKit();

  async function submitTransaction() {
    if (!initiaAddress) {
      openConnect?.();
      return;
    }

    if (!appConfig.contractAddress || !isAddress(appConfig.contractAddress)) {
      window.alert("Set NEXT_PUBLIC_WEAVEPAY_CONTRACT after deploying WeavePay.sol.");
      return;
    }

    const input =
      action === "create"
        ? encodeFunctionData({
            abi: weavePayAbi,
            functionName: "createInvoice",
            args: [
              merchant && isAddress(merchant) ? merchant : zeroAddress,
              zeroAddress,
              toBaseUnits(amount || "0"),
              metadataURI || "ipfs://weavepay-demo",
            ],
          })
        : encodeFunctionData({
            abi: weavePayAbi,
            functionName: "payInvoice",
            args: [BigInt(invoiceId || "0")],
          });

    const value = action === "pay" ? toHex(toBaseUnits(amount || "0")) : "0x0";

    const txRequest = {
      chainId: appConfig.chainId,
      feeDenom: appConfig.denom,
      messages: [
        {
          typeUrl: "/minievm.evm.v1.MsgCall",
          value: {
            sender: initiaAddress.toLowerCase(),
            contractAddr: appConfig.contractAddress.toLowerCase(),
            input,
            value,
            accessList: [],
            authList: [],
          },
        },
      ],
    };

    const result = await requestTxBlock?.(txRequest as Parameters<NonNullable<typeof requestTxBlock>>[0]);
    onSuccess?.(result);
  }

  return (
    <button className={className} onClick={submitTransaction}>
      <LoaderCircle className="hidden animate-spin group-disabled:block" size={16} />
      {children}
    </button>
  );
}

export function InitiaHeaderActions() {
  return <HeaderButtonsInner />;
}

export function CreateInvoiceAction(props: {
  amount: string;
  merchant: string;
  metadataURI: string;
  onSuccess?: (result: unknown) => void;
}) {
  return (
    <ContractActionButtonInner
      action="create"
      amount={props.amount}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-5 text-sm font-black text-white transition hover:bg-black"
      merchant={props.merchant}
      metadataURI={props.metadataURI}
      onSuccess={props.onSuccess}
    >
      Create on testnet
    </ContractActionButtonInner>
  );
}

export function PayInvoiceAction(props: { amount: string; invoiceId: string }) {
  return (
    <ContractActionButtonInner
      action="pay"
      amount={props.amount}
      className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] text-sm font-black text-[var(--ink)]"
      invoiceId={props.invoiceId}
    >
      Connect and pay
    </ContractActionButtonInner>
  );
}
