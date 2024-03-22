"use client";
import { Modal } from "antd";
import { PropsWithChildren, useState } from "react";
import CreateFormModal from "./CreateFormModal";

const ActionCard = ({ icon, title, action }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => action()}>
      <div className="cursor-pointer w-48 h-48 bg-[#e6f8ff] shadow-lg rounded-lg flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-105">
        <span className="text-gray-800 text-[#00bdff]">{icon}</span>
        <span className="mt-2 text-center  text-[#00bdff] font-medium text-gray-800">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ActionCard;
