import { PublicKey } from "@solana/web3.js";

export const ADMIN_WALLET = new PublicKey(
  "Ea4q8Cmd3bTv9AML8mh8BWc5d3tbnqqFMZ5HsGKG8Q7u"
);

export const NETWORK_URL =
  "https://mainnet.helius-rpc.com/?api-key=cca7608a-0d55-407f-973c-b89529754909";
// export const NETWORK_URL: string = "https://api.devnet.solana.com";

export const MINT_FEES = 0.35;
export const HOLDER_MINT_FEES = 0.2;

export const MULTISEND_FEES_100 = 0.05;
export const MULTISEND_FEES_UNLIMITED = 0.1;
export const HOLDER_MULTISEND_FEES = 0;

export const SFG_BALANCE_THRESHOLD = 100000;
