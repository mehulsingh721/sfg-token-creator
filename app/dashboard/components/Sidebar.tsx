"use client";
import {
  AntDesignOutlined,
  BoxPlotOutlined,
  BulbOutlined,
  ControlOutlined,
  DollarOutlined,
  FireOutlined,
  FormOutlined,
  FunnelPlotOutlined,
  Html5Outlined,
  LineChartOutlined,
  PaperClipOutlined,
  PieChartOutlined,
  SendOutlined,
  TableOutlined,
  TeamOutlined,
  ToolOutlined,
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

const Sidebar = ({ hamburger, open, setOpen }: any) => {
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
    } else if (pathname === "/dashboard/idea-generation") {
      setSelectedItem("5");
    } else if (pathname === "/dashboard/branding-design") {
      setSelectedItem("6");
    } else if (pathname === "/dashboard/tokenomics") {
      setSelectedItem("7");
    } else if (pathname === "/dashboard/whitepaper") {
      setSelectedItem("8");
    } else if (pathname === "/dashboard/website") {
      setSelectedItem("9");
    } else if (pathname === "/dashboard/marketing-content") {
      setSelectedItem("10");
    } else if (pathname === "/dashboard/social-media-manager") {
      setSelectedItem("11");
    } else if (pathname === "/dashboard/social-media-posts") {
      setSelectedItem("12");
    } else if (pathname === "/dashboard/community-dashboard") {
      setSelectedItem("13");
    } else if (pathname === "/dashboard/listing-manager") {
      setSelectedItem("14");
    } else if (pathname === "/dashboard/analytics-optimization") {
      setSelectedItem("15");
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
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedItem]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.SubMenu
            icon={<ToolOutlined />}
            title="Creation Lab"
            key={"sub1"}
          >
            <Menu.Item icon={<DollarOutlined />} key={"1"}>
              <Link href={"/dashboard/token-manager"}>Token Manager</Link>
            </Menu.Item>
            <Menu.Item icon={<SendOutlined />} key={"2"}>
              <Link href={"/dashboard/multisender"}>Multisender</Link>
            </Menu.Item>
            <Menu.Item icon={<BoxPlotOutlined />} key={"3"}>
              <Link href={"/dashboard/liquidity-manager"}>
                Liquidity Manager
              </Link>
            </Menu.Item>
            <Menu.Item icon={<FireOutlined />} key={"4"}>
              <Link href={"/dashboard/burn"}>Burn</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item icon={<BulbOutlined />} key={"5"}>
            <Link href={"/dashboard/idea-generation"}>Idea Generation</Link>
          </Menu.Item>
          <Menu.Item icon={<AntDesignOutlined />} key={"6"}>
            <Link href={"/dashboard/branding-design"}>Branding & Design</Link>
          </Menu.Item>
          <Menu.Item icon={<PieChartOutlined />} key={"7"}>
            <Link href={"/dashboard/tokenomics"}>Tokenomics</Link>
          </Menu.Item>
          <Menu.Item icon={<PaperClipOutlined />} key={"8"}>
            <Link href={"/dashboard/tokenomics"}>Whitepaper</Link>
          </Menu.Item>
          <Menu.Item icon={<Html5Outlined />} key={"9"}>
            <Link href={"/dashboard/website"}>Website</Link>
          </Menu.Item>
          <Menu.Item icon={<FunnelPlotOutlined />} key={"10"}>
            <Link href={"/dashboard/marketing-content"}>Marketing Content</Link>
          </Menu.Item>
          <Menu.Item icon={<ControlOutlined />} key={"11"}>
            <Link href={"/dashboard/social-media-manager"}>
              Social Media Manager
            </Link>
          </Menu.Item>
          <Menu.Item icon={<FormOutlined />} key={"12"}>
            <Link href={"/dashboard/social-media-posts"}>
              Social Media Posts
            </Link>
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key={"13"}>
            <Link href={"/dashboard/community-dashboard"}>
              Community Manager
            </Link>
          </Menu.Item>
          <Menu.Item icon={<TableOutlined />} key={"14"}>
            <Link href={"/dashboard/listing-manager"}>Listing Manager</Link>
          </Menu.Item>
          <Menu.Item icon={<LineChartOutlined />} key={"15"}>
            <Link href={"/dashboard/analytics-optimization"}>
              Analytics & Optimization
            </Link>
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
