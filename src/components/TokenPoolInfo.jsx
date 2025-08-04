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
      <div className="bg-green-800/70 border border-green-400/30 backdrop-blur-sm rounded-2xl shadow-lg p-5 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-green-300 mb-2">
          <span>🌿</span>
          <span>Token Pool</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-5 h-5 border-4 border-green-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-green-200 mt-2">Loading...</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-green-200 uppercase tracking-widest mb-1">Available</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-white">
              {availableTokens ?? "--"}{" "}
              <span className="text-green-300 font-bold tracking-tight">GLF</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}