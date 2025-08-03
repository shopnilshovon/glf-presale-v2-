import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import presaleAbi from "../abis/PresaleABI.json";

const TokenPoolInfo = ({ account, provider }) => {
  const [available, setAvailable] = useState(null);
  const [error, setError] = useState(null);

  const fetchAvailableTokens = async () => {
    try {
      if (!provider) return;

      const signer = await provider.getSigner();
      const presaleContract = new Contract(PRESALE_CONTRACT_ADDRESS, presaleAbi, signer);
      const glfAmount = await presaleContract.getAvailableTokens();

      setAvailable(Number(glfAmount));
    } catch (err) {
      setError("Failed to fetch available tokens.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAvailableTokens();
  }, [provider]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-6 w-full max-w-md text-center shadow-lg">
      <h2 className="text-xl font-semibold mb-2">GLF Available in Presale Pool</h2>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : available !== null ? (
        <p className="text-2xl text-green-400 font-bold">{available} GLF</p>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  );
};

export default TokenPoolInfo;