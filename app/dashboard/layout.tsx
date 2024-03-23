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
import { AppTheme } from "../constants/theme";

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
  return (
    <AppProvider>
      <ConfigProvider theme={AppTheme}>
        <ThirdwebProvider clientId="9cb2c5a9e53215302c5c7638f3b0cb1c">
          <LoadingOverlay />
          <Layout hasSider>
            <Sider
              width={250}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="">
                  <div className="py-5 px-8">Powered By SolanaForge</div>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={links as any}
                    style={{}}
                  />
                </div>
                <div>Footer</div>
              </div>
            </Sider>
            <Layout
              className="layout"
              style={{ minHeight: "100vh", marginLeft: 250 }}
            >
              <Header
                style={{
                  paddingInline: "2rem",
                  // background: colorBgContainer,
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <Flex
                  style={{ height: "max-content" }}
                  justify="space-between"
                  align="center"
                >
                  <div></div>
                  <Input
                    size={"middle"}
                    placeholder="large size"
                    style={{
                      textAlign: "center",
                      margin: "0",
                      width: "40%",
                    }}
                    prefix={<SearchOutlined />}
                  />
                  <div>
                    <WalletMultiButton
                      style={{
                        backgroundColor: "black",
                        padding: "10px 1rem",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    />
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
