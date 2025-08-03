import { useEffect, useState } from "react";
import { Contract } from "ethers";
import presaleAbi from "../abis/PresaleABI.json";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";

const TokenPoolInfo = ({ provider, account }) => {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [error, setError] = useState(null);

  const fetchTokenPool = async () => {
    try {
      if (!provider) {
        setError("Provider not found");
        return;
      }

      const signer = await provider.getSigner();
      const contract = new Contract(PRESALE_CONTRACT_ADDRESS, presaleAbi, signer);
      const tokens = await contract.getAvailableTokens();
      setAvailableTokens(tokens.toString());
    } catch (err) {
      setError("Failed to fetch token pool info");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTokenPool();
  }, [account]);

  return (
    <div className="bg-white/5 p-4 rounded-xl shadow-md text-white mt-4">
      <h2 className="text-lg font-semibold mb-2">Available GLF Tokens</h2>
      {error && <p className="text-red-400">{error}</p>}
      {!error && (
        <p className="text-xl">
          {availableTokens !== null ? `${availableTokens} GLF` : "Loading..."}
        </p>
      )}
    </div>
  );
};

export default TokenPoolInfo;