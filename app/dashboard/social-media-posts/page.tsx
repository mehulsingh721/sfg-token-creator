"use client";
import PromptComponent from "../components/PromptComponent";

const SocialMediaPosts = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center">
      <PromptComponent
        heading={" Social Media Posts"}
        input1Label={"Event or Promotion Details"}
        input2Label={"Hashtags or Keywords"}
        input3Label={"Desired Call to Action"}
        description={
          "Keep your community updated and engaged with regular social media posts. Share your posting schedule, content requirements, and any special events to help us create dynamic posts that promote interaction and interest in your project."
        }
      />
    </div>
  );
};

export default SocialMediaPosts;
