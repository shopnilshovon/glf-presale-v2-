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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 sm:p-6 flex flex-col items-center relative overflow-x-hidden">
      
      {/* Decorative blurred blob */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10"></div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-400 mt-6 mb-10 text-center tracking-tight drop-shadow-lg">
        GLF Token Presale
      </h1>

      <div className="w-full max-w-2xl space-y-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <WalletConnect onConnected={setAccount} />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <TokenPoolInfo />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <BuyToken account={account} setNotification={handleNotification} />
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}
    </div>
  );
}