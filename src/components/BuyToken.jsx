import { useState } from "react";
import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { USDT_TOKEN_ADDRESS } from "../utils/constants";
import Notification from "./Notification";

export default function BuyToken({ account }) {
  const [usdtAmount, setUsdtAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const presaleContract = useContract();

  const handleBuy = async () => {
    if (!account) {
      setNotification({ type: "error", message: "Wallet not connected" });
      return;
    }

    if (!usdtAmount || isNaN(usdtAmount)) {
      setNotification({ type: "error", message: "Enter valid USDT amount" });
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdtContract = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        ["function approve(address spender, uint256 amount) public returns (bool)"],
        signer
      );

      const parsedAmount = ethers.parseUnits(usdtAmount, 6); // USDT has 6 decimals

      const approvalTx = await usdtContract.approve(presaleContract.target, parsedAmount);
      await approvalTx.wait();

      const buyTx = await presaleContract.buyTokens(parsedAmount);
      await buyTx.wait();

      setNotification({ type: "success", message: "Token purchased successfully!" });
      setUsdtAmount("");
    } catch (err) {
      console.error("Buy error:", err);
      setNotification({ type: "error", message: "Transaction failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg mt-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Buy GLF Tokens</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter USDT Amount"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white w-full md:w-1/2"
          value={usdtAmount}
          onChange={(e) => setUsdtAmount(e.target.value)}
        />

        <button
          onClick={handleBuy}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-50"
        >
          {loading ? "Processing..." : "Buy"}
        </button>
      </div>

      {notification && (
        <div className="mt-4">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}
    </div>
  );
}