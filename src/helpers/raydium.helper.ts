import { PublicKey } from "@metaplex-foundation/js";
import {
  Liquidity,
  LiquidityPoolKeysV4,
  Market,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import { Connection } from "@solana/web3.js";

export const getPoolKeys = async (
  poolId: PublicKey,
  connection: Connection
) => {
  const marketVersion: 3 = 3;
  const version = 4;

  const programId = new PublicKey(
    "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
  );
  const serumProgramId = new PublicKey(
    "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
  );

  const { state: LiquidityStateLayout } = Liquidity.getLayouts(version);

  const account = await connection.getAccountInfo(poolId);
  //@ts-ignore
  const fields = LiquidityStateLayout.decode(account?.data);
  const {
    status,
    baseMint,
    quoteMint,
    lpMint,
    openOrders,
    targetOrders,
    baseVault,
    quoteVault,
    marketId,
    baseDecimal,
    quoteDecimal,
  } = fields;

  let withdrawQueue: any, lpVault: any;
  if (Liquidity.isV4(fields)) {
    withdrawQueue = fields.withdrawQueue;
    lpVault = fields.lpVault;
  } else {
    withdrawQueue = PublicKey.default;
    lpVault = PublicKey.default;
  }

  const associatedPoolKeys = Liquidity.getAssociatedPoolKeys({
    version: version,
    marketVersion,
    marketId,
    baseMint: baseMint,
    quoteMint: quoteMint,
    baseDecimals: baseDecimal.toNumber(),
    quoteDecimals: quoteDecimal.toNumber(),
    programId,
    marketProgramId: serumProgramId,
  });

  const poolKeys = {
    id: poolId,
    baseMint,
    quoteMint,
    lpMint,
    version: associatedPoolKeys.version,
    programId,
    baseDecimals: baseDecimal.toNumber(),
    quoteDecimals: quoteDecimal.toNumber(),
    authority: associatedPoolKeys.authority,
    openOrders,
    targetOrders,
    baseVault,
    quoteVault,
    withdrawQueue,
    lpVault,
    marketVersion: associatedPoolKeys.marketVersion,
    marketProgramId: serumProgramId,
    marketId,
    marketAuthority: associatedPoolKeys.marketAuthority,
    lpDecimals: associatedPoolKeys.lpDecimals,
    lookupTableAccount: associatedPoolKeys.lookupTableAccount,
  };

  const marketInfo = await connection.getAccountInfo(marketId);
  const { state: MARKET_STATE_LAYOUT } = Market.getLayouts(marketVersion);
  //@ts-ignore
  const market = MARKET_STATE_LAYOUT.decode(marketInfo.data);

  const {
    baseVault: marketBaseVault,
    quoteVault: marketQuoteVault,
    bids: marketBids,
    asks: marketAsks,
    eventQueue: marketEventQueue,
  } = market;

  // const poolKeys: LiquidityPoolKeys;
  // const finalData = {
  const finalData: LiquidityPoolKeysV4 = {
    ...poolKeys,
    ...{
      marketBaseVault,
      marketQuoteVault,
      marketBids,
      marketAsks,
      marketEventQueue,
    },
  };
  return finalData;
};

export async function getWalletTokenAccount(
  connection: Connection,
  wallet: PublicKey
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}
