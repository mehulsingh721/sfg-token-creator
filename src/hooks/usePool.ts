import { BN } from "@project-serum/anchor";
import {
  Liquidity,
  MAINNET_PROGRAM_ID,
  TxVersion,
} from "@raydium-io/raydium-sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const usePool = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const createNewPool = async (
    marketId: PublicKey,
    baseToken: any,
    quoteToken: any,
    baseAmount: BN,
    quoteAmount: BN,
    startTime: number,
    walletTokenAccounts: any
  ) => {
    const initPoolInstructions =
      await Liquidity.makeCreatePoolV4InstructionV2Simple({
        connection,
        programId: MAINNET_PROGRAM_ID.AmmV4,
        marketInfo: {
          marketId: marketId,
          programId: MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
        },
        baseMintInfo: baseToken,
        quoteMintInfo: quoteToken,
        baseAmount: baseAmount,
        quoteAmount: quoteAmount,
        startTime: new BN(Math.floor(startTime)),
        ownerInfo: {
          feePayer: publicKey as PublicKey,
          wallet: publicKey as PublicKey,
          tokenAccounts: walletTokenAccounts,
          useSOLBalance: true,
        },
        associatedOnly: false,
        checkCreateATAOwner: true,
        makeTxVersion: TxVersion.V0,
        feeDestinationId: new PublicKey(
          "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5"
        ), // only mainnet use this
      });
  };
  return { createNewPool };
};
