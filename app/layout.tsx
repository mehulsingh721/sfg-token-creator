import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import WalletConnectionProvider from "@/src/provider/WalletConnectionProvider";
import { AutoConnectProvider } from "@/src/provider/AutoConnectProvider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Manager | Solanaforge",
  description: "Token Manager Powered by SolanaForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletConnectionProvider>
          <AutoConnectProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </AutoConnectProvider>
        </WalletConnectionProvider>
      </body>
      <GoogleAnalytics gaId="G-ZRLX3BC45B" />
    </html>
  );
}
