"use client";
import PromptComponent from "../components/PromptComponent";

const BrandingDesign = () => {
  return (
    <div className="flex p-4 w-full h-full justify-center items-center">
      <PromptComponent
        heading={"Branding & Design"}
        input1Label={"Preferred Style/Theme (e.g., modern, traditional)"}
        input2Label={"Color Scheme Preferences"}
        input3Label={"Brand Values or Keywords"}
        description={
          "Create a memorable identity for your token. Tell us about your brand's personality, preferred logos, and design inspirations, and we'll bring your vision to life with a captivating visual identity."
        }
      />
    </div>
  );
};

export default BrandingDesign;
