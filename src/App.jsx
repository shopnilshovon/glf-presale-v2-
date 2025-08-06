import { useState } from "react";
import { motion } from "framer-motion";
import WalletConnect from "./components/WalletConnect";
import TokenPoolInfo from "./components/TokenPoolInfo";
import BuyToken from "./components/BuyToken";
import Notification from "./components/Notification";
import Roadmap from "./components/Roadmap";
import SocialLinks from "./components/SocialLinks";

export default function App() {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState(null);
  const [debugLogs, setDebugLogs] = useState([]);

  const handleNotification = (notif) => {
    setNotification(notif);
    setTimeout(() => setNotification(null), 5000);
  };

  const addLog = (log) => {
    setDebugLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${log}`]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10 flex flex-col items-center relative overflow-x-hidden">

      {/* ✨ Floating Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-lime-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10"></div>

      {/* 🌿 Hero Section */}
      <motion.header
        className="text-center mb-12 max-w-2xl px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg">
          🌿 GreenLeaf Presale 🌐
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-300">
          Connect your wallet and purchase GLF tokens now – become a part of the green future!
        </p>
      </motion.header>

      {/* 📦 Main Cards Section */}
      <main className="w-full max-w-4xl space-y-8">
        <motion.section
          className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-5 sm:p-8 transition duration-300 hover:shadow-2xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <WalletConnect onConnected={setAccount} addLog={addLog} />
        </motion.section>

        <motion.section
          className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-5 sm:p-8 transition duration-300 hover:shadow-2xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TokenPoolInfo addLog={addLog} />
        </motion.section>

        <motion.section
          className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-10 transition duration-300 hover:shadow-2xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BuyToken account={account} setNotification={handleNotification} addLog={addLog} />
        </motion.section>
      </main>

      {/* 🗺️ Roadmap Section */}
      <motion.div
        className="w-full max-w-4xl mt-16 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Roadmap />
      </motion.div>

      {/* 🔗 Social Links */}
      <motion.div
        className="w-full max-w-4xl mt-10 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <SocialLinks />
      </motion.div>

      {/* 🔔 Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}

      {/* 🐞 Debug Console Section */}
      <motion.div
        className="w-full max-w-4xl mt-10 px-4 py-4 bg-black/30 backdrop-blur-md border border-green-400/30 rounded-xl text-sm overflow-y-auto max-h-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-green-400 font-semibold mb-2">🔍 Debug Console</h2>
        {debugLogs.length === 0 ? (
          <p className="text-gray-400">No logs yet...</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {debugLogs.map((log, index) => (
              <li key={index} className="text-gray-300">{log}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}