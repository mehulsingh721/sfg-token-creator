"use client";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ActionCard from "../components/ActionCard";
import CreatePoolModal from "./components/CreatePoolModal";
import { useState } from "react";

const LiquidityManager = () => {
  const [createPoolFormOpen, setCreatePoolFormOpen] = useState(false);

  return (
    <>
      <div className="flex gap-10 flex-wrap items-center justify-center w-full flex h-full">
        <div>
          <ActionCard
            icon={<PlusOutlined className="sm:text-[38px] 2xl:text-[48px]" />}
            title={"Create Pool"}
            action={() => setCreatePoolFormOpen(true)}
          />
          <CreatePoolModal
            open={createPoolFormOpen}
            setOpen={setCreatePoolFormOpen}
          />
        </div>
        <div>
          <ActionCard
            icon={
              <PlusCircleOutlined className="sm:text-[38px] 2xl:text-[48px]" />
            }
            title={"Revoke Liquidity"}
            action={null}
          />
          {/* <RevokeMintAuthorityModal
            open={mintRevokeOpen}
            setOpen={setMintRevokeOpen}
          /> */}
        </div>
      </div>
    </>
  );
};

export default LiquidityManager;
