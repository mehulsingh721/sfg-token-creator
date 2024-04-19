"use client";
import { ORDER_SIZE_OPTIONS, TICK_SIZE_OPTIONS } from "@/app/constants/app";
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput } from "@/src/components/ui/Form";
import { useSpl } from "@/src/hooks/useSpl";
import FormLayout from "@/src/layout/FormLayout";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { DatePicker, Form, Select, Switch } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import LiquidityField from "./LiquidityField";
import { useUser } from "@/src/hooks/useUser";
import { usePool } from "@/src/hooks/usePool";
import { BN } from "@project-serum/anchor";
import { toast } from "react-toastify";
import { Liquidity } from "@raydium-io/raydium-sdk";

const PoolForm = ({ form, connected }: any) => {
  const [schedule, setSchedule] = useState(false);
  const { getTokens, getMetadata } = useSpl();
  const [userTokens, setUserTokens] = useState([]);
  const [selectedOpenbook, setSelectedOpenbook] = useState(0);
  const [baseToken, setBaseToken] = useState(null);
  const [quoteToken, setQuoteToken] = useState(null);
  const [solInfo, setSolInfo] = useState({});
  const { checkSolBalance } = useUser();
  const { createNewPool } = usePool();
  const { getWalletTokenAccount } = useUser();
  const [baseAmount, setBaseAmount] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState(null);

  const getTokenInfo = (key: any) => {
    if (key === "sol") {
      return {
        mint: new PublicKey("So11111111111111111111111111111111111111112"),
        decimals: 9,
      };
    } else {
      return {
        mint: new PublicKey(userTokens[parseInt(key)].address),
        decimals: userTokens[parseInt(key)].decimals,
      };
    }
  };

  useMemo(() => {
    const info = {
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
      name: "Solana",
      symbol: "SOL",
      address: "So11111111111111111111111111111111111111112",
      decimals: 9,
      userBalance: 0,
    };
    (async () => {
      const balance = await checkSolBalance();
      info.userBalance = (balance / 10 ** 9).toFixed(4) as any;
      setSolInfo(info);
    })();
  }, []);

  useMemo(() => {
    if (connected) {
      (async () => {
        const data = await getTokens();
        const tokensList = [];
        for (const item in data) {
          const dp = data[item];
          const mintAddress = dp.account.data.parsed.info.mint;
          const decimals = dp.account.data.parsed.info.tokenAmount.decimals;

          const { tokenName, tokenSymbol, tokenLogo }: any = await getMetadata(
            new PublicKey(mintAddress.toString())
          );

          tokensList.push({
            name: tokenName,
            symbol: tokenSymbol,
            logo: tokenLogo,
            address: mintAddress,
            decimals: decimals,
            userBalance: dp.account.data.parsed.info.tokenAmount.uiAmount,
          });
        }
        console.log(tokensList);
        setUserTokens(tokensList as any);
      })();
    }
  }, [connected]);

  const handleSubmit = async (values: any) => {
    try {
      const baseToken = getTokenInfo(values.baseToken);
      const quoteToken = getTokenInfo(values.quoteToken);
      const startTime = dayjs(values.launchTime).unix();
      const walletTokenAccounts = await getWalletTokenAccount();
      if (baseAmount && quoteToken) {
        const baseAmountFinal = new BN(
          Math.floor(parseFloat(baseAmount as any) * 10 ** baseToken.decimals)
        );
        const quoteAmountFinal = new BN(
          Math.floor(parseFloat(quoteAmount as any) * 10 ** quoteToken.decimals)
        );

        const marketId = new PublicKey(values.openbookMarketId);

        await createNewPool(
          marketId,
          baseToken,
          quoteToken,
          baseAmountFinal,
          quoteAmountFinal,
          startTime,
          walletTokenAccounts
        );
      } else {
        toast.error("Please input correct LP amounts");
        return;
      }
    } catch (err) {
      toast.error("Please input correct data");
      return;
    }
  };

  return <div className="w-full"></div>;
};

export default PoolForm;
