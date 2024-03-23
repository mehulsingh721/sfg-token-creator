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
} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

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
      createMetadataInstruction
    );
    const signature = await sendTransaction(
      createNewTokenTransaction,
      connection,
      {
        signers: [mintKeypair],
      }
    );
    return signature;
  };

  const revokeMintAuthority = async (mintAddress: string) => {
    const mintPublicKey = new PublicKey(mintAddress);
    const transaction = new Transaction();

    const revokeAuthorityInstruction = createSetAuthorityInstruction(
      mintPublicKey, // mint
      publicKey as PublicKey, // newAuthority
      AuthorityType.MintTokens, // authorityType
      null, // currentAuthority
      [], // multiSigners, empty if not using multisig
      TOKEN_PROGRAM_ID // token program id, usually you can import this from '@solana/spl-token'
    );

    transaction.add(revokeAuthorityInstruction);

    console.log(transaction);
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
      mintPublicKey, // mint
      publicKey as PublicKey, // newAuthority
      AuthorityType.FreezeAccount, // authorityType
      null,
      [], // multiSigners, empty if not using multisig
      TOKEN_PROGRAM_ID // token program id, usually you can import this from '@solana/spl-token'
    );

    transaction.add(revokeAuthorityInstruction);

    try {
      const signature = await sendTransaction(transaction, connection);
      return signature;
    } catch (error) {
      console.error("Error revoking mint authority:", error);
    }
  };
  return { createToken, revokeMintAuthority, revokeFreezeAuthority };
};
