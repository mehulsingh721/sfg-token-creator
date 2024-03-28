"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const WalletConnectionProvider = ({ children }: any) => {
  const network =
    "https://mainnet.helius-rpc.com/?api-key=cca7608a-0d55-407f-973c-b89529754909";
  const endpoint = useMemo(
    () =>
      "https://mainnet.helius-rpc.com/?api-key=cca7608a-0d55-407f-973c-b89529754909",
    [network]
  );
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnectionProvider;
