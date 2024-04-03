"use client";
import PromptComponent from "../components/PromptComponent";

const AnalyticsOptimization = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center flex-col">
      <h1 className="font-semibold text-base mb-5">
        Note: This page is just an overview and not functional at the moment, it
        is to show the future functionality
      </h1>
      <PromptComponent
        heading={"Analytics & Optimization"}
        input1Label={"Key Metrics to Track"}
        input2Label={"Current Website or Campaign Analytics (if available)"}
        input3Label={
          "Optimization Goals (e.g., increase traffic, conversion rate)"
        }
        description={
          "Track your project's performance and optimize for success. Share your benchmarks, improvement targets, and user insights to help us deliver analytics and feedback that guide your strategy and refine your approach for maximum impact."
        }
      />
    </div>
  );
};

export default AnalyticsOptimization;
