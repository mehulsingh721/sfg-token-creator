import React, { useState } from "react";

const HamburgerIcon = ({ open, setOpen }: any) => {
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <button
      onClick={toggle}
      className="flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
    >
      {/* Top bar */}
      <span
        className={`block w-6 h-0.5 bg-black absolute transition duration-300 ease-in-out ${
          !open ? "rotate-45" : ""
        } ${open ? "translate-y-1.5" : ""}`}
      ></span>
      {/* Middle bar */}
      <span
        className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ease-in-out ${
          !open ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      {/* Bottom bar */}
      <span
        className={`block w-6 h-0.5 bg-black absolute transition duration-300 ease-in-out ${
          !open ? "-rotate-45" : ""
        } ${open ? "-translate-y-1.5" : ""}`}
      ></span>
    </button>
  );
};

export default HamburgerIcon;
