import {
  CacheLTA,
  InstructionType,
  MAINNET_PROGRAM_ID,
  MARKET_STATE_LAYOUT_V2,
  Market,
  MarketV2,
  TOKEN_PROGRAM_ID,
  TxVersion,
  ZERO,
  generatePubKey,
  splitTxAndSigners,
} from "@raydium-io/raydium-sdk";
import { BN } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { createInitializeAccountInstruction } from "@solana/spl-token";
import { useTransaction } from "./useTransaction";

export const useOpenbook = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { processMultipleTransaction } = useTransaction();

  const createMarket = async ({
    baseInfo,
    quoteInfo,
    lotSize, // 1
    tickSize, // 0.01
    makeTxVersion,
    lookupTableCache,
    eventQueueLength,
    requestQueueLength,
    orderbookLength,
  }: {
    makeTxVersion: TxVersion;
    lookupTableCache?: CacheLTA;
    baseInfo: {
      mint: PublicKey;
      decimals: number;
    };
    quoteInfo: {
      mint: PublicKey;
      decimals: number;
    };
    lotSize: number;
    tickSize: number;
    eventQueueLength: number;
    requestQueueLength: number;
    orderbookLength: number;
  }) => {
    const wallet = publicKey as PublicKey;

    const dexProgramId = MAINNET_PROGRAM_ID.OPENBOOK_MARKET;
    const market = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const requestQueue = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const eventQueue = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const bids = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const asks = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const baseVault = generatePubKey({
      fromPublicKey: wallet,
      programId: TOKEN_PROGRAM_ID,
    });
    const quoteVault = generatePubKey({
      fromPublicKey: wallet,
      programId: TOKEN_PROGRAM_ID,
    });
    const feeRateBps = 0;
    const quoteDustThreshold = new BN(100);

    function getVaultOwnerAndNonce() {
      const vaultSignerNonce = new BN(0);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const vaultOwner = PublicKey.createProgramAddressSync(
            [
              market.publicKey.toBuffer(),
              vaultSignerNonce.toArrayLike(Buffer, "le", 8),
            ],
            dexProgramId
          );
          return { vaultOwner, vaultSignerNonce };
        } catch (e) {
          vaultSignerNonce.iaddn(1);
          if (vaultSignerNonce.gt(new BN(25555)))
            throw Error("find vault owner error");
        }
      }
    }
    const { vaultOwner, vaultSignerNonce } = getVaultOwnerAndNonce();

    const baseLotSize = new BN(Math.round(10 ** baseInfo.decimals * lotSize));
    const quoteLotSize = new BN(
      Math.round(lotSize * 10 ** quoteInfo.decimals * tickSize)
    );

    if (baseLotSize.eq(ZERO)) throw Error("lot size is too small");
    if (quoteLotSize.eq(ZERO))
      throw Error("tick size or lot size is too small");

    const ins = await createMarketInstructionsSimple({
      wallet,
      marketInfo: {
        programId: dexProgramId,
        id: market,
        baseMint: baseInfo.mint,
        quoteMint: quoteInfo.mint,
        baseVault,
        quoteVault,
        vaultOwner,
        requestQueue,
        eventQueue,
        bids,
        asks,

        feeRateBps,
        quoteDustThreshold,
        vaultSignerNonce,
        baseLotSize,
        quoteLotSize,
        eventQueueLength,
        requestQueueLength,
        orderbookLength,
      },
    });

    const transaction1 = new Transaction();
    const transaction2 = new Transaction();
    const innerTransactions = await splitTxAndSigners({
      connection,
      makeTxVersion,
      computeBudgetConfig: undefined,
      payer: wallet,
      innerTransaction: ins.innerTransactions,
      lookupTableCache,
    });

    // for (const innerTransaction of innerTransactions) {
    //   console.log(innerTransaction);
    const innerTransaction1 = innerTransactions[0];
    innerTransaction1.instructions.forEach((tx) => {
      transaction1.add(tx);
    });

    const innerTransaction2 = innerTransactions[1];
    innerTransaction2.instructions.forEach((tx) => {
      transaction2.add(tx);
    });
    // }

    try {
      processMultipleTransaction([transaction1, transaction2]);
    } catch (err: any) {
      throw new Error(err.message);
    }

    return {
      market,
    };
  };

  const createMarketInstructionsSimple = async ({
    wallet,
    marketInfo,
  }: {
    wallet: PublicKey;
    marketInfo: {
      programId: PublicKey;
      id: { publicKey: PublicKey; seed: string };
      baseMint: PublicKey;
      quoteMint: PublicKey;
      baseVault: { publicKey: PublicKey; seed: string };
      quoteVault: { publicKey: PublicKey; seed: string };
      vaultOwner: PublicKey;
      requestQueue: { publicKey: PublicKey; seed: string };
      eventQueue: { publicKey: PublicKey; seed: string };
      bids: { publicKey: PublicKey; seed: string };
      asks: { publicKey: PublicKey; seed: string };
      feeRateBps: number;
      vaultSignerNonce: BN;
      quoteDustThreshold: BN;
      baseLotSize: BN;
      quoteLotSize: BN;
      eventQueueLength: number;
      requestQueueLength: number;
      orderbookLength: number;
    };
  }) => {
    const ins1: TransactionInstruction[] = [];
    const accountLamports = await connection.getMinimumBalanceForRentExemption(
      165
    );
    ins1.push(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.baseVault.seed,
        newAccountPubkey: marketInfo.baseVault.publicKey,
        lamports: accountLamports,
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.quoteVault.seed,
        newAccountPubkey: marketInfo.quoteVault.publicKey,
        lamports: accountLamports,
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeAccountInstruction(
        marketInfo.baseVault.publicKey,
        marketInfo.baseMint,
        marketInfo.vaultOwner
      ),
      createInitializeAccountInstruction(
        marketInfo.quoteVault.publicKey,
        marketInfo.quoteMint,
        marketInfo.vaultOwner
      )
    );

    const ins2: TransactionInstruction[] = [];
    ins2.push(
      // SystemProgram.createAccountWithSeed({
      //   fromPubkey: wallet,
      //   basePubkey: wallet,
      //   seed: marketInfo.id.seed,
      //   newAccountPubkey: marketInfo.id.publicKey,
      //   lamports: await connection.getMinimumBalanceForRentExemption(
      //     MARKET_STATE_LAYOUT_V2.span
      //   ),
      //   space: MARKET_STATE_LAYOUT_V2.span,
      //   programId: marketInfo.programId,
      // }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.requestQueue.seed,
        newAccountPubkey: marketInfo.requestQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketInfo.requestQueueLength
        ),
        space: marketInfo.requestQueueLength,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.eventQueue.seed,
        newAccountPubkey: marketInfo.eventQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketInfo.eventQueueLength
        ),
        space: marketInfo.eventQueueLength,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.bids.seed,
        newAccountPubkey: marketInfo.bids.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketInfo.orderbookLength
        ),
        space: marketInfo.orderbookLength,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.asks.seed,
        newAccountPubkey: marketInfo.asks.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketInfo.orderbookLength
        ),
        space: marketInfo.orderbookLength,
        programId: marketInfo.programId,
      }),
      MarketV2.initializeMarketInstruction({
        programId: marketInfo.programId,
        marketInfo: {
          id: marketInfo.id.publicKey,
          requestQueue: marketInfo.requestQueue.publicKey,
          eventQueue: marketInfo.eventQueue.publicKey,
          bids: marketInfo.bids.publicKey,
          asks: marketInfo.asks.publicKey,
          baseVault: marketInfo.baseVault.publicKey,
          quoteVault: marketInfo.quoteVault.publicKey,
          baseMint: marketInfo.baseMint,
          quoteMint: marketInfo.quoteMint,

          baseLotSize: marketInfo.baseLotSize,
          quoteLotSize: marketInfo.quoteLotSize,
          feeRateBps: marketInfo.feeRateBps,
          vaultSignerNonce: marketInfo.vaultSignerNonce,
          quoteDustThreshold: marketInfo.quoteDustThreshold,
        },
      })
    );

    return {
      address: {
        marketId: marketInfo.id.publicKey,
        requestQueue: marketInfo.requestQueue.publicKey,
        eventQueue: marketInfo.eventQueue.publicKey,
        bids: marketInfo.bids.publicKey,
        asks: marketInfo.asks.publicKey,
        baseVault: marketInfo.baseVault.publicKey,
        quoteVault: marketInfo.quoteVault.publicKey,
        baseMint: marketInfo.baseMint,
        quoteMint: marketInfo.quoteMint,
      },
      innerTransactions: [
        {
          instructions: ins1,
          signers: [],
          instructionTypes: [
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.initAccount,
            InstructionType.initAccount,
          ],
        },
        {
          instructions: ins2,
          signers: [],
          instructionTypes: [
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.initMarket,
          ],
        },
      ],
    };
  };

  return { createMarketInstructionsSimple, createMarket };
};
// {
//     "publicKey": "9w7kYagAQwt4YYuGDoGhLZNxdmbTjA5azFeT86FpaNaY",
//     "seed": "3BA4VfYd1MWr4mRqXkyTiMqTY6PUnASd"
// }
