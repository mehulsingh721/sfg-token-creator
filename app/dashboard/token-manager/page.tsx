"use client";
import {
  PlusCircleOutlined,
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import ActionCard from "./components/ActionCard";
import CreateForm from "./components/CreateFormModal";
import { useState } from "react";
import RevokeMintAuthorityModal from "./components/RevokeMintAuthorityModal";
import RevokeFreezeAuthorityModal from "./components/RevokeFreezeAuthorityModal";
import LoadingOverlay from "../components/Loading/Loading";

const TokenManager = () => {
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [mintRevokeOpen, setMintRevokeOpen] = useState(false);
  const [freezeRevokeOpen, setFreezeRevokeOpen] = useState(false);

  return (
    <>
      <div className="flex gap-10">
        <div>
          <ActionCard
            icon={<PlusOutlined style={{ fontSize: "48px" }} />}
            title={"Create Token"}
            action={() => setCreateFormOpen(true)}
          />
          <CreateForm open={createFormOpen} setOpen={setCreateFormOpen} />
        </div>
        <div>
          <ActionCard
            icon={<PlusCircleOutlined style={{ fontSize: "48px" }} />}
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
            icon={<StopOutlined style={{ fontSize: "48px" }} />}
            title={"Revoke Freeze Authority"}
            action={() => setFreezeRevokeOpen(true)}
          />
          <RevokeFreezeAuthorityModal
            open={freezeRevokeOpen}
            setOpen={setFreezeRevokeOpen}
          />
        </div>
      </div>
    </>
  );
};

export default TokenManager;
