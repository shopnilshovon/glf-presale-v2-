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
      const tokens = await contract.getAvailableTokens();
      setAvailableTokens(ethers.utils.formatUnits(tokens, 18)); // Assuming GLF has 18 decimals
    };

    fetchAvailableTokens();
  }, []);

  if (availableTokens === null) return <p>Loading...</p>;

  return (
    <p className="text-white mb-4">Available Tokens: {availableTokens}</p>
  );
}