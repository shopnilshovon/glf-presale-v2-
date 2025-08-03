import { useState } from "react";
import { Contract, parseUnits } from "ethers";
import presaleAbi from "../abis/PresaleABI.json";
import erc20Abi from "../abis/ERC20.json"; // USDT is ERC20 standard
import { PRESALE_CONTRACT_ADDRESS, USDT_TOKEN_ADDRESS } from "../utils/constants";

const BuyToken = ({ account, provider }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!amount || isNaN(amount)) {
      setMessage("❌ Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const signer = await provider.getSigner();
      const usdt = new Contract(USDT_TOKEN_ADDRESS, erc20Abi, signer);
      const presale = new Contract(PRESALE_CONTRACT_ADDRESS, presaleAbi, signer);

      const usdtAmount = parseUnits(amount, 6); // USDT has 6 decimals

      // Step 1: Approve USDT to Presale Contract
      const approveTx = await usdt.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
      await approveTx.wait();

      // Step 2: Buy Tokens
      const buyTx = await presale.buyTokens(usdtAmount);
      await buyTx.wait();

      setMessage("✅ Purchase successful!");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow-lg mt-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Buy GLF Tokens</h2>
      <input
        type="number"
        placeholder="Enter USDT amount"
        className="w-full p-2 rounded bg-zinc-700 text-white mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white w-full"
      >
        {loading ? "Processing..." : "Buy Tokens"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default BuyToken;