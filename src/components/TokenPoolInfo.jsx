import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import useContract from "../hooks/useContract";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import PresaleABI from "../abis/PresaleABI.json";

export default function TokenPoolInfo({ account }) {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const presaleContract = useContract(PRESALE_CONTRACT_ADDRESS, PresaleABI);

  useEffect(() => {
    const fetchData = async () => {
      if (!presaleContract) return;

      try {
        const tokens = await presaleContract.getAvailableTokens();
        const price = await presaleContract.tokenPrice();

        setAvailableTokens(formatUnits(tokens, 18));
        setTokenPrice(formatUnits(price, 6)); // token price is in USDT (6 decimals)
      } catch (error) {
        console.error("Error fetching presale data:", error);
      }
    };

    fetchData();
  }, [presaleContract, account]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md text-white mb-4">
      <h2 className="text-xl font-semibold mb-2">Presale Pool Info</h2>
      {availableTokens === null || tokenPrice === null ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          <p>Available GLF Tokens: <span className="font-bold">{availableTokens}</span></p>
          <p>Current Token Price: <span className="font-bold">{tokenPrice} USDT</span></p>
        </div>
      )}
    </div>
  );
}