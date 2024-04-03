import { FormInput } from "@/src/components/ui/Form";
import FormLayout from "@/src/layout/FormLayout";
import { Form } from "antd";

const PromptComponent = ({
  heading,
  input1Label,
  input2Label,
  input3Label,
  description,
}: any) => {
  const [form] = Form.useForm();
  return (
    <>
      <div className="w-full flex h-full items-center justify-between m-auto">
        <div className="w-full h-full">
          <div className="w-[65%] flex flex-col h-full justify-between">
            <div>
              <h1 className="text-base font-semibold mb-10">{heading}</h1>
              <FormLayout form={form} handleSubmit={() => null}>
                <FormInput
                  name={"campaignGoals"}
                  label={input1Label}
                  placeholder={input1Label}
                  onChange={(e) => {}}
                  required={true}
                />
                <FormInput
                  name={"campaignGoals"}
                  label={input2Label}
                  placeholder={input2Label}
                  onChange={(e) => {}}
                  required={true}
                />
                <FormInput
                  name={"campaignGoals"}
                  label={input3Label}
                  placeholder={input3Label}
                  onChange={(e) => {}}
                  required={true}
                />
              </FormLayout>
            </div>
            <div className="">
              <h1 className="bg-[#F1F0F1]/45 py-4 px-4 rounded-lg">
                {description}
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#F1F0F1]/45 w-full h-full rounded-lg"></div>
      </div>
    </>
  );
};

export default PromptComponent;
