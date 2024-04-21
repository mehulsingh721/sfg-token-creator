import { BN } from "@project-serum/anchor";
import {
  Liquidity,
  MAINNET_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
  TokenAmount,
  TxVersion,
  findProgramAddress,
} from "@raydium-io/raydium-sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { getPoolKeys, getWalletTokenAccount } from "../helpers/raydium.helper";

export const usePool = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

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
    const transaction = new Transaction();
    for (const index in initPoolInstructions.innerTransactions) {
      const instruction = initPoolInstructions.innerTransactions[index];
      instruction.instructions.forEach((item) => {
        transaction.add(item);
      });
    }
    try {
      await sendTransaction(transaction, connection);
    } catch (err) {
      console.error(err);
    }
  };

  function getATAAddress(
    programId: PublicKey,
    owner: PublicKey,
    mint: PublicKey
  ) {
    const { publicKey, nonce } = findProgramAddress(
      [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
      new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
    );
    return { publicKey, nonce };
  }

  function percentAmount(amount: string, percent: number): string {
    const inputNum = BigInt(amount); // Convert string to BigInt
    const result = inputNum * BigInt(percent * 100); // Multiply by percent
    return (result / BigInt(100)).toString(); // Round down to the nearest integer
  }

  const removeLiquidity = async (poolId: any, percentage: any) => {
    const poolKeys = await getPoolKeys(poolId, connection);

    const lpToken = new Token(
      TOKEN_PROGRAM_ID,
      poolKeys.lpMint,
      poolKeys.lpDecimals
    ); // LP
    const lpTokenAccount = getATAAddress(
      TOKEN_PROGRAM_ID,
      publicKey as PublicKey,
      poolKeys.lpMint
    );

    let LP_account_balance1 = await connection.getTokenAccountBalance(
      lpTokenAccount.publicKey
    );
    console.log(LP_account_balance1);

    // const percentBalance = percentAmount(
    //   LP_account_balance1.value.amount,
    //   percentage
    // );
    let Amount_in = new TokenAmount(lpToken, LP_account_balance1.value.amount);

    const tokenAccountRawInfos_LP = await getWalletTokenAccount(
      connection,
      publicKey as PublicKey
    );

    const lp_ix = await Liquidity.makeRemoveLiquidityInstructionSimple({
      connection,
      poolKeys,
      userKeys: {
        owner: publicKey as PublicKey,
        payer: publicKey as PublicKey,
        tokenAccounts: tokenAccountRawInfos_LP,
      },
      amountIn: Amount_in,
      makeTxVersion: TxVersion.V0,
    });

    const transaction = new Transaction();
    lp_ix.innerTransactions.forEach((item) => {
      item.instructions.forEach((instruction) => {
        transaction.add(instruction);
      });
    });

    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (err: any) {
      throw new err.message();
    }
  };
  return { createNewPool, removeLiquidity };
};
