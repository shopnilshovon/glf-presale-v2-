import { useState } from "react";
import { ethers } from "ethers";
import { USDT_TOKEN_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function BuyToken({ account, setNotification }) {
  const [amount, setAmount] = useState("");

  const buy = async () => {
    if (!account) {
      setNotification({ type: "error", message: "Wallet not connected" });
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // USDT Contract (approve & allowance)
      const usdt = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        [
          "function approve(address spender, uint amount) public returns (bool)",
          "function allowance(address owner, address spender) public view returns (uint256)"
        ],
        signer
      );

      // Presale Contract
      const presale = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, signer);

      // ইউজার যে USDT এর পরিমাণ ইনপুট দিয়েছে, সেটা 6 দশমিক সহ parse করা
      const usdtAmount = ethers.utils.parseUnits(amount, 6);

      // আগে দেখো কতটা USDT অ্যাপ্রুভ করা আছে
      const allowance = await usdt.allowance(account, PRESALE_CONTRACT_ADDRESS);

      if (allowance.lt(usdtAmount)) {
        const approveTx = await usdt.approve(PRESALE_CONTRACT_ADDRESS, usdtAmount);
        await approveTx.wait();
      }

      // তারপর বায় টোকেন ট্রানজেকশন
      const buyTx = await presale.buyTokens(usdtAmount);
      await buyTx.wait();

      setNotification({ type: "success", message: "Token purchase successful!" });
      setAmount("");
    } catch (error) {
      console.error("Purchase failed:", error);
      setNotification({ type: "error", message: "Purchase failed. " + (error?.data?.message || error.message) });
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Amount in USDT"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-2 mr-2 rounded"
      />
      <button
        onClick={buy}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buy
      </button>
    </div>
  );
}