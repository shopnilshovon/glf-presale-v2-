import React, { useState } from "react";
import { ethers } from "ethers";
import { useContract } from "../hooks/useContract";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import { useNotification } from "./Notification";

const BuyToken = ({ account }) => {
  const contract = useContract();
  const [buying, setBuying] = useState(false);
  const { showNotification } = useNotification();

  const handleBuy = async () => {
    if (!window.ethereum || !account) {
      showNotification("Wallet not connected", "error");
      return;
    }

    try {
      setBuying(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        ["function approve(address,uint256) public returns (bool)", "function allowance(address,address) public view returns (uint256)"],
        signer
      );

      // Example: 1 GLF = 0.05 USDT → so buy 1 GLF
      const usdtAmount = ethers.utils.parseUnits("0.05", 6); // 6 decimals for USDT
      const tokenAmount = ethers.utils.parseUnits("1", 18);  // 18 decimals for GLF

      const allowance = await usdtContract.allowance(account, PRESALE_CONTRACT_ADDRESS);
      if (allowance.lt(usdtAmount)) {
        const approveTx = await usdtContract.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
        await approveTx.wait();
      }

      const tx = await contract.buyTokens(tokenAmount);
      await tx.wait();

      showNotification("Tokens purchased successfully!", "success");
    } catch (err) {
      console.error("Buy failed:", err);
      showNotification("Transaction failed", "error");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4 text-white">
      <h2 className="text-xl font-semibold mb-2">Buy GLF Tokens</h2>
      <button
        onClick={handleBuy}
        disabled={buying}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {buying ? "Processing..." : "Buy"}
      </button>
    </div>
  );
};

export default BuyToken;