"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea } from "@/src/components/ui/Form";
import { useSpl } from "@/src/hooks/useSpl";
import FormLayout from "@/src/layout/FormLayout";
import { AppContext } from "@/src/provider/AppProvider";
import { checkTransactionConfirmation } from "@/utils/transaction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { Form } from "antd";
import { useContext } from "react";

const MultiSender = () => {
  const { setLoader } = useContext(AppContext);
  const [form] = Form.useForm();
  const { connected } = useWallet();
  const { multisend, checkATAs, createATAs } = useSpl();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = async (values: any) => {
    setLoader({ loading: true, text: "Checking ATAs..." });
    const { tokenAddress, receipients } = values;
    const recipientList: any = [];
    const mintAddress = new PublicKey(tokenAddress);
    const userAddresses: Array<PublicKey> = [];

    receipients.split("\n").forEach((element: any) => {
      const recipientInfo = {
        address: "",
        amount: "",
      };
      const info = element.split(" ");
      recipientInfo.address = info[0];
      recipientInfo.amount = info[1];
      userAddresses.push(new PublicKey(recipientInfo.address));
      recipientList.push(recipientInfo);
    });

    setLoader({ loading: true, text: "Checking ATAs..." });
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
    }
    console.log(finalList);
    // console.log(recipientList);
    // await multisend(mintAddress, recipientList);
  };

  return (
    <div className="flex p-4 w-full">
      <div className="w-[50%] mx-auto">
        <FormLayout form={form} handleSubmit={(values) => handleSubmit(values)}>
          <FormInput
            name={"tokenAddress"}
            label="Token Address:"
            placeholder="Put your token address"
            onChange={(e) => {}}
            required={true}
          />
          <FormTextArea
            label="Addresses and amount:"
            placeholder="Put the description of your token"
            name="receipients"
            onChange={(e) => {}}
            required={false}
          />
          <div className="flex justify-center items-centers">
            {!connected ? (
              <WalletMultiButton />
            ) : (
              <Form.Item>
                <ButtonCustom htmlType={"submit"}>Create Token</ButtonCustom>
              </Form.Item>
            )}
          </div>
        </FormLayout>
      </div>
    </div>
  );
};

export default MultiSender;
