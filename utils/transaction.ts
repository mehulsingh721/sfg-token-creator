import web3, { Connection, clusterApiUrl } from "@solana/web3.js";
import { toast } from "react-toastify";

export const checkTransactionConfirmation = async (signature: any) => {
  //   try {
  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=cca7608a-0d55-407f-973c-b89529754909",
    "confirmed"
  );

  // Wait for confirmation
  const confirmation = connection.confirmTransaction(signature, "confirmed");
  await toast.promise(confirmation, {
    pending: "Transaction is pending",
    success: "Transaction Successfull",
    error: "Transaction Failed",
  });
};
