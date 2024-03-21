"use client";
import { Form, Switch, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";

const { Dragger } = Upload;
const { TextArea } = Input;

type formType = {
  label: string;
  name: string;
  inputType?: string | "text";
  placeholder?: string;
  onChange?(info: any): void | undefined;
  props?: {
    name: string;
    multiple: boolean;
    action: string;
    onChange(info: any): void;
    onDrop(e: any): void;
  };
};
export function FormInput({
  label,
  placeholder,
  name,
  inputType,
  onChange,
}: formType) {
  return (
    <Form.Item className="" name={name} label={label}>
      <Input
        className="p-2"
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
      />
    </Form.Item>
  );
}

export function FormTextArea({ label, placeholder, name, onChange }: formType) {
  return (
    <Form.Item name={name} label={label}>
      <TextArea
        className="p-2"
        rows={5}
        placeholder={placeholder}
        onChange={(value) => onChange && onChange(value)}
      />
    </Form.Item>
  );
}
export function FormUpload({ label, props, name }: formType) {
  return (
    <Form.Item label={label} name={name}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </Form.Item>
  );
}
