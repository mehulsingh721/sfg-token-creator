import { PublicKey } from "@metaplex-foundation/js";
import {
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

export const useUser = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const checkSolBalance = async () => {
    return await connection.getBalance(publicKey as PublicKey);
  };

  async function getWalletTokenAccount(): Promise<TokenAccount[]> {
    const walletTokenAccount = await connection.getTokenAccountsByOwner(
      publicKey as PublicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    return walletTokenAccount.value.map((i) => ({
      pubkey: i.pubkey,
      programId: i.account.owner,
      accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
    }));
  }

  return { checkSolBalance, getWalletTokenAccount };
};
