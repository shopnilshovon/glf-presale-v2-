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
    <div className="w-full max-w-md mx-auto my-6 px-4 sm:px-0 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-green-900/10 backdrop-blur-lg shadow-lg p-6 sm:p-8 transition duration-300 hover:shadow-green-400/30 group">

        {/* GLOWING BACKGROUND BLOB */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400 opacity-20 rounded-full blur-2xl z-0 animate-blob group-hover:opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500 opacity-20 rounded-full blur-2xl z-0 animate-blob animation-delay-2000 group-hover:opacity-30"></div>

        {/* Fixed Header */}
        <div className="relative z-10 bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-black text-xs sm:text-sm font-bold px-4 py-1 rounded-xl shadow-md tracking-wider text-center mb-4 w-full">
          🌱 GLF POOL: ROUND 1
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {loading ? (
            <>
              <div className="w-8 h-8 border-4 border-green-300 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-green-200 text-sm sm:text-base">Fetching pool info...</p>
            </>
          ) : (
            <>
              <p className="text-green-300 text-sm sm:text-base mb-1">Available</p>
              <h3 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-sm">
                {availableTokens ?? "--"} <span className="text-green-400">GLF</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Tokens left in presale pool
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}