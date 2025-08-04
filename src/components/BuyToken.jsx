import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS, GLF_TOKEN_ADDRESS } from "../utils/constants";
import { usePresaleContract } from "../hooks/useContract";

export default function BuyToken({ account }) {
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [glfBalance, setGlfBalance] = useState("0");
  const [buyAmount, setBuyAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [estimatedTokens, setEstimatedTokens] = useState("0");

  const presaleContract = usePresaleContract();

  // 🧠 Rate setup (GLF = 0.1 USDT)
  const rate = 0.1;

  // 🔄 Fetch wallet balances
  const fetchBalances = async () => {
    if (!account || !window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const usdt = new ethers.Contract(
      USDT_TOKEN_ADDRESS,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );
    const glf = new ethers.Contract(
      GLF_TOKEN_ADDRESS,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );

    const usdtBal = await usdt.balanceOf(account);
    const glfBal = await glf.balanceOf(account);

    setUsdtBalance(ethers.utils.formatUnits(usdtBal, 6));
    setGlfBalance(ethers.utils.formatUnits(glfBal, 18));
  };

  useEffect(() => {
    fetchBalances();
  }, [account]);

  // 🧮 Estimate GLF Tokens
  useEffect(() => {
    const parsed = parseFloat(buyAmount);
    if (!isNaN(parsed)) {
      const estimated = parsed / rate;
      setEstimatedTokens(estimated.toFixed(2));
    } else {
      setEstimatedTokens("0");
    }
  }, [buyAmount]);

  // 🛒 Buy GLF tokens
  const handleBuy = async () => {
    if (!account || !presaleContract) {
      toast.error("Wallet not connected");
      return;
    }

    const amount = parseFloat(buyAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const usdt = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        ["function approve(address spender, uint256 amount) public returns (bool)"],
        signer
      );

      const usdtAmount = ethers.utils.parseUnits(amount.toString(), 6);
      setIsApproving(true);
      const approveTx = await usdt.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
      toast("Approval pending...");
      await approveTx.wait();
      setIsApproving(false);

      setIsBuying(true);
      const buyTx = await presaleContract.buyTokens(usdtAmount);
      toast("Waiting for confirmation...");
      await buyTx.wait();
      setIsBuying(false);

      toast.success("✅ Purchase successful!");
      setBuyAmount("");
      fetchBalances();
    } catch (err) {
      console.error(err);
      setIsApproving(false);
      setIsBuying(false);
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-white">
      <h2 className="text-xl font-bold mb-4">🚀 Buy GLF Tokens</h2>

      <div className="space-y-2 text-sm mb-4">
        <p>🎯 <strong>USDT Balance:</strong> {parseFloat(usdtBalance).toFixed(6)} USDT</p>
        <p>💰 <strong>Your GLF Balance:</strong> {parseFloat(glfBalance).toFixed(2)} GLF</p>
        <p>🧾 <strong>Rate:</strong> 1 GLF = {rate} USDT</p>
        <p>📊 <strong>Estimated:</strong> {estimatedTokens} GLF</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          step="0.01"
          placeholder="Enter USDT amount"
          className="w-full p-2 bg-white/10 rounded-lg outline-none text-white placeholder:text-gray-400"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBuy}
          disabled={isApproving || isBuying}
        >
          {isApproving ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" /> Approving...
            </>
          ) : isBuying ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" /> Buying...
            </>
          ) : (
            <>Buy Now</>
          )}
        </button>
      </div>

      <button
        onClick={fetchBalances}
        className="text-xs text-blue-400 hover:underline mt-2"
      >
        🔄 Refresh Balances
      </button>
    </div>
  );
}