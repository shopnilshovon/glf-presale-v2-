import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";

export default function TokenPoolInfo({ account }) {
  const contract = useContract();
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (contract) {
        const amt = await contract.getAvailableTokens();
        setAvailable(amt.toString());
      }
    };
    fetchTokens();
  }, [contract]);

  return (
    <div className="text-white mb-4">
      <p><strong>Available Tokens:</strong> {available ?? "Loading..."}</p>
    </div>
  );
}