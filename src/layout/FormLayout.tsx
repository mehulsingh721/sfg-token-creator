"use client";
import { Form } from "antd";
import { PropsWithChildren } from "react";

const FormLayout = ({
  children,
  handleSubmit,
}: PropsWithChildren<{ handleSubmit: (values: any) => void }>) => {
  return (
    <div className="bg-white p-4 sm:p-8 md:p-12 rounded-xl shadow-l">
      <Form layout="vertical" onFinish={(values) => handleSubmit(values)}>
        {children}
      </Form>
    </div>
  );
};

export default FormLayout;
