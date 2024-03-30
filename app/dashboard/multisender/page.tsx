"use client";
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea } from "@/src/components/ui/Form";
import FormLayout from "@/src/layout/FormLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Form } from "antd";

const MultiSender = () => {
  const [form] = Form.useForm();
  const { connected } = useWallet();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (values: any) => {
    console.log(values.description.split("\n"));
  };

  return (
    <div className="container mx-auto p-4 w-screen">
      <div className="w-[50%] m-auto">
        <FormLayout form={form} handleSubmit={(values) => handleSubmit(values)}>
          <FormInput
            name={"name"}
            label="Token Address:"
            placeholder="Put your token address"
            onChange={(e) => {}}
            required={true}
          />
          <FormTextArea
            label="Input Data:"
            placeholder="Put the description of your token"
            name="description"
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
