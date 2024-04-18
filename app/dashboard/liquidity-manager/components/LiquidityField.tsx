import { useState } from "react";

const LiquidityField = ({
  type,
  balance,
  tokenName,
  tokenLogo,
  tokenSymbol,
  setAmount,
}: any) => {
  const [inputValue, setInputValue] = useState(null);

  return (
    <div className="flex border border-black gap-2 w-max py-2 px-2 ">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-gray-600">
          <img src={tokenLogo} className="h-10 w-10" />
        </div>
        {tokenName ? (
          <h1>
            {tokenName} {`(${tokenSymbol})`}
          </h1>
        ) : (
          <h1 className="capitalize">{type}</h1>
        )}
      </div>

      <div className="flex">
        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputValue(balance);
              setAmount(balance);
            }}
            className="rounded-xl border border-black px-2"
          >
            Max
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputValue(((parseFloat(balance) * 50) / 100) as any);
              setAmount((parseFloat(balance) * 50) / 100);
            }}
            className="rounded-xl border border-black px-2"
          >
            Half
          </button>
        </div>
        <input
          className="text-right outline-none"
          defaultValue={inputValue as any}
          type="text"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </div>
  );
};
export default LiquidityField;
