"use client";
import { Modal } from "antd";
import { PropsWithChildren, useState } from "react";
import CreateFormModal from "./CreateFormModal";

const ActionCard = ({ icon, title, action }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => action()}>
      <div className="cursor-pointer w-[20rem] h-[20rem] bg-[#e6ebff] shadow-lg rounded-[5rem] flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-105">
        <span className="text-gray-800 text-[#0038ff]">{icon}</span>
        <span className="mt-5 text-center text-[#0038ff] text-[20px] font-medium text-gray-800">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ActionCard;
