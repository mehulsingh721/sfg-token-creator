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
import { INSTRUCTION_TEXT_COLOR } from "@/app/constants/app";

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
        <h1 className="text-2xl">How to interact with Create Pool.</h1>
        <div className="mt-3">
          <div>
            <h2 className="text-lg">Create Market ID</h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Connect your Solana wallet.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              2. Input “Base Token” (SPL Token).
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              3. Input “Quote Coin/Token (SOL/USDC).
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              4. Input “Min Order Size” - Minimum Buy.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              5. Input “Tick Size” - Minimum Price Change.
            </p>
          </div>

          <div>
            <h2 className="mt-2 text-lg">Advance Openbook</h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Select the suitable amount you want to pay from the select
              menu.
            </p>
          </div>

          <div>
            <h2 className="text-lg mt-2">Pricing: </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              For $SFG Holders - 0.3 SOL
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              Non-$SFG Holders - 0.4 SOL
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <h2 className="text-lg">Create Liquidity Pool</h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Connect your Solana wallet.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              2. Input “Base Token” (SPL Token)
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              3. Input “Quote Coin/Token (SOL/USDC).
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              4. Input “Openbook Market ID”.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              5. Activate “Set Launch Date” (Optional).
            </p>
          </div>
          <div>
            <h2 className="text-lg mt-2">Pricing: </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              For $SFG Holders - 0.55 SOL
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              Non-$SFG Holders - 0.55 SOL
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <h2 className="text-lg">Revoke Liquidity</h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              1. Connect your Solana wallet.
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              2. Click on “Revoke Liquidity”
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              3. Provide “AMM ID” and click remove liquidity.
            </p>
          </div>
          <div>
            <h2 className="text-lg mt-2">Pricing: </h2>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              For $SFG Holders - 0.05 SOL
            </p>
            <p
              style={{
                color: INSTRUCTION_TEXT_COLOR,
              }}
            >
              Non-$SFG Holders - 0.1 SOL
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiquidityManager;
