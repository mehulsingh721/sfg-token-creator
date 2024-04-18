"use client";
import {
  OPENBOOK_OPTIONS,
  ORDER_SIZE_OPTIONS,
  TICK_SIZE_OPTIONS,
} from "@/app/constants/app";
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea } from "@/src/components/ui/Form";
import { useOpenbook } from "@/src/hooks/useOpenbook";
import { useSpl } from "@/src/hooks/useSpl";
import FormLayout from "@/src/layout/FormLayout";
import { CopyOutlined } from "@ant-design/icons";
import { TxVersion } from "@raydium-io/raydium-sdk";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { useSDK } from "@thirdweb-dev/react";
import { Alert, Form, Select, Switch } from "antd";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const MarketForm = ({ form, connected }: any) => {
  const [advanced, setAdvanced] = useState(false);
  const { createMarket } = useOpenbook();
  const { getAccountInfo } = useSpl();
  const { getTokens, getMetadata } = useSpl();
  const [userTokens, setUserTokens] = useState([]);
  const [selectedOpenbook, setSelectedOpenbook] = useState(0);
  const [marketId, setMarketId] = useState("d");

  useMemo(() => {
    form.setFieldsValue({
      orderbookLength: `${OPENBOOK_OPTIONS[selectedOpenbook].orderbookLength} Bytes`,
      eventQueue: `${OPENBOOK_OPTIONS[selectedOpenbook].eventQueueLength} Bytes`,
      requestQueue: `${OPENBOOK_OPTIONS[selectedOpenbook].requestQueueLength} Bytes`,
    });
  }, [selectedOpenbook]);

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

  const handleSubmit = async (values: any) => {
    const lotSize = values.minOrderSize;
    const tickSize = values.tickSize;
    const baseInfo = getTokenInfo(values.baseToken);
    const quoteInfo = getTokenInfo(values.quoteToken);
    await createMarket({
      baseInfo: baseInfo,
      quoteInfo: quoteInfo,
      lotSize: parseFloat(ORDER_SIZE_OPTIONS[lotSize].size),
      tickSize: parseFloat(TICK_SIZE_OPTIONS[tickSize].size),
      makeTxVersion: TxVersion.V0,
      eventQueueLength: OPENBOOK_OPTIONS[selectedOpenbook].eventQueueLength,
      requestQueueLength: OPENBOOK_OPTIONS[selectedOpenbook].requestQueueLength,
      orderbookLength: OPENBOOK_OPTIONS[selectedOpenbook].orderbookLength,
    });
    // const quoteInfo = getAccountInfo(new PublicKey(values.quoteToken));
  };

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
        setUserTokens(tokensList as any);
      })();
    }
  }, [connected]);

  return (
    <div className="w-full">
      <FormLayout form={form} handleSubmit={(values) => handleSubmit(values)}>
        <div className="md:flex md:space-x-4 w-full max-h-[65vh] overflow-auto items-center justify-center">
          <div className="w-full">
            <div className="sm:flex sm:space-x-4">
              <div className="w-full sm:w-6/12">
                <Form.Item label="Base Token" required name={"baseToken"}>
                  <Select>
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
                  <Select>
                    <Select.Option key={"sol"}>
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                          }
                          className="h-5 w-5"
                        />
                        <h1>
                          {"Solana"} {`(Sol)`}
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
              <div className="w-full sm:w-6/12">
                <Form.Item
                  label="Min Order Size (Minimum Buy)"
                  required
                  name={"minOrderSize"}
                >
                  <Select>
                    {ORDER_SIZE_OPTIONS.map((item: any, key: any) => (
                      <Select.Option key={key}>
                        <div className="flex items-center">
                          <h1>
                            {item.size} (For Upto {item.supply} Token Supply)
                          </h1>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="w-full sm:w-6/12">
                <Form.Item
                  label="Tick Size (Minimum Price Change): "
                  required
                  name={"tickSize"}
                >
                  <Select>
                    {TICK_SIZE_OPTIONS.map((item: any, key: any) => (
                      <Select.Option key={key}>
                        <div className="flex items-center">
                          <h1>
                            {item.size} (For Upto {item.supply} Token Supply)
                          </h1>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <h1>Advanced Openbook: </h1>
              <Switch
                checked={advanced}
                onChange={() => setAdvanced(!advanced)}
              />
            </div>
            {advanced && (
              <div>
                <Form.Item label="Openbook market: ">
                  <Select
                    defaultValue={"0"}
                    onChange={(value) => setSelectedOpenbook(parseInt(value))}
                  >
                    {OPENBOOK_OPTIONS.map((item: any, key: any) => (
                      <Select.Option key={key}>
                        <div className="flex items-center gap-2">
                          {item.amount} SOL
                        </div>
                      </Select.Option>
                    ))}
                    {/* <Select.Option key={"1.5"}>
                      <div className="flex items-center gap-2">1.5 SOL</div>
                    </Select.Option>
                    <Select.Option key={"2.8"}>
                      <div className="flex items-center gap-2">2.8 SOL</div>
                    </Select.Option> */}
                  </Select>
                </Form.Item>
                <div className="sm:flex sm:space-x-4">
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Event Queue Length :"
                      placeholder="Put your Website"
                      name="eventQueue"
                      onChange={(e) => {}}
                      required={false}
                      defaultValue={`${OPENBOOK_OPTIONS[selectedOpenbook].eventQueueLength} Bytes`}
                      disabled={true}
                    />
                  </div>
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Request Queue Length :"
                      placeholder="Put your Twitter"
                      name="requestQueue"
                      onChange={(e) => {}}
                      required={false}
                      defaultValue={`${OPENBOOK_OPTIONS[selectedOpenbook].requestQueueLength} Bytes`}
                    />
                  </div>
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Orderbook Length :"
                      placeholder="Put your Telegram"
                      name="orderbookLength"
                      onChange={(e) => {}}
                      required={false}
                      defaultValue={`${OPENBOOK_OPTIONS[selectedOpenbook].orderbookLength} Bytes`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {marketId !== "" ? (
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-xl">Your Openbook ID</h1>
            <div
              onClick={() => {
                navigator.clipboard.writeText(marketId);
                toast.success("Market ID Copied!!");
              }}
              className="flex text-[#0038ff] cursor-pointer"
            >
              <h1 className="">{marketId}</h1>
              <CopyOutlined />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-centers">
            {!connected ? (
              <WalletMultiButton />
            ) : (
              <Form.Item>
                <ButtonCustom htmlType={"submit"}>
                  Create Market ID
                </ButtonCustom>
              </Form.Item>
            )}
          </div>
        )}
      </FormLayout>
    </div>
  );
};

export default MarketForm;
