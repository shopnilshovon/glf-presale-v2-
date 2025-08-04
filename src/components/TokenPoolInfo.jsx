import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import { formatUnits } from "ethers";

const TokenPoolInfo = () => {
  const [availableTokens, setAvailableTokens] = useState(null);
  const presaleContract = useContract(PRESALE_CONTRACT_ADDRESS, "presale");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokens = await presaleContract.getAvailableTokens();
        setAvailableTokens(formatUnits(tokens, 18));
      } catch (error) {
        console.error("Error fetching available tokens:", error);
        setAvailableTokens("0");
      }
    };

    if (presaleContract) {
      fetchTokens();
    }
  }, [presaleContract]);

  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg w-full max-w-md mb-4">
      <h2 className="text-xl font-bold mb-2">Token Pool</h2>
      <p className="text-green-400 text-lg font-mono">
        {availableTokens !== null ? `${availableTokens} GLF` : "Loading..."}
      </p>
    </div>
  );
};

export default TokenPoolInfo;