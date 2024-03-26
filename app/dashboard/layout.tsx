"use client";
require("@solana/wallet-adapter-react-ui/styles.css");
import { ReactNode, useEffect, useState } from "react";
import { Breadcrumb, ConfigProvider, Flex, Layout } from "antd";
import "../globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProvider } from "@/src/provider/AppProvider";
import LoadingOverlay from "./components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppTheme } from "../constants/theme";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
      // 768px is a common breakpoint for iPad and mobile devices
      setCollapsed(true);
      setHamburgerOpen(true);
    } else {
      setCollapsed(false);
      setHamburgerOpen(false);
    }
  };

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    checkScreenSize(); // Check initially on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <AppProvider>
      <ConfigProvider theme={AppTheme}>
        <ThirdwebProvider clientId="9cb2c5a9e53215302c5c7638f3b0cb1c">
          <LoadingOverlay />
          <Layout hasSider>
            <Sider
              collapsed={collapsed}
              trigger={null}
              collapsible
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
              <Sidebar
                hamburger={hamburgerOpen}
                setHamburger={setHamburgerOpen}
                open={collapsed}
                setOpen={setCollapsed}
              />
            </Sider>
            <Layout className="layout" style={{ minHeight: "100vh" }}>
              <Header
                style={{
                  paddingInline: "2rem",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <Navbar />
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
              <Footer
                style={{
                  textAlign: "center",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#14161E",
                }}
              >
                <p className="">
                  SolanaForge Token Creator ©{new Date().getFullYear()} Created
                  by S-Forge Labs
                </p>
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
