import { useState } from "react";
import { ethers } from "ethers";
import { USDT_TOKEN_ADDRESS } from "../utils/constants";
import { useContract } from "../hooks/useContract";
import ABI from "../abis/PresaleABI.json";

export default function BuyToken({ account, setNotification }) {
  const [amount, setAmount] = useState("");
  const contract = useContract();

  const buy = async () => {
    if (!account) return setNotification({ type: "error", message: "Wallet not connected" });
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const usdt = new ethers.Contract(
        USDT_TOKEN_ADDRESS,
        [
          "function approve(address spender, uint amount) public returns (bool)",
          "function allowance(address owner, address spender) public view returns (uint)"
        ],
        signer
      );

      const usdtAmount = ethers.utils.parseUnits(amount, 6);

      const allowance = await usdt.allowance(account, contract.address);
      if (allowance.lt(usdtAmount)) {
        const tx1 = await usdt.approve(contract.address, usdtAmount);
        await tx1.wait();
      }

      const tx2 = await contract.buyTokens(usdtAmount);
      await tx2.wait();

      setNotification({ type: "success", message: "Token purchase successful!" });
      setAmount("");
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Purchase failed." });
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
      <button onClick={buy} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Buy
      </button>
    </div>
  );
}