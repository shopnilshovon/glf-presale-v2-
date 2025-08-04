import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { useContract } from "../hooks/useContract";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import PresaleABI from "../abis/PresaleABI.json";

const TokenPoolInfo = () => {
  const contract = useContract();
  const [availableTokens, setAvailableTokens] = useState(null);
  const [debugLog, setDebugLog] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const tokens = await contract.getAvailableTokens();
          setAvailableTokens(formatUnits(tokens, 18));
          setDebugLog("✅ Contract connected & data fetched");
        } else {
          setDebugLog("❌ Contract is null");
        }
      } catch (error) {
        console.error("Error fetching available tokens:", error);
        setDebugLog("⚠️ Error fetching tokens");
      }
    };

    fetchData();
  }, [contract]);

  return (
    <div className="bg-green-900 text-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2 text-center">Presale Token Pool</h2>
      {availableTokens === null ? (
        <p className="text-yellow-300 text-center">Loading...</p>
      ) : (
        <p className="text-lg text-center">
          <span className="font-semibold">{availableTokens}</span> GLF Available
        </p>
      )}
      <div className="text-xs text-gray-300 mt-3 text-center">Debug: {debugLog}</div>
    </div>
  );
};

export default TokenPoolInfo;