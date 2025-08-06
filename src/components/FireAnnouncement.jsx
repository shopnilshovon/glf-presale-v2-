import { motion } from "framer-motion";

export default function FireAnnouncement() {
  return (
    <motion.div
      className="text-center py-4 px-6 rounded-2xl shadow-lg border border-green-700 bg-black bg-opacity-70"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h2
        className="text-2xl md:text-3xl font-extrabold text-[#00ff00] drop-shadow-[0_0_12px_#00ff00] tracking-wide font-[Poppins]"
      >
        🌱 Presale Round 1 – Limited Time Only!
      </h2>
    </motion.div>
  );
}