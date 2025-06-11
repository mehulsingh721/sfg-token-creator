require("@solana/wallet-adapter-react-ui/styles.css");
import { Breadcrumb, Flex } from "antd";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import ButtonCustom from "@/src/components/ui/Button";

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
    } else if (pathname === "/dashboard/idea-generation") {
      setPagename("Idea Generation");
    } else if (pathname === "/dashboard/branding-design") {
      setPagename("Branding Design");
    } else if (pathname === "/dashboard/tokenomics") {
      setPagename("Tokenomics");
    } else if (pathname === "/dashboard/whitepaper") {
      setPagename("Whitepaper");
    } else if (pathname === "/dashboard/website") {
      setPagename("Website");
    } else if (pathname === "/dashboard/marketing-content") {
      setPagename("Marketing Content");
    } else if (pathname === "/dashboard/social-media-manager") {
      setPagename("Social Media Manager");
    } else if (pathname === "/dashboard/social-media-posts") {
      setPagename("Social Media Posts");
    } else if (pathname === "/dashboard/community-dashboard") {
      setPagename("Community Dashboard");
    } else if (pathname === "/dashboard/listing-manager") {
      setPagename("Listing Manager");
    } else if (pathname === "/dashboard/analytics-optimization") {
      setPagename("Analytics Optimization");
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

      <div className="flex items-center gap-5">
        {/* <div className="">
          <ButtonCustom htmlType={""}>
            <a
              href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=9J6akKgzRDWBKyeaDDkbREEUTYVSVVHY8L6qjW7AQkB4&fixed=in"
              target="_blank"
            >
              Buy $SFG
            </a>
          </ButtonCustom>
        </div> */}
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
