"use client";
import { Button } from "antd";

export interface ButtonProps {
  type?: any;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  htmlType: any;
}

export default function ButtonCustom({
  type = "",
  children,
  className,
  htmlType,
  onClick,
}: ButtonProps) {
  return (
    <Button
      htmlType={htmlType}
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
