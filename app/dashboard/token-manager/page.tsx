"use client";
import {
  PlusCircleOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import ActionCard from "../components/ActionCard";
import CreateForm from "./components/CreateFormModal";
import { useState } from "react";
import RevokeMintAuthorityModal from "./components/RevokeMintAuthorityModal";
import RevokeFreezeAuthorityModal from "./components/RevokeFreezeAuthorityModal";
import LoadingOverlay from "../components/Loading/Loading";

const TokenManager = () => {
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [mintRevokeOpen, setMintRevokeOpen] = useState(false);
  const [freezeRevokeOpen, setFreezeRevokeOpen] = useState(false);

  //
  return (
    <>
      <div className="flex gap-10 flex-wrap items-center justify-center w-full flex">
        <div>
          <ActionCard
            icon={<PlusOutlined className="sm:text-[38px] 2xl:text-[48px]" />}
            title={"Create Token"}
            action={() => setCreateFormOpen(true)}
          />
          <CreateForm open={createFormOpen} setOpen={setCreateFormOpen} />
        </div>
        <div>
          <ActionCard
            icon={
              <PlusCircleOutlined className="sm:text-[38px] 2xl:text-[48px]" />
            }
            title={"Revoke Mint Authority"}
            action={() => setMintRevokeOpen(true)}
          />
          <RevokeMintAuthorityModal
            open={mintRevokeOpen}
            setOpen={setMintRevokeOpen}
          />
        </div>
        <div>
          <ActionCard
            icon={<StopOutlined className="sm:text-[38px] 2xl:text-[48px]" />}
            title={"Revoke Freeze Authority"}
            action={() => setFreezeRevokeOpen(true)}
          />
          <RevokeFreezeAuthorityModal
            open={freezeRevokeOpen}
            setOpen={setFreezeRevokeOpen}
          />
        </div>
      </div>
      <div className="px-10 py-10">
        <h1 className="font-bold text-lg">
          SPL(Solana) Token Lab - Steps to interact with Token Manager.
        </h1>
        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Token Creation</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>2. Click on “Create Token” - New window will pop-up.</p>
            <p>3. Provide details and create token token in 30 seconds.</p>
          </div>
          <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - .2 SOL (Minimum $SFG holding - 200,000)</p>
            <p>Non-$SFG Holders - .35 SOL</p>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Remove Mint Authority</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>2. Click on “Revoke Mint Authority” - New window will pop-up</p>
            <p>3. Provide “Token Address” and click remove.</p>
          </div>
          <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - Free</p>
            <p>Non-$SFG Holders - .05 SOL</p>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <h2 className="font-semibold">Remove Freeze Authority</h2>
            <p>1. Connect your Solana wallet.</p>
            <p>
              2. Click on “Revoke Freeze Authority” - New window will pop-up
            </p>
            <p>3. Provide “Token Address” and click remove.</p>
          </div>
          <div>
            <h2 className="font-semibold mt-2">Pricing: </h2>
            <p>For $SFG Holders - Free</p>
            <p>Non-$SFG Holders - .05 SOL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenManager;
