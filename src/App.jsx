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
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-400 mb-6">GLF Token Presale</h1>

      <WalletConnect onConnected={setAccount} />

      <TokenPoolInfo account={account} />

      <BuyToken
        account={account}
        setNotification={handleNotification}
      />

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
}