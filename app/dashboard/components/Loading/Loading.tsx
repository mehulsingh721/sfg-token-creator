import { Spin } from "antd";
import Lottie from "lottie-react";
import animation from "./loading.json";
import LoadingSpin from "react-loading-spin";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/src/provider/AppProvider";

const LoadingOverlay = () => {
  const { loader } = useContext(AppContext);
  if (loader.loading) {
    return (
      <>
        <div className="orbit-animation-container">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
          <div className="text" key={loader.text}>
            {loader.text}
          </div>
        </div>
      </>
    );
  }
};

export default LoadingOverlay;
