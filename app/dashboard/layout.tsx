"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { ReactNode, createElement, useState } from "react";
import {
  Button,
  ConfigProvider,
  Flex,
  Input,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import "../globals.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const AntDesignWalletConnectButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-ant-design")).WalletConnectButton,
    { ssr: false }
  );
  const AntDesignWalletDisconnectButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-ant-design"))
        .WalletDisconnectButton,
    { ssr: false }
  );
  const AntDesignWalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-ant-design")).WalletMultiButton,
    { ssr: false }
  );
  const AntDesignWalletModalButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-ant-design")).WalletModalButton,
    { ssr: false }
  );

  return (
    <ConfigProvider>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          className="layout"
          style={{ minHeight: "100vh", marginLeft: 200 }}
        >
          <Header
            style={{ paddingInline: "2rem", background: colorBgContainer }}
          >
            <Flex justify="space-between" align="center">
              <div></div>
              <Input
                size="large"
                placeholder="large size"
                style={{
                  width: "40%",
                  textAlign: "center",
                }}
                prefix={<SearchOutlined />}
              />
              <div>
                <WalletMultiButton style={{ backgroundColor: "black" }} />
              </div>
            </Flex>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
