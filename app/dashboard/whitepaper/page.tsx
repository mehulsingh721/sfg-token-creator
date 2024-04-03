"use client";
import PromptComponent from "../components/PromptComponent";

const Whitepaper = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={"Whitepaper Drafting"}
        input1Label={"Project Summary"}
        input2Label={"Technical Specifications (if any)"}
        input3Label={"Roadmap Milestones"}
        description={
          "Build trust and credibility with a comprehensive whitepaper. Outline your project's vision, mission, technical details, and competitive edge, and we'll craft a document that clearly communicates your value proposition to investors."
        }
      />
    </div>
  );
};

export default Whitepaper;
