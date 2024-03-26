"use client";
import { Modal } from "antd";
import { PropsWithChildren, useState } from "react";
import CreateFormModal from "./CreateFormModal";

const ActionCard = ({ icon, title, action }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => action()}>
      <div className="cursor-pointer bg-[#e6ebff] shadow-lg rounded-[2rem] flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-105 w-[10rem] h-[10rem] md:w-[12rem] md:h-[12rem] md:rounded-[3rem] 2xl:rounded-[5rem] 2xl:w-[20rem] 2xl:h-[20rem]">
        <span className="text-gray-800 text-[#0038ff]">{icon}</span>
        <span className="mt-5 text-center text-[#0038ff] text-lg font-medium text-gray-800 sm:text-base md:text-md 2xl:text-lg">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ActionCard;
