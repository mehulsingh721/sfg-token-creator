import ButtonCustom from "@/src/components/ui/Button";
import { FormInput, FormTextArea, FormUpload } from "@/src/components/ui/Form";
import { Heading5, Text } from "@/src/components/ui/Typography";
import { useSpl } from "@/src/hooks/useSpl";
import { useStorage } from "@/src/hooks/useStorage";
import FormLayout from "@/src/layout/FormLayout";
import { AppContext } from "@/src/provider/AppProvider";
import { checkTransactionConfirmation } from "@/utils/transaction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Form, Modal } from "antd";
import { useContext, useState } from "react";

const RevokeMintAuthorityModal = ({ open, setOpen }: any) => {
  const { revokeMintAuthority } = useSpl();
  const [mintAddress, setMintAddress] = useState("");
  const { setLoader } = useContext(AppContext);
  const [form] = Form.useForm();
  const { connected } = useWallet();

  const handleSubmit = async () => {
    setLoader({ loading: true, text: "Sending Transaction..." });
    const signature = await revokeMintAuthority(mintAddress);
    checkTransactionConfirmation(signature);
    setLoader({ loading: false, text: "" });
    setOpen(false);
  };

  return (
    <Modal
      title="Revoke Mint Authority"
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <FormLayout form={form} handleSubmit={() => handleSubmit()}>
        <div className="max-h-[65vh] overflow-auto">
          <div className="">
            <div className="">
              <div className="">
                <FormInput
                  name={"name"}
                  label="Token Address:"
                  placeholder="Token Address "
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
              <ButtonCustom htmlType={"submit"}>
                Revoke Mint Authority
              </ButtonCustom>
            </Form.Item>
          )}
        </div>
      </FormLayout>
    </Modal>
  );
};

export default RevokeMintAuthorityModal;
