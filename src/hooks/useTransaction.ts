import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../provider/AppProvider";
import { LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { PublicKey } from "@metaplex-foundation/js";
import { ADMIN_WALLET } from "@/app/constants/app";

export const useTransaction = () => {
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const { setMarketIdConfirmed, setAmmIdConfirmed } = useContext(AppContext);
  const { connection } = useConnection();

  const processMultipleTransaction = async (transactions: Array<any>) => {
    const signature = await sendTransaction(transactions[0], connection);
    const confirmation = connection.confirmTransaction(signature, "confirmed");
    await toast.promise(confirmation, {
      pending: "Transaction is pending",
      success: "Transaction Successfull",
      error: "Transaction Failed",
    });
    const signature2 = await sendTransaction(transactions[1], connection);
    const confirmation2 = connection.confirmTransaction(
      signature2,
      "confirmed"
    );
    await toast.promise(confirmation2, {
      pending: "Transaction is pending",
      success: "Transaction Successfull",
      error: "Transaction Failed",
    });
    setMarketIdConfirmed(true);
  };

  const processPoolTransaction = async (signature: any) => {
    const confirmation = connection.confirmTransaction(signature, "confirmed");
    await toast.promise(confirmation, {
      pending: "Transaction is pending",
      success: "Transaction Successfull",
      error: "Transaction Failed",
    });
    setAmmIdConfirmed(true);
  };

  const takeFees = (feeAmount: number) => {
    return SystemProgram.transfer({
      fromPubkey: publicKey as PublicKey,
      toPubkey: ADMIN_WALLET,
      lamports: feeAmount * LAMPORTS_PER_SOL, // Convert the amount from SOL to lamports
    });
  };

  return { processMultipleTransaction, processPoolTransaction, takeFees };
};
