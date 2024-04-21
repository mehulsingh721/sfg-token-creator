import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea, FormUpload } from "@/src/components/ui/Form";
import { Heading5, Text } from "@/src/components/ui/Typography";
import { usePool } from "@/src/hooks/usePool";
import { useSpl } from "@/src/hooks/useSpl";
import { useStorage } from "@/src/hooks/useStorage";
import FormLayout from "@/src/layout/FormLayout";
import { AppContext } from "@/src/provider/AppProvider";
import { checkTransactionConfirmation } from "@/utils/transaction";
import { PictureOutlined } from "@ant-design/icons";
import { PublicKey } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button, Form, Image, Modal, Switch, UploadProps, message } from "antd";
import { useContext, useState } from "react";

const RemoveLiquidityModal = ({ open, setOpen }: any) => {
  const { removeLiquidity } = usePool();
  const { setLoader } = useContext(AppContext);
  const [mintAddress, setMintAddress] = useState("");
  const [form] = Form.useForm();
  const { connected } = useWallet();

  const handleSubmit = async () => {
    setLoader({ loading: true, text: "Sending Transaction..." });
    const signature = await removeLiquidity(new PublicKey(mintAddress), 100);
    checkTransactionConfirmation(signature);
    setLoader({ loading: false, text: "" });
    setOpen(false);
  };

  return (
    <Modal
      title="Remove Liquidity"
      centered
      footer={null}
      open={open}
      onOk={() => {
        form.resetFields();
        setOpen(false);
      }}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
    >
      <FormLayout form={form} handleSubmit={() => handleSubmit()}>
        <div className="max-h-[65vh] overflow-auto">
          <div className="">
            <div className="">
              <div className="">
                <FormInput
                  name={"lpAddress"}
                  label="LP Address:"
                  placeholder="LP Address "
                  onChange={(e) => setMintAddress(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-centers">
          {!connected ? (
            <WalletMultiButton />
          ) : (
            <Form.Item>
              <ButtonCustom htmlType={"submit"}>Remove Liquidity</ButtonCustom>
            </Form.Item>
          )}
        </div>
      </FormLayout>
    </Modal>
  );
};

export default RemoveLiquidityModal;
