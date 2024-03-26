"use client";
import { Modal } from "antd";
import { PropsWithChildren, useState } from "react";
import CreateFormModal from "./CreateFormModal";

const ActionCard = ({ icon, title, action }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => action()}>
      <div className="cursor-pointer w-100 h-100 bg-[#e6ebff] shadow-lg rounded-[5rem] flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-105 sm:w-[15rem] sm:h-[15rem] md:w-[20rem] md:h-[20rem] lg:h-[12rem] lg:w-[12rem] lg:rounded-[2.5rem] 2xl:rounded-[5rem] 2xl:w-[20rem] 2xl:h-[20rem]">
        <span className="text-gray-800 text-[#0038ff]">{icon}</span>
        <span className="mt-5 text-center text-[#0038ff] text-lg font-medium text-gray-800 sm:text-base md:text-lg">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ActionCard;
