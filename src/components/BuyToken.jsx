import { useState } from "react";
import { ethers } from "ethers";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import PresaleABI from "../abis/PresaleABI.json";

export default function BuyToken({ account, setNotification }) {
  const [glfAmount, setGlfAmount] = useState("");

  const buy = async () => {
    if (!account) {
      setNotification({ type: "error", message: "Wallet not connected" });
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // USDT Contract to approve spending
      const usdtContract = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)",
        ],
        signer
      );

      // Presale Contract instance
      const presaleContract = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        PresaleABI,
        signer
      );

      // GLF amount entered by user (assumed as decimal GLF tokens)
      // Convert to wei (18 decimals)
      const glfAmountWei = ethers.utils.parseUnits(glfAmount || "0", 18);

      // Calculate required USDT amount = (glfAmountWei * 50000) / 1e18
      const usdtAmount = glfAmountWei.mul(50000).div(ethers.utils.parseUnits("1", 18));

      // Check allowance first
      const allowance = await usdtContract.allowance(account, PRESALE_CONTRACT_ADDRESS);

      if (allowance.lt(usdtAmount)) {
        const approveTx = await usdtContract.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
        await approveTx.wait();
      }

      // Call buyTokens with GLF amount in wei
      const buyTx = await presaleContract.buyTokens(glfAmountWei);
      await buyTx.wait();

      setNotification({ type: "success", message: "Token purchase successful!" });
      setGlfAmount("");
    } catch (error) {
      console.error("Purchase error:", error);
      setNotification({ type: "error", message: "Purchase failed." });
    }
  };

  return (
    <div className="mb-4">
      <input
        type="number"
        step="0.0001"
        min="0"
        placeholder="Amount of GLF to buy"
        value={glfAmount}
        onChange={(e) => setGlfAmount(e.target.value)}
        className="px-4 py-2 mr-2 rounded text-black"
      />
      <button
        onClick={buy}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Buy
      </button>
    </div>
  );
}