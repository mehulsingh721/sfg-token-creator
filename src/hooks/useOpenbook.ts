import { MarketV2 } from "@raydium-io/raydium-sdk";
import { Market } from "@openbook-dex/openbook";
import { OpenBookV2Client } from "@openbook-dex/openbook-v2";
import { AnchorProvider, BN } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const useOpenbook = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = new AnchorProvider(connection, wallet as any, {});
  const programId = new PublicKey(
    "opnb2LAfJYbRMAHHvqjCwQxanZn7ReEHp1k81EohpZb"
  );

  const client = new OpenBookV2Client(provider as any, programId);

  const createMarket = () => {
    // MarketV2.makeCreateMarketInstruction({})
  };

  return { createMarket };
};
