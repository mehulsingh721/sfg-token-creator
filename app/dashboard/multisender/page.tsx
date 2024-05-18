"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { INSTRUCTION_TEXT_COLOR } from "@/app/constants/app";
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea } from "@/src/components/ui/Form";
import { useSpl } from "@/src/hooks/useSpl";
import FormLayout from "@/src/layout/FormLayout";
import { AppContext } from "@/src/provider/AppProvider";
import { checkTransactionConfirmation } from "@/utils/transaction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { Form, Radio } from "antd";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const MultiSender = () => {
  const { setLoader } = useContext(AppContext);
  const [form] = Form.useForm();
  const { connected } = useWallet();
  const { checkATAs, createATAs, multisend } = useSpl();
  const [checkWallets, setCheckWallets] = useState(true);
  const [recipientsInfo, setRecipientsInfo] = useState(false);
  const [tokenType, setTokenType] = useState("SOL");
  const [userAddresses, setUserAddresses] = useState<Array<PublicKey>>([]);

  const createRecipients = (values: any) => {
    const { receipients } = values;
    const recipientList: any = [];
    const userAddressesList: Array<PublicKey> = [];

    receipients.split("\n").forEach((element: any) => {
      element = element.trim();

      const recipientInfo = {
        address: "",
        amount: "",
      };
      const info = element.split(" ");
      if (info.length === 2) {
        recipientInfo.address = info[0];
        recipientInfo.amount = info[1];
        userAddressesList.push(new PublicKey(recipientInfo.address));
        recipientList.push(recipientInfo as any);
      } else {
        throw new Error("Invalid Data Input");
      }
    });
    setUserAddresses(userAddressesList);
    setRecipientsInfo(recipientList);
    return { userAddressesList, recipientList };
  };

  const handleCheckWallets = async (values: any) => {
    try {
      setLoader({ loading: true, text: "Checking ATAs..." });
      const { tokenAddress, receipients } = values;
      const mintAddress = new PublicKey(tokenAddress);

      const { userAddressesList: userAddresses } = createRecipients(values);
      const finalList: Array<PublicKey> = await checkATAs(
        mintAddress,
        userAddresses
      );

      if (finalList.length > 0) {
        setLoader({ loading: true, text: "Creating ATAs..." });
        const signature = await createATAs(mintAddress, finalList);
        setLoader({ loading: false, text: "" });
        checkTransactionConfirmation(signature);
      } else {
        setLoader({ loading: false, text: "" });
        toast.success("ATAs checked successfully");
      }

      setCheckWallets(false);
    } catch (err: any) {
      setLoader({ loading: false, text: "" });
      toast.error(err.message);
    }
  };

  const handleMultisend = async (values: any) => {
    try {
      const { recipientList: recipientsInfo } = createRecipients(values);
      const { tokenAddress } = values;
      let mintAddress: any;

      if (tokenType === "SPL") {
        mintAddress = new PublicKey(tokenAddress);
      }

      setLoader({ loading: true, text: "Sending funds..." });

      const signature = await multisend(mintAddress, recipientsInfo, tokenType);

      checkTransactionConfirmation(signature);
      setLoader({ loading: false, text: "" });
      return signature;
    } catch (err: any) {
      setLoader({ loading: false, text: "" });
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="flex p-4 w-full justify-center items-center">
        <div className="w-[50%] mx-auto shadow-md rounded-lg px-5 py-5">
          <FormLayout
            form={form}
            handleSubmit={(values) =>
              checkWallets && tokenType === "SPL"
                ? handleCheckWallets(values)
                : handleMultisend(values)
            }
          >
            <Form.Item label="Token Type: " required>
              <Radio
                defaultChecked
                checked={tokenType === "SOL"}
                onChange={() => setTokenType("SOL")}
              >
                Send Solana
              </Radio>
              <Radio
                defaultChecked={false}
                checked={tokenType === "SPL"}
                onChange={() => setTokenType("SPL")}
              >
                Send SPL Token
              </Radio>
            </Form.Item>
            {tokenType === "SPL" && (
              <FormInput
                name={"tokenAddress"}
                label="Token Address:"
                placeholder="Put your token address"
                onChange={(e) => {}}
                required={true}
              />
            )}
            <FormTextArea
              label="Addresses and amount:"
              placeholder={`Wallet-Address amount\n For example:\n 9J6akKgzRDWBKyeaDDkbREEUTYVSVVHY8L6qjW7AQkB4 0.2\n 9J6akKgzRDWBKyeaDDkbREEUTYVSVVHY8L6qjW7AQkB4 0.2`}
              name="receipients"
              onChange={(e) => {}}
              required={true}
            />
            <div className="flex justify-center items-centers">
              {!connected ? (
                <WalletMultiButton />
              ) : checkWallets && tokenType === "SPL" ? (
                <Form.Item>
                  <ButtonCustom htmlType={"submit"}>Check Wallets</ButtonCustom>
                </Form.Item>
              ) : (
                <Form.Item>
                  <ButtonCustom htmlType={"submit"}>Send Funds</ButtonCustom>
                </Form.Item>
              )}
            </div>
          </FormLayout>
        </div>
      </div>

      <div className="px-10 py-10">
        <h1 className="text-2xl">How to interact with Multisender.</h1>
        <div>
          <p
            style={{
              color: INSTRUCTION_TEXT_COLOR,
            }}
          >
            1. Connect your Solana wallet.
          </p>
          <p
            style={{
              color: INSTRUCTION_TEXT_COLOR,
            }}
          >
            2. Select “Send Solana” for sending Solana Coin from “Token Type”.
          </p>
          <p
            style={{
              color: INSTRUCTION_TEXT_COLOR,
            }}
          >
            3. Select “Send SPL Token” for sending any SPL token from “Token
            Type”.
          </p>
        </div>
        <div className="mt-6">
          <div>
            <h2 className="text-lg">
              Multi-send Solana Coin (For sending Solana coin to multiple
              addresses)
            </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Type &lt;Wallet-address&gt; space &lt;amount&gt;.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              2. For multiple wallets repeat same in every line.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              3. It supports up to 10 addresses at once to send in bulk.
            </p>
          </div>
        </div>

        <div className="mt-2">
          <div>
            <h2 className="text-lg">
              Multi-send SPL Token(For sending SPL Token to multiple addresses)
            </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Input token address and verify token with wallet interaction.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              2. After wallet approval, Type Type &lt;Wallet-address&gt; space
              &lt;amount&gt;
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              3. For multiple wallets repeat same in every line.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              4. It supports up to 10 addresses at once to send in bulk.
            </p>
          </div>
          <div>
            <h2 className="text-lg mt-2">Pricing: </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              For $SFG Holders - Free
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              Non-$SFG Holders - .01 SOL
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiSender;
