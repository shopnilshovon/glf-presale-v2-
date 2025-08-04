import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function BuyToken({ account, setNotification }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [glfBalance, setGlfBalance] = useState("0");

  const GLF_PRICE = 0.10; // 1 GLF = 0.10 USDT

  const fetchBalances = async () => {
    if (!account || !window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdt = new ethers.Contract(
      USDT_TOKEN_ADDRESS,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );
    const glf = new ethers.Contract(
      PRESALE_CONTRACT_ADDRESS,
      [
        "function token() view returns (address)",
        "function getAvailableTokens() public view returns (uint256)"
      ],
      provider
    );

    const usdtBal = await usdt.balanceOf(account);
    setUsdtBalance(ethers.utils.formatUnits(usdtBal, 6));

    const glfTokenAddress = await glf.token();
    const glfToken = new ethers.Contract(
      glfTokenAddress,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );

    const glfBal = await glfToken.balanceOf(account);
    setGlfBalance(ethers.utils.formatUnits(glfBal, 18));
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
        <h2 className="text-xl font-bold mb-4 text-center text-blue-300">🚀 Buy GLF Tokens</h2>

        <div className="mb-3 text-sm">
          <p className="text-gray-400">🎯 USDT Balance:</p>
          <p className="font-semibold text-green-400">{usdtBalance} USDT</p>
        </div>

        <div className="mb-3 text-sm">
          <p className="text-gray-400">💰 Your GLF Balance:</p>
          <p className="font-semibold text-yellow-400">{glfBalance} GLF</p>
        </div>

        <div className="mb-3 text-sm text-cyan-300">
          <p>🧾 Rate: <span className="font-semibold text-white">1 GLF = {GLF_PRICE} USDT</span></p>
        </div>

        <input
          type="number"
          min="0"
          placeholder="Enter USDT amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white mb-3"
        />

        <div className="mb-3 text-sm text-gray-300">
          Estimated: <span className="text-yellow-400 font-semibold">{estimateTokens()} GLF</span>
        </div>

        {loading && (
          <div className="mb-2 text-sm text-blue-400 flex items-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
            {status === "approve" && "Approving USDT..."}
            {status === "confirming" && "Confirming purchase..."}
          </div>
        )}

        <button
          onClick={buy}
          disabled={loading || !amount}
          className={`w-full py-2 rounded-lg transition-all duration-300 font-semibold ${
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