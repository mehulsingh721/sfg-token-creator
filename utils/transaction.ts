import web3, { Connection, clusterApiUrl } from "@solana/web3.js";
import { toast } from "react-toastify";

export const checkTransactionConfirmation = (signature: any) => {
  //   try {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Wait for confirmation
  const confirmation = new Promise((resolve) =>
    connection.confirmTransaction(signature, "finalized")
  );
  toast.promise(confirmation, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });

  // console.log("Transaction confirmation status:", confirmation.value);

  // if (confirmation.value.err) {
  //   console.error("Transaction failed:", confirmation.value.err);
  // } else {
  //   console.log("Transaction succeeded!");
  // }
  //   } catch (error) {
  //     console.error("Error checking transaction confirmation:", error);
  //   }
};
