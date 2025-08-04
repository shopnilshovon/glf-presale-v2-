import React, { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import { ethers } from "ethers";

const TokenPoolInfo = ({ account }) => {
  const contract = useContract();
  const [poolAmount, setPoolAmount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokenPool = async () => {
      if (!contract || !account) return;

      try {
        const result = await contract.getAvailableTokens();
        const formatted = ethers.utils.formatUnits(result, 18);
        setPoolAmount(formatted);
        setError("");
      } catch (err) {
        console.error("Error fetching pool info:", err);
        setError("Failed to fetch token pool info.");
      }
    };

    fetchTokenPool();
  }, [account, contract]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-4 text-white">
      <h2 className="text-xl font-semibold mb-2">Token Pool</h2>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : poolAmount === null ? (
        <p>Loading...</p>
      ) : (
        <p className="text-lg">{poolAmount} GLF tokens available</p>
      )}
    </div>
  );
};

export default TokenPoolInfo;