import { useEffect, useState } from "react";
import Notification from "./Notification";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onConnected(accounts[0]);
        } else {
          setAccount(null);
          onConnected(null);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [onConnected]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                rpcUrls: ["https://polygon-rpc.com/"],
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          showNotification("error", "Could not add Polygon network");
        }
      } else {
        showNotification("error", "Please switch to Polygon network manually");
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      showNotification("error", "MetaMask not found. Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await switchToPolygon();

      setAccount(accounts[0]);
      onConnected(accounts[0]);
      showNotification("success", "Wallet connected successfully!");
    } catch (err) {
      console.error(err);
      showNotification("error", "Connection failed!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onConnected(null);
    showNotification("success", "Disconnected");
  };

  return (
    <div className="mb-6 text-white w-full flex justify-center">
      {notification && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}

      {account ? (
        <div className="flex flex-col items-center md:flex-row md:gap-4 bg-gradient-to-r from-green-800 to-green-600 px-4 py-2 rounded-xl shadow-lg">
          <span className="text-sm font-mono tracking-wide">
            ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="mt-2 md:mt-0 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-full text-sm shadow-md transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition transform duration-200"
        >
          🔗 Connect Wallet
        </button>
      )}
    </div>
  );
}