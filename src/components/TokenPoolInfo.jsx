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
    <div className="w-full px-3 sm:px-4">
      <div className="bg-green-900/40 backdrop-blur-md border border-green-600/20 shadow-xl rounded-xl p-4 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-green-400/30">

        {/* Glowing Top Title */}
        <div className="absolute -top-3 left-3 sm:left-5 bg-gradient-to-r from-green-500 via-green-300 to-green-500 text-black px-3 py-1 rounded-b-xl font-semibold text-[10px] sm:text-sm tracking-wider shadow-md">
          🌱 GLF TOKEN POOL
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center text-center mt-6 sm:mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-green-200 mt-2">Fetching Pool Info...</p>
            </div>
          ) : (
            <>
              <p className="text-[10px] sm:text-xs text-green-200 uppercase tracking-widest mb-1">Available</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
                {availableTokens ?? "--"}{" "}
                <span className="text-green-400 font-bold tracking-tight">GLF</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}