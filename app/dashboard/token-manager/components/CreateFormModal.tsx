require("@solana/wallet-adapter-react-ui/styles.css");
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
import { Button, Form, Image, Modal, Switch, UploadProps, message } from "antd";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const initialTokenInfo = {
  name: "",
  symbol: "",
  decimals: 0,
  supply: "",
  description: "",
  website: "",
  twitter: "",
  telegram: "",
  discord: "",
};
const CreateForm = ({ open, setOpen }: any) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [extentions, setExtentions] = useState(false);
  const [file, setFile] = useState(null);
  const [tokenInfo, setTokenInfo] = useState<any>(initialTokenInfo);
  const { uploadData } = useStorage();
  const { createToken } = useSpl();
  const { setLoader } = useContext(AppContext);
  const [form] = Form.useForm();
  const { connected } = useWallet();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info: any) {
      const { status } = info.file;
      console.log(status);
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.fileList[0].originFileObj);
        console.log(info.file, info.fileList);
        let formData = new FormData();
        formData.append("file", info.fileList[0].originFileObj);

        const url = URL.createObjectURL(info.fileList[0].originFileObj);
        setImageUrl(url as any);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file: any, fileList: any) {
      return file;
    },
  };

  const handleSubmit = async () => {
    try {
      setLoader({ loading: true, text: "Uploading Image to IPFS..." });
      const imageUrl = await uploadData(file);
      const metadata = {
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        description: tokenInfo.description,
        image: imageUrl,
        extensions: {
          telegram: tokenInfo.telegram,
          twitter: tokenInfo.twitter,
          x: tokenInfo.twitter,
          discord: tokenInfo.discord,
          website: tokenInfo.website,
        },
      };
      setLoader({ loading: true, text: "Uploading Metadata to IPFS..." });
      const metadataUrl = await uploadData(metadata);
      setLoader({ loading: true, text: "Sending Transaction..." });
      const signature = await createToken(metadataUrl, tokenInfo);
      checkTransactionConfirmation(signature);
      setLoader({ loading: false, text: "" });
      setTokenInfo(initialTokenInfo);
      form.resetFields();
      setOpen(false);
      setImageUrl(null);
      return metadataUrl;
    } catch (err) {
      setLoader({ loading: false, text: "" });
    }
  };

  return (
    <Modal
      title="Create Token"
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => {
        setOpen(false);
        setTokenInfo(initialTokenInfo);
        setImageUrl(null);
        form.resetFields();
      }}
      width={1000}
      style={{}}
    >
      <FormLayout form={form} handleSubmit={() => handleSubmit()}>
        <div className="md:flex md:space-x-4 max-h-[65vh] overflow-auto">
          <div className="md:w-6/12">
            <div className="sm:flex sm:space-x-4">
              <div className="w-full sm:w-6/12">
                <FormInput
                  name={"name"}
                  label="Name:"
                  placeholder="Put your "
                  onChange={(e) => {
                    setTokenInfo({ ...tokenInfo, name: e.target.value });
                  }}
                  required={true}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <FormInput
                  name={"symbol"}
                  label="Symbol:"
                  placeholder="Put your "
                  onChange={(e) => {
                    setTokenInfo({ ...tokenInfo, symbol: e.target.value });
                  }}
                  required={true}
                />
              </div>
            </div>
            <div className="sm:flex sm:space-x-4">
              <div className="w-full sm:w-6/12">
                <FormInput
                  name={"decimals"}
                  label="Decimals :"
                  placeholder="Put your "
                  inputType="number"
                  onChange={(e) => {
                    setTokenInfo({ ...tokenInfo, decimals: e.target.value });
                  }}
                  required={true}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <FormInput
                  name={"supply"}
                  label="Supply :"
                  placeholder="Put your "
                  inputType="number"
                  onChange={(e) => {
                    setTokenInfo({ ...tokenInfo, supply: e.target.value });
                  }}
                  required={true}
                />
              </div>
            </div>
            <div>
              <FormTextArea
                label="Description:"
                placeholder="Put the description of your token"
                name="description"
                onChange={(e) => {
                  setTokenInfo({ ...tokenInfo, description: e.target.value });
                }}
                required={false}
              />
              <FormUpload
                label="Token Image :"
                props={props as any}
                name="image"
                required={false}
              />
            </div>
            <div className="flex gap-5 mb-5">
              <h1>Addtional Data: </h1>
              <Switch
                checked={extentions}
                onChange={() => setExtentions(!extentions)}
              />
            </div>
            {extentions && (
              <div>
                <div className="sm:flex sm:space-x-4">
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Website :"
                      placeholder="Put your Website"
                      name="website"
                      onChange={(e) => {
                        setTokenInfo({ ...tokenInfo, website: e.target.value });
                      }}
                      required={false}
                    />
                  </div>
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Twitter :"
                      placeholder="Put your Twitter"
                      name="twitter"
                      onChange={(e) => {
                        setTokenInfo({ ...tokenInfo, twitter: e.target.value });
                      }}
                      required={false}
                    />
                  </div>
                </div>
                <div className="sm:flex sm:space-x-4">
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Telegram :"
                      placeholder="Put your Telegram"
                      name="telegram"
                      onChange={(e) => {
                        setTokenInfo({
                          ...tokenInfo,
                          telegram: e.target.value,
                        });
                      }}
                      required={false}
                    />
                  </div>
                  <div className="w-full sm:w-6/12">
                    <FormInput
                      label="Discord :"
                      placeholder="Put your Discord"
                      name="discord"
                      onChange={(e) => {
                        setTokenInfo({
                          ...tokenInfo,
                          discord: e.target.value,
                        });
                      }}
                      required={false}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="md:w-6/12  p-4 rounded-xl">
            <div className="w-full h-[50%] bg-[#f0f0f0] flex flex-col justify-center items-center text-[#004c66] rounded-xl">
              {imageUrl ? (
                // When imageUrl is available, display the image
                <Image
                  src={imageUrl}
                  alt="Token Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    maxHeight: "100%",
                  }}
                />
              ) : (
                // When imageUrl is not available, show placeholder icon and text
                <>
                  <PictureOutlined style={{ fontSize: "24px" }} />
                  <span className="mt-2 text-center">Token Image</span>
                </>
              )}
            </div>
          </div>
        </div>
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
    </Modal>
  );
};

export default CreateForm;
