"use client";
import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea, FormUpload } from "@/src/components/ui/Form";
import { Heading5, Text } from "@/src/components/ui/Typography";
import { useSpl } from "@/src/hooks/useSpl";
import { useStorage } from "@/src/hooks/useStorage";
import FormLayout from "@/src/layout/FormLayout";
import { AppContext } from "@/src/provider/AppProvider";
import { checkTransactionConfirmation } from "@/utils/transaction";
import { PictureOutlined } from "@ant-design/icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Button,
  Form,
  Image,
  Modal,
  Switch,
  Tabs,
  TabsProps,
  UploadProps,
  message,
} from "antd";
import { useContext, useState } from "react";
import MarketForm from "./MarketForm";
import PoolForm from "./PoolForm";

const CreatePoolModal = ({ open, setOpen }: any) => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const { connected } = useWallet();
  const [baseAmount, setBaseAmount] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState(null);
  const [quoteToken, setQuoteToken] = useState(null);
  const [baseToken, setBaseToken] = useState(null);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Pool",
      children: (
        <PoolForm
          form={form1}
          connected={connected}
          baseAmount={baseAmount}
          quoteAmount={quoteAmount}
          baseToken={baseToken}
          quoteToken={quoteToken}
          setBaseAmount={setBaseAmount}
          setQuoteAmount={setQuoteAmount}
          setBaseToken={setBaseToken}
          setQuoteToken={setQuoteToken}
        />
      ),
    },
    {
      key: "2",
      label: "Create Market Id",
      children: <MarketForm form={form2} connected={connected} />,
    },
  ];

  return (
    <Modal
      title="Create Liquidity Pool"
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => {
        form1.resetFields();
        form2.resetFields();
        setBaseAmount(null);
        setQuoteAmount(null);
        setQuoteToken(null);
        setBaseToken(null);
        setOpen(false);
      }}
      width={"60%"}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={() => null} />
    </Modal>
  );
};

export default CreatePoolModal;
