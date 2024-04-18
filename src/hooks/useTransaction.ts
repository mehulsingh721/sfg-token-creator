import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

export const useTransaction = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const processMultipleTransaction = async (transactions: Array<any>) => {
    const signature = await sendTransaction(transactions[0], connection);
    const confirmation = connection.confirmTransaction(signature, "finalized");
    await toast.promise(confirmation, {
      pending: "Transaction is pending",
      success: "Transaction Successfull",
      error: "Transaction Failed",
    });
    const signature2 = await sendTransaction(transactions[1], connection);
    const confirmation2 = connection.confirmTransaction(
      signature2,
      "finalized"
    );
    await toast.promise(confirmation2, {
      pending: "Transaction is pending",
      success: "Transaction Successfull",
      error: "Transaction Failed",
    });
  };
  return { processMultipleTransaction };
};
