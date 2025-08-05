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
    <div className="w-full max-w-md mx-auto my-6">
      <div className="relative rounded-2xl border border-green-500/30 bg-green-800/10 backdrop-blur-md shadow-lg overflow-hidden p-6 sm:p-8 transition duration-300 hover:shadow-green-400/30">

        {/* Ribbon Header */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-black text-xs sm:text-sm font-bold px-4 py-1 rounded-b-xl shadow-md tracking-wider">
            🌱 GLF POOL: ROUND 1
          </div>
        </div>

        {/* Pool Info */}
        <div className="flex flex-col items-center justify-center pt-8">
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