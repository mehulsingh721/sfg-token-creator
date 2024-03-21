"use client";
import { ReactNode, lazy } from "react";
import Header from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StyleProvider } from "@ant-design/cssinjs";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StyleProvider hashPriority="high">
      <ThirdwebProvider clientId="9cb2c5a9e53215302c5c7638f3b0cb1c">
        <main className="flex flex-col min-h-screen font-display">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="mx-auto md:w-10/12 p-2 md:p-8">{children}</div>
          </div>
        </main>
      </ThirdwebProvider>
    </StyleProvider>
  );
};

export default MainLayout;
