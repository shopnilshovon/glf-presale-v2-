import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContract } from "../hooks/useContract";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";

const TokenPoolInfo = ({ account }) => {
  const [availableTokens, setAvailableTokens] = useState(null);
  const contract = useContract(PRESALE_CONTRACT_ADDRESS);

  useEffect(() => {
    const fetchPoolInfo = async () => {
      if (!contract) return;

      try {
        const result = await contract.getAvailableTokens();
        setAvailableTokens(ethers.utils.formatUnits(result, 18));
      } catch (err) {
        console.error("Error fetching token pool info:", err);
      }
    };

    fetchPoolInfo();
  }, [contract]);

  return (
    <div className="text-white text-center mt-4">
      {availableTokens ? (
        <p>Available Tokens in Pool: <span className="font-bold">{availableTokens} GLF</span></p>
      ) : (
        <p>Loading token pool info...</p>
      )}
    </div>
  );
};

export default TokenPoolInfo;