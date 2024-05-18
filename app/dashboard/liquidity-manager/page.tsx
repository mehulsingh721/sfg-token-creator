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
      <div className="flex gap-10 flex-wrap items-center justify-center w-full flex">
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
      <div className="px-10 py-10">
        <h1 className="font-bold text-lg">How to interact with Create Pool.</h1>
        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Create Market ID</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>2. Input “Base Token” (SPL Token).</p>
            <p>3. Input “Quote Coin/Token (SOL/USDC).</p>
            <p>4. Input “Min Order Size” - Minimum Buy.</p>
            <p>5. Input “Tick Size” - Minimum Price Change.</p>
          </div>

          <div>
            <h2 className="font-semibold mt-2">Advance Openbook</h2>
            <p>
              1. Select the suitable amount you want to pay from the select
              menu.
            </p>
          </div>

          {/* <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - Free</p>
            <p>Non-$SFG Holders - .01 SOL</p>
          </div> */}
        </div>

        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Create Liquidity Pool</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>2. Input “Base Token” (SPL Token)</p>
            <p>3. Input “Quote Coin/Token (SOL/USDC).</p>
            <p>4. Input “Openbook Market ID”.</p>
            <p>5. Activate “Set Launch Date” (Optional).</p>
          </div>
          <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - 0.55 SOL</p>
            <p>Non-$SFG Holders - 0.55 SOL</p>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Revoke Liquidity</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>2. Click on “Revoke Liquidity”</p>
            <p>3. Provide “AMM ID” and click remove liquidity.</p>
          </div>
          <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - 0.05 SOL</p>
            <p>Non-$SFG Holders - 0.1 SOL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiquidityManager;
