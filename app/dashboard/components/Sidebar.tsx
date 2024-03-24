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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const Sidebar = () => {
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
        <div className="py-5 px-8">Powered By SolanaForge</div>
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
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.2rem",
          lineHeight: 0,
        }}
      >
        <FontAwesomeIcon icon={faXTwitter} />
        <FontAwesomeIcon icon={faTelegram} />
        <FontAwesomeIcon icon={faGlobe} />
        <FontAwesomeIcon icon={faDiscord} />
      </Footer>
    </div>
  );
};
export default Sidebar;
