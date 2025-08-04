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
    <div className="bg-green-800/60 border border-green-400/20 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm mx-auto mt-6 p-4">
      <h2 className="text-xl font-semibold text-center text-green-100 mb-3">
        🌿 <span className="text-green-300">Token Pool</span>
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-5 h-5 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-green-200 mt-2">Loading...</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xs text-green-200 mb-1 uppercase tracking-widest">Available</p>
          <p className="text-3xl font-bold text-white">
            {availableTokens ?? "--"}{" "}
            <span className="text-green-300 font-semibold">GLF</span>
          </p>
        </div>
      )}
    </div>
  );
}