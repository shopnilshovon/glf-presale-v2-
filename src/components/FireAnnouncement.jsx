import { motion } from "framer-motion";

export default function FireAnnouncement() {
  return (
    <motion.div
      className="fire-background text-center text-white py-4 px-6 rounded-2xl shadow-lg border border-yellow-400"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
        🌱 Presale Round 1 – Limited Time Only!
      </h2>
    </motion.div>
  );
}