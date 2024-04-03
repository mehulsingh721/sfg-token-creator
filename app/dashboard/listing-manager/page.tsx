"use client";
import PromptComponent from "../components/PromptComponent";

const ListingManager = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={"Listing Assistance"}
        input1Label={"Token Specifications (e.g., symbol, blockchain)"}
        input2Label={"Legal Documentation (if required by listing platforms)"}
        input3Label={"Previous Listings (if any)"}
        description={
          "Maximize your token's visibility with strategic listings. Provide your preferences for platforms, compliance documents, and launch goals, and we'll assist in getting your token listed on leading exchanges and platforms."
        }
      />
    </div>
  );
};

export default ListingManager;
