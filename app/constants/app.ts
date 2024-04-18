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

export const OPENBOOK_OPTIONS: any = [
  {
    amount: "0.4",
    eventQueueLength: "11308",
    requestQueueLength: "764",
    orderbookLength: "14524",
  },
  {
    amount: "1.5",
    eventQueueLength: "123244",
    requestQueueLength: "5084",
    orderbookLength: "32452",
  },
  {
    amount: "2.8",
    eventQueueLength: "262108",
    requestQueueLength: "5084",
    orderbookLength: "65500",
  },
];

export const TICK_SIZE_OPTIONS: any = [
  {
    size: "0.0001",
    supply: "100K",
  },
  {
    size: "0.00001",
    supply: "1M",
  },
  {
    size: "0.000001",
    supply: "10M",
  },
  {
    size: "0.0000001",
    supply: "100M",
  },
  {
    size: "0.00000001",
    supply: "1B",
  },
  {
    size: "0.000000001",
    supply: "10B",
  },
  {
    size: "0.0000000001",
    supply: "100B",
  },
];

export const ORDER_SIZE_OPTIONS: any = [
  {
    size: "0.01",
    supply: "100K",
  },
  {
    size: "0.1",
    supply: "1M",
  },
  {
    size: "1",
    supply: "10M",
  },
  {
    size: "10",
    supply: "100M",
  },
  {
    size: "100",
    supply: "1B",
  },
  {
    size: "1000",
    supply: "10B",
  },
  {
    size: "10000",
    supply: "100B",
  },
];
