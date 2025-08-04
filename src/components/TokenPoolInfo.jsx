import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function TokenPoolInfo() {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableTokens = async () => {
      if (!window.ethereum) return;

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, provider);

      try {
        const tokens = await contract.getAvailableTokens();
        setAvailableTokens(ethers.utils.formatUnits(tokens, 18));
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        setAvailableTokens("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTokens();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-2xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-green-300/30 backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-100 tracking-wide mb-4">
        🌿 <span className="text-green-300">Presale Token Pool</span>
      </h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-6">
          <div className="w-6 h-6 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-green-200">Loading available tokens...</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xs text-green-200 mb-1 tracking-widest uppercase">Available</p>
          <p className="text-5xl font-extrabold text-white drop-shadow-md leading-tight">
            {availableTokens ?? "--"}{" "}
            <span className="text-green-300 font-bold tracking-tight">GLF</span>
          </p>
        </div>
      )}
    </div>
  );
}