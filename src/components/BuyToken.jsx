import { useState } from "react";
import { ethers } from "ethers";
import { useContract } from "../hooks/useContract";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import { useNotification } from "./Notification";

const BuyToken = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const presaleContract = useContract(PRESALE_CONTRACT_ADDRESS, "presale");
  const usdtContract = useContract(USDT_TOKEN_ADDRESS, "usdt");
  const { notifySuccess, notifyError } = useNotification();

  const handleBuy = async () => {
    if (!account) {
      notifyError("Wallet not connected");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      notifyError("Enter a valid GLF amount");
      return;
    }

    try {
      setLoading(true);
      const usdtAmount = ethers.parseUnits((amount * 0.05).toString(), 6); // 1 GLF = 0.05 USDT

      // Step 1: Approve USDT
      const approveTx = await usdtContract.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
      await approveTx.wait();

      // Step 2: Buy GLF tokens
      const buyTx = await presaleContract.buyTokens(ethers.parseUnits(amount, 18));
      await buyTx.wait();

      notifySuccess("Purchase successful!");
      setAmount("");
    } catch (error) {
      console.error(error);
      notifyError("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Buy GLF Tokens</h2>
      <input
        type="number"
        placeholder="Enter GLF amount"
        className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleBuy}
        disabled={loading}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition"
      >
        {loading ? "Processing..." : "Buy"}
      </button>
    </div>
  );
};

export default BuyToken;