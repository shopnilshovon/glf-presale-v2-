// src/components/TokenPoolInfo.jsx
import React, { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const TokenPoolInfo = ({ account }) => {
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const contract = useContract(PRESALE_CONTRACT_ADDRESS, "presale");

  useEffect(() => {
    if (!contract) return;
    const fetchPool = async () => {
      try {
        setLoading(true);
        const result = await contract.getAvailableTokens();
        const formatted = Number(result) / 1e18;
        setAvailable(formatted.toFixed(2));
      } catch (err) {
        toast.error("Failed to load token pool info.");
        console.error("Token pool error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPool();
  }, [contract]);

  return (
    <div className="bg-gradient-to-br from-green-700 to-green-600 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto my-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 tracking-wide">
        🌿 Presale Token Pool
      </h2>
      <p className="text-sm text-center text-gray-200 mb-1 tracking-wider">
        AVAILABLE
      </p>
      {loading ? (
        <div className="flex justify-center py-2">
          <Loader2 className="animate-spin w-6 h-6 text-white" />
        </div>
      ) : (
        <p className="text-4xl font-extrabold text-center tracking-tight">
          {available ?? "--"} <span className="text-white">GLF</span>
        </p>
      )}
    </div>
  );
};

export default TokenPoolInfo;