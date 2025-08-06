import { motion } from "framer-motion";

export default function FireAnnouncement() {
  return (
    <motion.div
      className="glow-bar text-center py-4 px-6 rounded-2xl shadow-lg border border-green-400"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] tracking-wide font-[Poppins]">
        🌱 Presale Round 1 – Limited Time Only!
      </h2>
    </motion.div>
  );
}