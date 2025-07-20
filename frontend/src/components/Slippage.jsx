import { Settings } from "lucide-react";

export default function Slippage({ handleSlippageChange }) {
  return (
    <div className="dropdown dropdown-end">
      <Settings
        tabIndex={0}
        role="button"
        className="text-gray-400 hover:rotate-90 duration-200"
      />
      <div
        tabIndex={0}
        className="dropdown-content menu z-1 p-2 shadow-base-300 shadow bg-base-100 rounded-box w-52"
      >
        <p className="font-bold text-md">Settings</p>
        <p className="mt-2">Slippage tolerance</p>
        <div className="w-full">
          <div className="flex justify-between px-2.5 mt-2 text-sm">
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
            className="range range-xs w-full"
            onChange={handleSlippageChange}
          />
        </div>
      </div>
    </div>
  );
}
