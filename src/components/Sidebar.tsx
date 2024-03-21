"use client";
import { Heading5, Heading6 } from "./ui/Typography";
import ButtonCustom from "./ui/Button";
import { useState } from "react";
import { Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function SidebarContent() {
  return (
    <>
      <div className="p-4 hover:bg-gray-100 rounded-xl hover:cursor-pointer text-center">
        <Heading6 className="text-gray-200">Home</Heading6>
      </div>
      <div>
        <Heading5 className="text-gray-200">Token</Heading5>
        {[...tokenLinks].map((item) => (
          <div className="p-4 hover:bg-gray-100 rounded-xl hover:cursor-pointer text-left flex items-center gap-5">
            {item.icon}
            <Heading6>{item.name}</Heading6>
          </div>
        ))}
      </div>
      {/* <div>
        <Heading5>NFT</Heading5>
        {[...Array(3)].map((i) => (
          <div className="p-4 hover:bg-gray-100 rounded-xl hover:cursor-pointer text-center">
            <Heading6 className="text-gray-200">Creator</Heading6>
          </div>
        ))}
      </div> */}
    </>
  );
}

export function Sidebar() {
  return (
    <div className="w-2/12 p-4 border-r-2 border-gray-100 space-y-8 hidden md:block sticky top-16 left-0 h-fit">
      <SidebarContent />
    </div>
  );
}
export const BurgerSidebar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ButtonCustom type="text" onClick={showDrawer} className="flex md:hidden">
        Open
      </ButtonCustom>
      <Drawer placement="left" onClose={onClose} open={open} size="default">
        <div className="w-full max-w-[20rem] p-6 border">
          <SidebarContent />
        </div>
      </Drawer>
    </>
  );
};

const tokenLinks = [
  {
    name: "Token Creator",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  {
    name: "Token Multisender",
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
  },
  {
    name: "Create Token Sale",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  {
    name: "Create Liquidity Pool",
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
];
