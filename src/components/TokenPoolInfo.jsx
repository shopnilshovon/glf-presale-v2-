import { useEffect, useState } from "react";
import useContract from "../hooks/useContract";

export default function TokenPoolInfo({ account }) {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [error, setError] = useState(null);

  const presaleContract = useContract();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!presaleContract) return;

        const tokens = await presaleContract.getAvailableTokens();
        setAvailableTokens(tokens.toString());
      } catch (err) {
        console.error("Error fetching available tokens:", err);
        setError("Failed to fetch token pool info.");
      }
    };

    fetchTokens();

    const interval = setInterval(fetchTokens, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, [presaleContract]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg mt-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Token Pool</h2>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : availableTokens === null ? (
        <p>Loading...</p>
      ) : (
        <p className="text-2xl font-bold text-green-400">
          {Number(availableTokens).toLocaleString()} GLF Available
        </p>
      )}
    </div>
  );
}