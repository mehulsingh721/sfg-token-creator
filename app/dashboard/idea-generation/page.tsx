"use client";
import PromptComponent from "../components/PromptComponent";

const IdeaGeneration = () => {
  return (
    <div className="flex px-4 w-full h-full justify-center items-center flex flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={"Token Idea Generation"}
        input1Label={"Target Market/Industry"}
        input2Label={"Desired Impact Or Problem To Solve"}
        input3Label={"Any Inspirational Concepts"}
        description={
          "Kickstart your blockchain project with a compelling token concept. Share your industry focus, challenges you aim to address, and any inspiration to help us craft a unique and viable token idea that stands out in the market."
        }
      />
    </div>
  );
};

export default IdeaGeneration;
