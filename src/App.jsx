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
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-10">

      {/* 🟢 Animated Blob Background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-500 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-green-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-400 opacity-25 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* 🧩 Content */}
      <div className="z-10 w-full max-w-xl bg-secondary bg-opacity-60 p-8 rounded-2xl shadow-lg backdrop-blur-md animate-fade-in">

        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          GLF Token Presale
        </h1>

        <WalletConnect onConnected={setAccount} />
        <TokenPoolInfo />
        <BuyToken account={account} setNotification={handleNotification} />

        {notification && (
          <Notification type={notification.type} message={notification.message} />
        )}
      </div>
    </div>
  );
}