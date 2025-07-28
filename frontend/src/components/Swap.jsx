import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import tokenlist from "../token-list.json";
import axios from "axios";
import Slippage from "./Slippage";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

export default function Swap() {
  const { address, isConnected } = useAccount()
  const [slippage, setSlippage] = useState(3);
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  const [tokenOne, setTokenOne] = useState(tokenlist[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenlist[1]);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: "",
    data: "0x",
    value: "0",
  });

  // ToDo: Buat message alert pada saat swap pending, berhasil atau gagal

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    }
  })

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
  })

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    console.log(prices)
    setPrices(null);
    const twoAmount = tokenTwoAmount;
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOneAmount(twoAmount);
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
    setTokenTwoAmount((twoAmount * prices.ratio).toFixed(2));
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenlist[i]);
      fetchPrices(tokenlist[i].address, tokenTwo.address);
      document.getElementById("set-token").close();
    } else {
      setTokenTwo(tokenlist[i]);
      fetchPrices(tokenOne.address, tokenlist[i].address);
      document.getElementById("set-token").close();
    }
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}token-price`, {
      params: {
        addressOne: one,
        addressTwo: two,
      },
    });
    setPrices(res.data);
  }

  async function fetchDexSwap() {
    const allowance = await axios.get(`${import.meta.env.VITE_BACKEND_URL}allowance`, {
      params: {
        tokenAddress: tokenOne.address,
        walletAddress: address,
      },
    })

    if (allowance.data.allowance === "0") {
      const approveTx = await axios.get(`${import.meta.env.VITE_BACKEND_URL}approve-transaction`,{
        params: {
          tokenAddress: tokenOne.address,
        },
      });

      setTxDetails(approveTx.data);
      console.log('not approved')
      return
    }

    const tx = await axios.get(`${import.meta.env.VITE_BACKEND_URL}dex-swap`, {
      params: {
        tokenOneAddress: tokenOne.address,
        tokenTwoAddress: tokenTwo.address,
        amount: tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, "0"),
        slippage,
        from: address,
        origin: address,
      },
    });

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount(Number(tx.data.toTokenAmount) / decimals).toFixed(2);
    setTxDetails(tx.data.tx);
  }

  useEffect(() => {
    fetchPrices(tokenlist[0].address, tokenlist[1].address);
  }, [tokenOne, tokenTwo]);

  useEffect(() => {
    if(txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails, isConnected, sendTransaction]);

  return (
    <div className="flex flex-col justify-center items-center w-1/3 bg-gray-900 shadow-amber-50 shadow rounded-xl p-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold">Swap</p>
        <Slippage handleSlippageChange={handleSlippageChange} />
      </div>

      <div className="inputs flex flex-col justify-center items-center gap-y-2 mt-6 mb-2">
        <div className={`flex justify-center items-center ${!prices ? "bg-base-200" : "bg-base-100"} py-2 w-full rounded-2xl pe-3`}>
          <input
            type="text"
            placeholder="0"
            value={tokenOneAmount}
            className="input input-xl w-full rounded-lg py-8 shadow-none outline-none border-none focus:outline-none focus:border-neutral-600 focus:shadow-none"
            onChange={changeAmount}
            disabled={!prices}
          />
          <button
            className="btn bg-gray-500 rounded-full"
            onClick={() => {
              setChangeToken(1);
              document.getElementById("set-token").showModal()
            }}
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
          className="btn absolute z-10 bg-primary rounded-xl p-2"
          onClick={switchTokens}
        >
          <ArrowUpDown className="hover:rotate-180 duration-300" />
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
            onClick={() => {
              setChangeToken(2);
              document.getElementById("set-token").showModal()
            }}
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
      <button
        className="btn btn-primary w-full rounded-2xl text-lg font-semibold"
        disabled={!tokenOneAmount || !isConnected}
        onClick={fetchDexSwap}
      >
        Swap
      </button>

      <dialog className="modal" id="set-token">
        <div className="modal-box w-1/4 rounded-xl py-0 h-11/12">
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
            {tokenlist.map((token, i) => (
              <button
                key={token.ticker}
                className="flex items-center gap-x-2 w-full p-2 hover:bg-base-200 rounded-lg"
                onClick={() => modifyToken(i)}
              >
                <img
                  src={token.img}
                  alt={`${token.ticker} icon`}
                  width={24}
                  height={24}
                />
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
