import { ArrowUpDown, ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import tokenlist from "../token-list.json";

export default function Swap() {
  const [slippage, setSlippage] = useState(3);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenlist[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenlist[1]);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
  }

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 w-1/3 bg-gray-900 shadow-amber-50 shadow rounded-xl p-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold">Swap</p>
        <Settings
          className="text-gray-400 hover:rotate-90 duration-200"
          onClick={() => document.getElementById("slippage").showModal()}
        />
      </div>

      <div className="inputs flex flex-col justify-center items-center gap-y-2">
        <div className="flex justify-center items-center bg-base-100 py-2 w-full rounded-2xl pe-3">
          <input
            type="text"
            placeholder="0"
            value={tokenOneAmount}
            className="input input-xl w-full rounded-lg py-8 shadow-none outline-none border-none focus:outline-none focus:border-neutral-600 focus:shadow-none"
            onChange={changeAmount}
          />
          <button
            className="btn bg-gray-500 rounded-full"
            onClick={() => document.getElementById("tokenOne").showModal()}
          >
            <img
              src={tokenOne.img}
              alt="asset one icon"
              width={24}
              height={24}
            />
            {tokenOne.ticker}
            <ChevronDown />
          </button>
        </div>

        <button
          className="btn absolute z-10 bg-gray-500 rounded-xl p-2"
          onClick={switchTokens}
        >
          <ArrowUpDown
            className="hover:rotate-180 duration-300"
          />
        </button>
        
        <div className="flex justify-center items-center bg-base-200 py-2 w-full rounded-2xl pe-3">
          <input
            type="text"
            placeholder="0"
            value={tokenTwoAmount}
            className="input input-xl w-full rounded-lg py-8 shadow-none outline-none border-none focus:outline-none focus:border-neutral-600 focus:shadow-none"
            disabled
          />
          <button
            className="btn bg-gray-500 rounded-full"
            onClick={() => document.getElementById("tokenTwo").showModal()}
          >
            <img
              src={tokenTwo.img}
              alt="asset two icon"
              width={24}
              height={24}
            />
            {tokenTwo.ticker}
            <ChevronDown />
          </button>
        </div>
      </div>

      <dialog className="modal" id="slippage">
        <div className="modal-box w-1/4">
          <h3 className="font-bold text-lg">Settings</h3>
          <p className="mt-4 md-2">Slippage tolerance</p>
          <div className="w-full">
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              <span>0.5 %</span>
              <span>3 %</span>
              <span>5.5 %</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={5.5}
              defaultValue={3}
              step={2.5}
              className="range w-full"
              onChange={handleSlippageChange}
            />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog className="modal" id="tokenOne">
        <div className="modal-box w-1/4 rounded-xl py-0">
          <div className="header sticky top-0 pb-2 pt-4 bg-base-100">
            <h3 className="font-bold text-lg">Select a token</h3>

            <label className="input rounded-2xl outline-none border-none focus:outline-none focus:border-neutral-600 focus:shadow-none focus:border-none flex items-center gap-x-2 mt-4">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
          </div>

          <div className="">
            {tokenlist.map((token) => (
              <button
                key={token.ticker}
                className="flex items-center gap-x-2 w-full p-2 hover:bg-base-200 rounded-lg"
                onClick={() => {
                  setTokenOne(token);
                  document.getElementById("tokenOne").close();
                }}
              >
                <img src={token.img} alt={`${token.ticker} icon`} width={24} height={24} />
                <div className="text-start">
                  <p>{token.name}</p>
                  <p className="text-xs text-gray-500">{token.ticker}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog className="modal" id="tokenTwo">
        <div className="modal-box w-1/4 rounded-xl py-0">
          <div className="header sticky top-0 pb-2 pt-4 bg-base-100">
            <h3 className="font-bold text-lg">Select a token</h3>

            <label className="input rounded-2xl outline-none border-none focus:outline-none focus:border-neutral-600 focus:shadow-none focus:border-none flex items-center gap-x-2 mt-4">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
          </div>

          <div className="">
            {tokenlist.map((token) => (
              <button
                key={token.ticker}
                className="flex items-center gap-x-2 w-full p-2 hover:bg-base-200 rounded-lg"
                onClick={() => {
                  setTokenTwo(token);
                  document.getElementById("tokenTwo").close();
                }}
              >
                <img src={token.img} alt={`${token.ticker} icon`} width={24} height={24} />
                <div className="text-start">
                  <p>{token.name}</p>
                  <p className="text-xs text-gray-500">{token.ticker}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
