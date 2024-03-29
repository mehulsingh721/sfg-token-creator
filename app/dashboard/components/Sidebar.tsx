"use client";
import {
  BoxPlotOutlined,
  DollarOutlined,
  FireOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  faDiscord,
  faTelegram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Logo from "../../../src/assets/NEW_Logo_Dark.svg";
import HamburgerIcon from "./Hamburger";

const Sidebar = ({ hamburger, setHamburger, open, setOpen }: any) => {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("");

  useMemo(() => {
    if (pathname === "/dashboard/token-manager") {
      setSelectedItem("1");
    } else if (pathname === "/dashboard/multisender") {
      setSelectedItem("2");
    } else if (pathname === "/dashboard/liquidity-manager") {
      setSelectedItem("3");
    } else if (pathname === "/dashboard/burn") {
      setSelectedItem("4");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="">
        <div className="py-4 font-medium px-8 text-sm">
          <div className="flex items-center gap-5">
            {hamburger && <HamburgerIcon open={open} setOpen={setOpen} />}
            {!open && (
              <div>
                <span>Powered By</span>
                <Image src={Logo} height={150} width={200} alt="flkdjfd" />
              </div>
            )}
          </div>
        </div>
        <Menu mode="inline" defaultSelectedKeys={[selectedItem]}>
          <Menu.Item icon={<DollarOutlined />} key={"1"}>
            <Link href={"/dashboard/token-manager"}>Token Manager</Link>
          </Menu.Item>
          <Menu.Item icon={<SendOutlined />} key={"2"}>
            <Link href={"/dashboard/multisender"}>Multisender</Link>
          </Menu.Item>
          <Menu.Item icon={<BoxPlotOutlined />} key={"3"}>
            <Link href={"/dashboard/liquidity-manager"}>Liquidity Manager</Link>
          </Menu.Item>
          <Menu.Item icon={<FireOutlined />} key={"4"}>
            <Link href={"/dashboard/burn"}>Burn</Link>
          </Menu.Item>
        </Menu>
      </div>

      <Footer
        style={{
          textAlign: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          color: "#14161E",
          fontSize: "1.2rem",
          lineHeight: 0,
          textDecoration: "none",
          width: "100%",
          paddingInline: 30,
        }}
        className={`flex justify-between ${
          open && "flex-col"
        } items-center gap-5`}
      >
        <a
          href="https://twitter.com/Solana_Forge"
          className="text-black"
          target="_blank"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a
          href="https://t.me/solana_forge"
          target="_blank"
          className="text-black"
        >
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a
          href="https://discord.gg/DbAPcswG"
          target="_blank"
          className="text-black"
        >
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a
          href="https://solanaforge.dev"
          target="_blank"
          className="text-black"
        >
          <FontAwesomeIcon icon={faGlobe} />
        </a>
      </Footer>
    </div>
  );
};
export default Sidebar;
