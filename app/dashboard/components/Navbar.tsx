require("@solana/wallet-adapter-react-ui/styles.css");
import { Breadcrumb, Flex } from "antd";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const Navbar = () => {
  const [pagename, setPagename] = useState("");
  const pathname = usePathname();

  useMemo(() => {
    if (pathname === "/dashboard/token-manager") {
      setPagename("Token Manager");
    } else if (pathname === "/dashboard/multisender") {
      setPagename("Multisender");
    } else if (pathname === "/dashboard/liquidity-manager") {
      setPagename("Liquidity Manager");
    } else if (pathname === "/dashboard/burn") {
      setPagename("Burn");
    }
  }, [pathname]);

  return (
    <Flex
      style={{ height: "max-content" }}
      justify="space-between"
      align="center"
    >
      <div>
        <Breadcrumb
          className="hidden md:block"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: pagename,
            },
          ]}
        />
      </div>

      <div className="flex items-center">
        {/* <Input
                      size={"middle"}
                      placeholder="Search..."
                      style={{
                        textAlign: "center",
                        margin: "0",
                        width: "40%",
                      }}
                      prefix={<SearchOutlined />}
                    /> */}
        <div>
          <WalletMultiButton
            style={{
              backgroundColor: "#14161E",
              padding: "1rem 1rem",
              fontSize: "14px",
              margin: 0,
              height: "2.2rem",
            }}
          />
        </div>
      </div>
    </Flex>
  );
};
export default Navbar;
