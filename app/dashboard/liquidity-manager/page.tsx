"use client";
import {
  ClearOutlined,
  ContainerOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ActionCard from "../components/ActionCard";
import CreatePoolModal from "./components/CreatePoolModal";
import { useState } from "react";
import RemoveLiquidityModal from "./components/RemoveLiquidityModal";

const LiquidityManager = () => {
  const [createPoolFormOpen, setCreatePoolFormOpen] = useState(false);
  const [removeLiquidityFormOpen, setRemoveLiquidityFormOpen] = useState(false);

  return (
    <>
      <div className="flex gap-10 flex-wrap items-center justify-center w-full flex h-full">
        <div>
          <ActionCard
            icon={
              <ContainerOutlined className="sm:text-[38px] 2xl:text-[48px]" />
            }
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
            icon={<ClearOutlined className="sm:text-[38px] 2xl:text-[48px]" />}
            title={"Revoke Liquidity"}
            action={() => setRemoveLiquidityFormOpen(true)}
          />
          <RemoveLiquidityModal
            open={removeLiquidityFormOpen}
            setOpen={setRemoveLiquidityFormOpen}
          />
        </div>
      </div>
    </>
  );
};

export default LiquidityManager;
