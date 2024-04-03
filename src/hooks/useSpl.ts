"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createCreateMetadataAccountV3Instruction,
  createRevokeInstruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  AuthorityType,
  createSetAuthorityInstruction,
  getMint,
  createTransferInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  TokenInvalidMintError,
  TokenInvalidOwnerError,
  createAccount,
  createAssociatedTokenAccount,
  AccountLayout,
} from "@solana/spl-token";
import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ADMIN_WALLET,
  HOLDER_MINT_FEES,
  HOLDER_MULTISEND_FEES,
  MINT_FEES,
  MULTISEND_FEES_100,
  MULTISEND_FEES_UNLIMITED,
  SFG_BALANCE_THRESHOLD,
} from "@/app/constants/app";
import { toast } from "react-toastify";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

export const useSpl = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const takeFees = (feeAmount: number) => {
    return SystemProgram.transfer({
      fromPubkey: publicKey as PublicKey,
      toPubkey: ADMIN_WALLET,
      lamports: feeAmount * LAMPORTS_PER_SOL, // Convert the amount from SOL to lamports
    });
  };

  const createToken = async (metadataUrl: string, tokenInfo: any) => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const tokenATA = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      publicKey as PublicKey
    );
    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
          ],
          PROGRAM_ID
        )[0],
        mint: mintKeypair.publicKey,
        mintAuthority: publicKey as PublicKey,
        payer: publicKey as PublicKey,
        updateAuthority: publicKey as PublicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            uri: metadataUrl,
            creators: null,
            sellerFeeBasisPoints: 0,
            uses: null,
            collection: null,
          },
          isMutable: false,
          collectionDetails: null,
        },
      }
    );
    const { uiAmount } = await checkSfgBalance();
    let fee;
    if (uiAmount >= SFG_BALANCE_THRESHOLD) {
      fee = takeFees(HOLDER_MINT_FEES);
    } else {
      fee = takeFees(MINT_FEES);
    }

    const createNewTokenTransaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: publicKey as PublicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        tokenInfo.decimals,
        publicKey as PublicKey,
        publicKey,
        TOKEN_PROGRAM_ID
      ),
      createAssociatedTokenAccountInstruction(
        publicKey as PublicKey,
        tokenATA,
        publicKey as PublicKey,
        mintKeypair.publicKey
      ),
      createMintToInstruction(
        mintKeypair.publicKey,
        tokenATA,
        publicKey as PublicKey,
        tokenInfo.supply * Math.pow(10, tokenInfo.decimals)
      ),
      createMetadataInstruction,
      fee
    );

    try {
      const signature = await sendTransaction(
        createNewTokenTransaction,
        connection,
        {
          signers: [mintKeypair],
        }
      );
      return signature;
    } catch (err: any) {
      throw new err.message();
    }
  };

  const revokeMintAuthority = async (mintAddress: string) => {
    const mintPublicKey = new PublicKey(mintAddress);
    const transaction = new Transaction();

    const revokeAuthorityInstruction = createSetAuthorityInstruction(
      mintPublicKey,
      publicKey as PublicKey,
      AuthorityType.MintTokens,
      null,
      [],
      TOKEN_PROGRAM_ID
    );

    transaction.add(revokeAuthorityInstruction);
    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (error) {
      console.error("Error revoking mint authority:", error);
    }
  };

  const revokeFreezeAuthority = async (mintAddress: string) => {
    const mintPublicKey = new PublicKey(mintAddress);
    const transaction = new Transaction();

    const revokeAuthorityInstruction = createSetAuthorityInstruction(
      mintPublicKey,
      publicKey as PublicKey,
      AuthorityType.FreezeAccount,
      null,
      [],
      TOKEN_PROGRAM_ID
    );

    transaction.add(revokeAuthorityInstruction);

    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (error) {
      console.error("Error revoking mint authority:", error);
    }
  };

  const multisend = async (
    tokenAddress: PublicKey | undefined,
    recipients: any,
    tokenType: string
  ) => {
    let tokenInfo;
    let decimals: any;

    if (tokenType === "SPL") {
      tokenInfo = await getMint(connection, tokenAddress as any);
      decimals = tokenInfo.decimals;
    }
    const { uiAmount } = await checkSfgBalance();
    let fees;

    if (uiAmount >= SFG_BALANCE_THRESHOLD) {
      fees = takeFees(HOLDER_MULTISEND_FEES);
    } else {
      if (recipients.length <= 100) {
        fees = takeFees(MULTISEND_FEES_100);
      } else {
        fees = takeFees(MULTISEND_FEES_UNLIMITED);
      }
    }

    const transaction = new Transaction();

    transaction.add(fees);

    console.log(tokenType);
    for (const recipient of recipients) {
      if (tokenType === "SPL") {
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey as PublicKey,
          tokenAddress as PublicKey,
          publicKey as PublicKey,
          signTransaction as any
        );
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey as PublicKey,
          tokenAddress as PublicKey,
          new PublicKey(recipient.address),
          signTransaction as any
        );

        const transferInstruction = createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          publicKey as PublicKey,
          BigInt(parseFloat(recipient.amount) * 10 ** decimals)
        );
        transaction.add(transferInstruction);
      } else if (tokenType === "SOL") {
        console.log(recipient.address);
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey as PublicKey,
            toPubkey: new PublicKey(recipient.address),
            lamports: recipient.amount * LAMPORTS_PER_SOL, // Convert the amount from SOL to lamports
          })
        );
      }
    }
    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (err: any) {
      throw new err.message();
    }
  };

  const getOrCreateAssociatedTokenAccount = async (
    connection: Connection,
    payer: PublicKey,
    mint: PublicKey,
    owner: PublicKey,
    signTransaction: SignerWalletAdapterProps["signTransaction"],
    allowOwnerOffCurve = false,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
  ) => {
    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      programId,
      associatedTokenProgramId
    );

    // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
    // Sadly we can't do this atomically.
    let account;
    try {
      account = await getAccountInfo(associatedToken, commitment, programId);
    } catch (error: any) {
      throw error;
    }
    return account;
  };

  const checkATAs = async (mint: PublicKey, recipients: Array<PublicKey>) => {
    const allowOwnerOffCurve = false;
    const programId = TOKEN_PROGRAM_ID;
    const associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;
    const finalReipients: Array<PublicKey> = [];

    for (let i = 0; i < recipients.length; i++) {
      const owner = recipients[i];
      const associatedToken = await getAssociatedTokenAddress(
        mint,
        owner,
        allowOwnerOffCurve,
        programId,
        associatedTokenProgramId
      );

      try {
        await getAccountInfo(associatedToken, "confirmed", programId);
      } catch (error: any) {
        if (error.message === "TokenAccountNotFoundError") {
          finalReipients.push(owner);
        }
      }
    }
    return finalReipients;
  };

  const createATAs = async (mint: PublicKey, recipients: Array<PublicKey>) => {
    const allowOwnerOffCurve = false;
    const programId = TOKEN_PROGRAM_ID;
    const associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;

    const transaction = new Transaction();
    for (let i = 0; i < recipients.length; i++) {
      const owner = recipients[i];
      const associatedToken = await getAssociatedTokenAddress(
        mint,
        owner,
        allowOwnerOffCurve,
        programId,
        associatedTokenProgramId
      );

      const instruction = createAssociatedTokenAccountInstruction(
        publicKey as PublicKey,
        associatedToken,
        owner,
        mint,
        programId,
        associatedTokenProgramId
      );
      transaction.add(instruction);
    }
    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (err: any) {
      throw new err.message();
    }
  };

  const getAccountInfo = async (
    address: PublicKey,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID
  ) => {
    const info = await connection.getAccountInfo(address, commitment);
    if (!info) throw new Error("TokenAccountNotFoundError");
    if (!info.owner.equals(programId))
      throw new Error("TokenInvalidAccountOwnerError");
    if (info.data.length != AccountLayout.span)
      throw new Error("TokenInvalidAccountSizeError");

    const rawAccount = AccountLayout.decode(Buffer.from(info.data));

    return {
      address,
      mint: rawAccount.mint,
      owner: rawAccount.owner,
      amount: rawAccount.amount,
      delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
      delegatedAmount: rawAccount.delegatedAmount,
      isInitialized: rawAccount.state !== AccountState.Uninitialized,
      isFrozen: rawAccount.state === AccountState.Frozen,
      isNative: !!rawAccount.isNativeOption,
      rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
      closeAuthority: rawAccount.closeAuthorityOption
        ? rawAccount.closeAuthority
        : null,
    };
  };

  const checkSfgBalance = async () => {
    const sfgToken = new PublicKey(
      "9J6akKgzRDWBKyeaDDkbREEUTYVSVVHY8L6qjW7AQkB4"
    );
    try {
      const balance: any = await connection.getParsedTokenAccountsByOwner(
        publicKey as PublicKey,
        {
          mint: sfgToken,
        }
      );
      return balance.value[0].account.data.parsed.info.tokenAmount;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    createToken,
    revokeMintAuthority,
    revokeFreezeAuthority,
    multisend,
    checkATAs,
    createATAs,
  };
};

export enum AccountState {
  Uninitialized = 0,
  Initialized = 1,
  Frozen = 2,
}
