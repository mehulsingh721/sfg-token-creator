"use client";
import { Form, Switch, UploadProps, message } from "antd";
import { useState } from "react";
import { useStorage } from "../../src/hooks/useStorage";
import { useSpl } from "../../src/hooks/useSpl";
import {
  Heading1,
  Heading5,
  Heading6,
  Text,
} from "../../src/components/ui/Typography";
import FormLayout from "../../src/layout/FormLayout";
import {
  FormInput,
  FormTextArea,
  FormUpload,
} from "../../src/components/ui/Form";
import ButtonCustom from "../../src/components/ui/Button";

const TokenPage = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState("");
  const { uploadData } = useStorage();
  const { createToken } = useSpl();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.fileList[0].originFileObj);
        console.log(info.file, info.fileList);
        let formData = new FormData();
        formData.append("file", info.fileList[0].originFileObj);

        const url = URL.createObjectURL(info.fileList[0].originFileObj);
        setPreviewUrl(url);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file: any, fileList: any) {
      const blob = new Blob([file], {
        type: "image/webp",
      });
    },
  };

  const [tokenInfo, setTokenInfo] = useState<any>({
    name: "",
    symbol: "",
    decimals: 0,
    supply: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
  });

  const handleSubmit = async () => {
    const imageUrl = await uploadData(file);
    const metadata = {
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      description: tokenInfo.description,
      image: imageUrl,
      extensions: {
        telegram: tokenInfo.telegram,
        twitter: tokenInfo.twitter,
        discord: tokenInfo.discord,
      },
    };
    const metadataUrl = await uploadData(metadata);
    console.log();
    await createToken(metadataUrl, tokenInfo);
    return metadataUrl;
  };

  return (
    <div>
      <div className="text-center my-4">
        <Heading1>Solana Token Creator</Heading1>
        <Heading6 className="text-gray-200">
          Easily Create your own Solana SPL Token in just 7+1 steps without
          Coding.
        </Heading6>
      </div>

      <img src={previewUrl} />

      <FormLayout handleSubmit={handleSubmit}>
        <div className="md:flex md:space-x-4">
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
                />
              </div>
              <div className="w-full sm:w-6/12">
                <FormInput
                  name={"supply"}
                  label="Supply :"
                  placeholder="Put your "
                  onChange={(e) => {
                    setTokenInfo({ ...tokenInfo, supply: e.target.value });
                  }}
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
              />
              <FormUpload label="Description :" props={props} name="image" />
            </div>
            <div>
              <Switch />
            </div>
            {true && (
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
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="md:w-6/12 bg-gray-100 my-4 p-4 sm:p-8 rounded-xl">
            <Heading5 className="mb-8">Token Information</Heading5>

            {Object.keys(tokenInfo).map((key) => (
              <div className="flex">
                <div className="w-4/12 space-y-4">
                  <Text className="block capitalize">{key} :</Text>
                </div>
                <div className="w-8/12 space-y-4">
                  <Text className="block">{tokenInfo[key]}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-centers">
          <Form.Item>
            <ButtonCustom htmlType={"submit"}>Select Wallet</ButtonCustom>
          </Form.Item>
        </div>
      </FormLayout>
    </div>
  );
};

export default TokenPage;
