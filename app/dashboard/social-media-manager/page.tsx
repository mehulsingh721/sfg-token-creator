"use client";
import PromptComponent from "../components/PromptComponent";

const SocialMediaManager = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={"Marketing & Social Strategy"}
        input1Label={"Preferred Social Media Platforms"}
        input2Label={"Previous Campaign Data (if available)"}
        input3Label={"Key Performance Indicators (KPIs)"}
        description={
          "Amplify your project's reach with a strategic marketing plan. Detail your target demographics, preferred channels, and budget to help us devise and execute an effective marketing and social media strategy that boosts visibility and community engagement."
        }
      />
    </div>
  );
};

export default SocialMediaManager;
