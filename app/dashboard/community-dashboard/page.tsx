"use client";
import PromptComponent from "../components/PromptComponent";

const CommunityManager = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center">
      <PromptComponent
        heading={"Community Dashboard"}
        input1Label={"Platforms to Integrate (e.g., Twitter, Telegram)"}
        input2Label={"Community Engagement Goals"}
        input3Label={"Frequency of Updates"}
        description={
          "Engage and manage your community with ease. Specify your moderation level, policies, and engagement initiatives, and we'll provide a dashboard that simplifies community interaction and fosters a vibrant, supportive ecosystem."
        }
      />
    </div>
  );
};

export default CommunityManager;
