"use client";
import PromptComponent from "../components/PromptComponent";

const Tokenomics = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={" Tokenomics Strategy"}
        input1Label={"Funding Goals"}
        input2Label={"Allocation Percentages (e.g., team, marketing, reserves)"}
        input3Label={"Reward Mechanisms"}
        description={
          "Design the economic backbone of your token. Provide details on utility, distribution, and incentives to help us formulate a robust tokenomics model that ensures long-term value and sustainability."
        }
      />
    </div>
  );
};

export default Tokenomics;
