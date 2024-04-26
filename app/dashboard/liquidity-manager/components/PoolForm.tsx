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
import { useContext, useMemo, useState } from "react";
import LiquidityField from "./LiquidityField";
import { useUser } from "@/src/hooks/useUser";
import { usePool } from "@/src/hooks/usePool";
import { BN } from "@project-serum/anchor";
import { toast } from "react-toastify";
import { Liquidity } from "@raydium-io/raydium-sdk";
import { AppContext } from "@/src/provider/AppProvider";
import { CopyOutlined } from "@ant-design/icons";
import { useTransaction } from "@/src/hooks/useTransaction";

const PoolForm = ({
  form,
  connected,
  baseAmount,
  setBaseAmount,
  quoteAmount,
  setQuoteAmount,
  baseToken,
  setBaseToken,
  quoteToken,
  setQuoteToken,
}: any) => {
  const [schedule, setSchedule] = useState(false);
  const { getTokens, getMetadata } = useSpl();
  const [userTokens, setUserTokens] = useState<any>([]);
  const [selectedOpenbook, setSelectedOpenbook] = useState(0);
  const [solInfo, setSolInfo] = useState<any>({});
  const { checkSolBalance } = useUser();
  const { createNewPool } = usePool();
  const { getWalletTokenAccount } = useUser();
  const { setLoader } = useContext(AppContext);
  const { ammIdConfirmed } = useContext(AppContext);
  const [ammId, setAmmId] = useState("");
  const { processPoolTransaction } = useTransaction();

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
        setLoader({ loading: true, text: "Fetching your tokens..." });
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
        setUserTokens(tokensList as any);
        setLoader({ loading: false, text: "" });
      })();
    }
  }, [connected]);

  const handleSubmit = async (values: any) => {
    try {
      setLoader({ loading: true, text: "Checking Values..." });
      const baseToken = getTokenInfo(values.baseToken);
      const quoteToken = getTokenInfo(values.quoteToken);
      const startTime = dayjs(values.launchTime).unix();
      const walletTokenAccounts = await getWalletTokenAccount();
      if (baseAmount && quoteToken) {
        const baseAmountFinal = new BN(
          Math.floor(
            parseFloat(baseAmount as any) * 10 ** baseToken.decimals
          ).toString()
        );

        const quoteAmountFinal = new BN(
          Math.floor(
            parseFloat(quoteAmount as any) * 10 ** quoteToken.decimals
          ).toString()
        );

        const marketId = new PublicKey(values.openbookMarketId);

        setLoader({ loading: true, text: "Sending Transaction..." });
        const { signature, ammId }: any = await createNewPool(
          marketId,
          baseToken,
          quoteToken,
          baseAmountFinal,
          quoteAmountFinal,
          startTime,
          walletTokenAccounts
        );
        setLoader({ loading: false, text: "" });
        processPoolTransaction(signature);
        setAmmId(ammId);
      } else {
        setLoader({ loading: false, text: "" });
        toast.error("Please input correct LP amounts");
        return;
      }
    } catch (err) {
      setLoader({ loading: false, text: "" });
      toast.error("Please input correct data");
      return;
    }
  };

  return (
    <div className="w-full">
      <FormLayout form={form} handleSubmit={(values) => handleSubmit(values)}>
        <div className="md:flex md:space-x-4 w-full max-h-[65vh] overflow-auto items-center justify-center">
          <div className="w-full">
            <div className="sm:flex sm:space-x-4">
              <div className="w-full sm:w-6/12">
                <Form.Item label="Base Token" required name={"baseToken"}>
                  <Select onChange={(value) => setBaseToken(value)}>
                    {userTokens.map((token: any, key: any) => (
                      <Select.Option key={key}>
                        <div className="flex items-center">
                          <img src={token.logo} className="h-8 w-8" />
                          <h1>
                            {token?.name} {`(${token?.symbol})`}
                          </h1>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="w-full sm:w-6/12">
                <Form.Item label="Quote Token:" required name={"quoteToken"}>
                  <Select onChange={(value) => setQuoteToken(value)}>
                    <Select.Option key={"sol"}>
                      <div className="flex items-center gap-2">
                        <img src={solInfo?.logo} className="h-5 w-5" />
                        <h1>
                          {solInfo?.name} {solInfo?.symbol}
                        </h1>
                      </div>
                    </Select.Option>
                    {userTokens.map((token: any, key: any) => (
                      <Select.Option key={key}>
                        <div className="flex items-center gap-2">
                          <img src={token.logo} className="h-5 w-5" />
                          <h1>
                            {token?.name} {`(${token?.symbol})`}
                          </h1>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="sm:flex sm:space-x-4">
              <div className="w-full">
                <FormInput
                  label="Openbook Market ID"
                  placeholder="Your Openbook Market ID"
                  name="openbookMarketId"
                  onChange={(e) => {}}
                  required={true}
                />
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <h1>Set Launch Date: </h1>
              <Switch
                checked={schedule}
                onChange={() => setSchedule(!schedule)}
              />
            </div>
            {schedule && (
              <div className="">
                <div className="w-full">
                  <Form.Item label="Launch Date: " name={"launchTime"}>
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            )}
            <div className="mb-5">
              <h1 className="text-base font-bold mb-5">Add Liquidity: </h1>
              <div className="sm:flex sm:space-x-4 justify-center items-center">
                <div className="">
                  <LiquidityField
                    type={"base"}
                    tokenLogo={userTokens[baseToken as any]?.logo}
                    tokenName={userTokens[baseToken as any]?.name}
                    tokenSymbol={userTokens[baseToken as any]?.symbol}
                    balance={userTokens[baseToken as any]?.userBalance}
                    setAmount={setBaseAmount}
                  />
                </div>

                <div className="text-xl font-bold">
                  <h1>+</h1>
                </div>

                <div className="">
                  <LiquidityField
                    type={"quote"}
                    setAmount={setQuoteAmount}
                    tokenLogo={
                      quoteToken === "sol"
                        ? solInfo.logo
                        : userTokens[quoteToken as any]?.logo
                    }
                    tokenName={
                      quoteToken === "sol"
                        ? solInfo.name
                        : userTokens[quoteToken as any]?.name
                    }
                    tokenSymbol={
                      quoteToken === "sol"
                        ? solInfo.symbol
                        : userTokens[quoteToken as any]?.symbol
                    }
                    balance={
                      quoteToken === "sol"
                        ? solInfo.userBalance
                        : userTokens[quoteToken as any]?.userBalance
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-centers">
          {ammIdConfirmed && ammId !== "" ? (
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-xl">Your AMM ID</h1>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(ammId?.toBase58());
                  toast.success("Market ID Copied!!");
                }}
                className="flex text-[#0038ff] cursor-pointer"
              >
                <h1 className="">{ammId?.toBase58()}</h1>
                <CopyOutlined />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-centers">
              {!connected ? (
                <WalletMultiButton />
              ) : (
                <Form.Item>
                  <ButtonCustom htmlType={"submit"}>Create Pool</ButtonCustom>
                </Form.Item>
              )}
            </div>
          )}
        </div>
      </FormLayout>
    </div>
  );
};

export default PoolForm;
