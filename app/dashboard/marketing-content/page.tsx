"use client";
import PromptComponent from "../components/PromptComponent";

const MarketingContent = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={" Marketing Content Creation"}
        input1Label={"Campaign Goals"}
        input2Label={"Target Audience Characteristics"}
        input3Label={"Tone of Voice (e.g., professional, casual)"}
        description={
          "Capture your audience's attention with bespoke marketing content. Define your campaign's themes, formats, and target SEO keywords, and we'll produce compelling content that resonates with your audience and drives engagement."
        }
      />
    </div>
  );
};

export default MarketingContent;
