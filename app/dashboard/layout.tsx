"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { ReactNode, createElement, useState } from "react";
import {
  ConfigProvider,
  Flex,
  Input,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import {
  SearchOutlined,
  DollarOutlined,
  SendOutlined,
  BoxPlotOutlined,
  FireOutlined,
} from "@ant-design/icons";
import "../globals.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProvider } from "@/src/provider/AppProvider";
import LoadingOverlay from "./components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const items: MenuProps["items"] = [
  DollarOutlined,
  SendOutlined,
  BoxPlotOutlined,
  FireOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

const links = [
  {
    icon: createElement(DollarOutlined),
    label: "Token Manager",
  },
  {
    icon: createElement(SendOutlined),
    label: "Multisender",
  },
  {
    icon: createElement(BoxPlotOutlined),
    label: "Liquidity Manager",
  },
  {
    icon: createElement(FireOutlined),
    label: "Burn",
  },
];

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AppProvider>
      <ConfigProvider>
        <ThirdwebProvider clientId="9cb2c5a9e53215302c5c7638f3b0cb1c">
          <LoadingOverlay />
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
              {/* <div className="demo-logo-vertical" /> */}
              <div className="text-white py-5 px-8">Powered By SolanaForge</div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={links as any}
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
        </ThirdwebProvider>
      </ConfigProvider>
      <ToastContainer />
    </AppProvider>
  );
};

export default MainLayout;
