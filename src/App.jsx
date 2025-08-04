import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenPoolInfo from "./components/TokenPoolInfo";
import BuyToken from "./components/BuyToken";
import Notification from "./components/Notification";

export default function App() {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState(null);

  // Show notification for 5 seconds
  const handleNotification = (notif) => {
    setNotification(notif);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
        GLF Token Presale
      </h1>

      {/* Wallet Connect Button */}
      <WalletConnect onConnected={setAccount} />

      {/* Token Pool Info (pass account if needed later) */}
      <TokenPoolInfo account={account} />

      {/* Token Purchase Box */}
      <BuyToken account={account} setNotification={handleNotification} />

      {/* Notification Popup */}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
}