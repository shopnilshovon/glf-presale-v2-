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
    <div className="w-full px-4">
      <div className="bg-green-900/40 backdrop-blur-md border border-green-600/20 shadow-xl rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-green-400/30">

        {/* Header */}
        <h2 className="text-center text-xs sm:text-sm tracking-wider font-semibold bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-black px-5 py-1 rounded-b-xl shadow mb-4 inline-block">
          🌱 GLF TOKEN POOL
        </h2>

        {/* Content */}
        <div className="text-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs sm:text-sm text-green-200 mt-3">Fetching Pool Info...</p>
            </div>
          ) : (
            <>
              <p className="text-green-300 text-sm sm:text-base tracking-wide mb-1">
                Available
              </p>
              <p className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
                {availableTokens ?? "--"}{" "}
                <span className="text-green-400 font-semibold">GLF</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}