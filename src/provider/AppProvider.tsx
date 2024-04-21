"use client";
import { useLocalStorage } from "@solana/wallet-adapter-react";
import type { FC, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>({} as any);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loader, setLoader] = useState({
    loading: false,
    text: "",
  });
  const [marketIdConfirmed, setMarketIdConfirmed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loader,
        setLoader,
        setMarketIdConfirmed,
        marketIdConfirmed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
