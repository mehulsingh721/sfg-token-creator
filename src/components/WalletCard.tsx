"use client";
import { useEffect, useState } from "react";
import ButtonCustom from "./ui/Button";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-ant-design";
import { WalletName } from "@solana/wallet-adapter-base";
import { Wallet } from "@solana/wallet-adapter-react";
import { ButtonProps } from "antd";
import "@solana/wallet-adapter-ant-design/styles.css";

export default function WalletCard({}: any) {
  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void;
    wallets: Wallet[];
  }> | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  return (
    // <ButtonCustom htmlType={"text"}>
    //   {isActive ? "Disconnect" : "Connect"}
    // </ButtonCustom>
    <WalletMultiButton className="!bg-helius-orange hover:!bg-black transition-all duration-200 !rounded-lg" />
  );
}
