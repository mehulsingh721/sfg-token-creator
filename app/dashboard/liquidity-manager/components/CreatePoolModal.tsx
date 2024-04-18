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
  const { revokeFreezeAuthority } = useSpl();
  const { setLoader } = useContext(AppContext);
  const [mintAddress, setMintAddress] = useState("");
  const [form] = Form.useForm();
  const { connected } = useWallet();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create Pool",
      children: <PoolForm form={form} connected={connected} />,
    },
    {
      key: "2",
      label: "Create Market Id",
      children: <MarketForm form={form} connected={connected} />,
    },
  ];

  const handleChange = () => {};

  return (
    <Modal
      title="Create Liquidity Pool"
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={"60%"}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} />
    </Modal>
  );
};

export default CreatePoolModal;
