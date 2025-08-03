import { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import presaleAbi from "../abis/PresaleABI.json";
import usdtAbi from "../abis/USDTABI.json";
import { PRESALE_CONTRACT_ADDRESS, USDT_TOKEN_ADDRESS } from "../utils/constants";
import Notification from "./Notification";

const BuyToken = ({ account }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!window.ethereum) {
      setMessage("MetaMask not detected");
      return;
    }

    if (!account) {
      setMessage("Wallet not connected");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const usdt = new Contract(USDT_TOKEN_ADDRESS, usdtAbi, signer);
      const presale = new Contract(PRESALE_CONTRACT_ADDRESS, presaleAbi, signer);

      const usdtAmount = parseUnits(amount, 6); // USDT has 6 decimals

      const allowance = await usdt.allowance(account, PRESALE_CONTRACT_ADDRESS);
      if (allowance < usdtAmount) {
        const approveTx = await usdt.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
        await approveTx.wait();
      }

      const buyTx = await presale.buyTokens(usdtAmount);
      await buyTx.wait();

      setMessage("✅ GLF tokens purchased successfully!");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md text-white">
      <h2 className="text-xl font-semibold mb-4">Buy GLF Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in USDT"
        className="w-full p-2 rounded mb-4 bg-zinc-800 border border-zinc-700 text-white"
      />
      <button
        onClick={handleBuy}
        disabled={loading || !amount}
        className="bg-green-500 hover:bg-green-600 w-full py-2 rounded text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Processing..." : "Buy"}
      </button>

      {message && <Notification message={message} />}
    </div>
  );
};

export default BuyToken;