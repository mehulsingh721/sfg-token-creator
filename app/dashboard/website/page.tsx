"use client";
import PromptComponent from "../components/PromptComponent";

const Website = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={" Website Creation"}
        input1Label={"Desired Website Sections (e.g., About, Tokenomics)"}
        input2Label={"Previous Website Examples (for style reference)"}
        input3Label={"Functional Requirements (e.g., contact forms, blog)"}
        description={
          "Launch a professional website as the digital face of your token. Share your desired site structure, user experience goals, and any specific functionalities to help us develop an engaging and informative platform for your audience."
        }
      />
    </div>
  );
};

export default Website;
