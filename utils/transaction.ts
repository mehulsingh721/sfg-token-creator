import web3, { Connection, clusterApiUrl } from "@solana/web3.js";
import { toast } from "react-toastify";

export const checkTransactionConfirmation = async (signature: any) => {
  //   try {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Wait for confirmation
  const confirmation = connection.confirmTransaction(signature, "finalized");
  await toast.promise(confirmation, {
    pending: "Transaction is pending",
    success: "Transaction Successfull",
    error: "Transaction Failed",
  });
};
