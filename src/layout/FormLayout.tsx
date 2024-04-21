"use client";
import { Form } from "antd";
import { PropsWithChildren } from "react";

const FormLayout = ({
  children,
  handleSubmit,
  form,
}: PropsWithChildren<{ handleSubmit: (values: any) => void; form: any }>) => {
  return (
    <div className="bg-white rounded-xl w-full shadow-l">
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        {children}
      </Form>
    </div>
  );
};

export default FormLayout;
