import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function TokenPoolInfo() {
  const [availableTokens, setAvailableTokens] = useState(null);

  useEffect(() => {
    const fetchAvailableTokens = async () => {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, provider);

      try {
        const tokens = await contract.getAvailableTokens();
        setAvailableTokens(ethers.utils.formatUnits(tokens, 18));
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        setAvailableTokens("Error");
      }
    };

    fetchAvailableTokens();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 rounded-2xl shadow-xl p-6 max-w-md mx-auto mt-8 border border-green-300/30 backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-green-100 tracking-wide mb-4">
        🌿 Presale Token Pool
      </h2>

      {availableTokens === null ? (
        <p className="text-yellow-300 text-center">Fetching tokens...</p>
      ) : (
        <div className="text-center">
          <p className="text-sm text-green-200 mb-1 tracking-wide uppercase">Available</p>
          <p className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
            {availableTokens} <span className="text-green-300 font-semibold">GLF</span>
          </p>
        </div>
      )}
    </div>
  );
}