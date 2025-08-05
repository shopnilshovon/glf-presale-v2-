import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { presaleAddress, usdtAddress } from "../utils/constants";
import PresaleABI from "../abis/PresaleABI.json";
import usdtABI from "../abis/usdtABI.json";
import Notification from "./Notification";

const BuyToken = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (account) fetchUSDTBalance();
  }, [account]);

  const fetchUSDTBalance = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const usdtContract = new ethers.Contract(usdtAddress, usdtABI, signer);
      const balance = await usdtContract.balanceOf(account);
      setUsdtBalance(ethers.formatUnits(balance, 6));
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
    }
  };

  const estimateTokens = () => {
    if (!amount || isNaN(amount)) return "0";
    return (parseFloat(amount) / 0.1).toFixed(2);
  };

  const setMaxAmount = () => {
    setAmount(usdtBalance);
  };

  const showSuccess = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const buy = async () => {
    if (!account) return alert("Wallet not connected");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0)
      return alert("Enter a valid amount");

    try {
      setLoading(true);
      setStatus("approve");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const usdt = new ethers.Contract(usdtAddress, usdtABI, signer);
      const presale = new ethers.Contract(presaleAddress, PresaleABI, signer);

      const usdtAmount = ethers.parseUnits(amount, 6);
      const approveTx = await usdt.approve(presaleAddress, usdtAmount);
      await approveTx.wait();

      setStatus("confirming");
      const buyTx = await presale.buyTokens(usdtAmount);
      await buyTx.wait();

      fetchUSDTBalance();
      showSuccess("🎉 Purchase successful!");
      setAmount("");
    } catch (err) {
      console.error("Transaction Error:", err);
      alert("Transaction failed.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-0 mt-6">
      <div className="bg-[#1c1e2b] border border-green-600/20 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-blue-300">🚀 Buy GLF Tokens</h2>

        {/* USDT Balance */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-300">🎯 USDT Balance:</p>
          <p className="text-lg sm:text-xl font-bold text-green-400">{usdtBalance} USDT</p>
        </div>

        {/* Presale Rate */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-white font-semibold">
            🔔 <span className="text-green-300">PRESALE PRICE</span>
          </p>
          <p className="text-lg sm:text-xl font-bold text-yellow-400">1 GLF = 0.10 USDT</p>
        </div>

        {/* Input + MAX */}
        <div className="mb-5 relative">
          <input
            type="number"
            min="0"
            placeholder="Enter USDT amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 pr-24 rounded-lg bg-gray-800 text-white text-base sm:text-lg placeholder-gray-400"
          />
          <button
            onClick={setMaxAmount}
            type="button"
            className="absolute right-2 top-2 bottom-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs sm:text-sm font-medium"
          >
            MAX
          </button>
        </div>

        {/* Estimated Tokens */}
        <div className="mb-5 text-sm sm:text-base text-gray-300">
          Estimated: <span className="text-yellow-400 font-semibold">{estimateTokens()} GLF</span>
        </div>

        {/* Loading Status */}
        {loading && (
          <div className="mb-4 text-sm text-blue-400 flex items-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
            {status === "approve" && "Approving USDT..."}
            {status === "confirming" && "Confirming purchase..."}
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={buy}
          disabled={loading || !amount}
          className={`w-full py-3 rounded-lg transition-all duration-300 font-semibold text-base sm:text-lg ${
            loading || !amount
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>

      {/* Notification */}
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
};

export default BuyToken;