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
    <div className="bg-green-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-md mx-auto mt-6 border border-green-400/30">
      <h2 className="text-xl font-bold text-center text-white mb-2">
        Presale Token Pool
      </h2>

      {availableTokens === null ? (
        <p className="text-yellow-300 text-center">Loading available tokens...</p>
      ) : (
        <p className="text-lg text-white text-center">
          <span className="font-semibold">{availableTokens}</span> GLF Available
        </p>
      )}
    </div>
  );
}