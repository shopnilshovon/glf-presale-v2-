import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function BuyToken({ account, setNotification }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("0");

  const GLF_PRICE = 0.10; // 1 GLF = 0.10 USDT

  const fetchBalances = async () => {
    if (!account || !window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdt = new ethers.Contract(
      USDT_TOKEN_ADDRESS,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );

    const usdtBal = await usdt.balanceOf(account);
    setUsdtBalance(ethers.utils.formatUnits(usdtBal, 6));
  };

  useEffect(() => {
    fetchBalances();
  }, [account]);

  const estimateTokens = () => {
    const usdtValue = parseFloat(amount || "0");
    if (usdtValue && GLF_PRICE) return (usdtValue / GLF_PRICE).toFixed(2);
    return "0.00";
  };

  const buy = async () => {
    if (!account) {
      setNotification({ type: "error", message: "Wallet not connected" });
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const usdt = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
          "function allowance(address owner, address spender) public view returns (uint256)"
        ],
        signer
      );

      const presale = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, signer);
      const usdtAmount = ethers.utils.parseUnits(amount, 6);

      const allowance = await usdt.allowance(account, PRESALE_CONTRACT_ADDRESS);

      if (allowance.lt(usdtAmount)) {
        setStatus("approve");
        const approveTx = await usdt.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
        await approveTx.wait();
      }

      setStatus("confirming");
      const buyTx = await presale.buyTokens(usdtAmount);
      await buyTx.wait();

      setNotification({ type: "success", message: "✅ Token purchase successful!" });
      setAmount("");
      await fetchBalances();
    } catch (error) {
      console.error("Purchase failed:", error);
      setNotification({
        type: "error",
        message: "❌ " + (error?.data?.message || error.message),
      });
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="w-full px-4 mt-6">
      <div className="bg-gray-800 rounded-2xl p-5 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-5 text-center text-blue-300">🚀 Buy GLF Tokens</h2>

        {/* USDT Balance */}
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-300 mb-1">🎯 USDT Balance:</p>
          <p className="text-2xl font-bold text-green-400">{usdtBalance} USDT</p>
        </div>

        {/* Token Rate */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-white">
            🔔 <span className="text-green-300">PRESALE PRICE</span>   🔔
          </p>
          <p className="text-xl text-yellow-400 font-bold">1 GLF = 0.10$ USDT</p>
        </div>

        {/* Input Field */}
        <input
          type="number"
          min="0"
          placeholder="Enter USDT amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white mb-4 text-lg"
        />

        {/* Estimated */}
        <div className="mb-4 text-base text-gray-300">
          Estimated: <span className="text-yellow-400 font-semibold">{estimateTokens()} GLF</span>
        </div>

        {/* Loading Status */}
        {loading && (
          <div className="mb-3 text-base text-blue-400 flex items-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
            {status === "approve" && "Approving USDT..."}
            {status === "confirming" && "Confirming purchase..."}
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={buy}
          disabled={loading || !amount}
          className={`w-full py-3 rounded-lg transition-all duration-300 font-semibold text-lg ${
            loading || !amount
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}