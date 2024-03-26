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
    if (window.innerWidth <= 1024) {
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
          <Layout style={{ maxHeight: "100vh" }} hasSider>
            <Sider
              collapsed={collapsed}
              width={250}
              style={{
                overflow: "hidden",
                maxHeight: "100vh",
                borderRight: "1px solid rgba(0, 0, 0, 0.1)",
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
                  width: "100%",
                }}
              >
                <Navbar />
              </Header>
              <Content
                style={{
                  margin: "24px 16px 0",
                  overflow: "auto",
                  padding: "2rem 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div>{children}</div>
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
