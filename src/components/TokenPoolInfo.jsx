import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import ABI from "../abis/PresaleABI.json";

export default function TokenPoolInfo() {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableTokens = async () => {
      if (!window.ethereum) return;

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, provider);

      try {
        const tokens = await contract.getAvailableTokens();
        setAvailableTokens(ethers.utils.formatUnits(tokens, 18));
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        setAvailableTokens("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTokens();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md mx-auto px-4 my-6 sm:my-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-900/10 backdrop-blur-lg shadow-2xl p-6 sm:p-8 transition-all duration-300 group hover:shadow-green-400/30">

        {/* Glowing Blobs */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-14 -left-14 w-40 h-40 bg-green-400 opacity-20 rounded-full blur-2xl z-0 animate-blob"
        ></motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-14 -right-14 w-40 h-40 bg-green-500 opacity-20 rounded-full blur-2xl z-0 animate-blob animation-delay-2000"
        ></motion.div>

        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-black text-xs sm:text-sm font-bold px-4 py-1 rounded-xl shadow-md tracking-wider text-center mb-4 w-full animate-pulse">
          🌱 GLF POOL: ROUND 1
        </div>

        {/* Token Info */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
          {loading ? (
            <>
              <motion.div
                className="w-8 h-8 border-4 border-green-300 border-t-transparent rounded-full animate-spin"
                aria-label="loading"
              />
              <p className="text-green-200 text-sm sm:text-base">Fetching pool info...</p>
            </>
          ) : (
            <>
              <p className="text-green-300 text-sm sm:text-base mb-1">Available</p>
              <motion.h3
                key={availableTokens}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-sm"
              >
                {availableTokens ?? "--"}{" "}
                <span className="text-green-400">GLF</span>
              </motion.h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Tokens left in presale pool
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}