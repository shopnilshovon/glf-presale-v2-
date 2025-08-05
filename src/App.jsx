import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenPoolInfo from "./components/TokenPoolInfo";
import BuyToken from "./components/BuyToken";
import Notification from "./components/Notification";

export default function App() {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleNotification = (notif) => {
    setNotification(notif);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-6 sm:px-6 flex flex-col items-center relative overflow-x-hidden">

      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-10 w-80 h-80 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-lime-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10"></div>

      {/* Hero Title */}
      <h1 className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 mb-12 drop-shadow-lg leading-tight text-balance px-2 max-w-md sm:max-w-3xl">
        <span className="text-2xl sm:text-4xl md:text-5xl break-words">
          🌿 Welcome to the GLF Token Presale
        </span>
      </h1>

      {/* Main Card Section */}
      <div className="w-full max-w-3xl space-y-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition duration-300 hover:shadow-2xl">
          <WalletConnect onConnected={setAccount} />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition duration-300 hover:shadow-2xl">
          <TokenPoolInfo />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition duration-300 hover:shadow-2xl">
          <BuyToken account={account} setNotification={handleNotification} />
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}
    </div>
  );
}