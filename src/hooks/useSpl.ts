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
import { ADMIN_WALLET, MINT_FEES } from "@/app/constants/app";
import { toast } from "react-toastify";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

export const useSpl = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();

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
      SystemProgram.transfer({
        fromPubkey: publicKey as PublicKey,
        toPubkey: ADMIN_WALLET,
        lamports: MINT_FEES * LAMPORTS_PER_SOL, // Convert the amount from SOL to lamports
      })
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

  const multisend = async (tokenAddress: PublicKey, recipients: any) => {
    const tokenInfo = await getMint(connection, tokenAddress);
    const { decimals } = tokenInfo;

    const transaction = new Transaction();

    for (const recipient of recipients) {
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as PublicKey,
        tokenAddress,
        publicKey as PublicKey,
        signTransaction as any
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as PublicKey,
        tokenAddress,
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
    }
    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (err: any) {
      // console.log(err);
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
