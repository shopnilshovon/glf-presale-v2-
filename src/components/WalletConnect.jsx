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
    <div className="w-full flex justify-center items-center mt-8 px-4 sm:px-0 relative">
      {notification && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
          <Notification type={notification.type} message={notification.message} />
        </div>
      )}

      <div className="bg-gradient-to-br from-green-900 via-black to-green-800 rounded-3xl p-1 sm:p-1.5 shadow-2xl w-full max-w-lg">
        <div className="bg-black/70 backdrop-blur-md rounded-3xl px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border border-green-700">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-lime-400 animate-pulse tracking-wide">
              {account
                ? `✅ Connected`
                : `🔗 Connect Your Wallet`}
            </h2>
            {account && (
              <p className="text-sm text-white font-mono mt-1 break-all">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            )}
          </div>

          {account ? (
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-full shadow-md transition duration-300"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-green-400 hover:to-lime-400 text-black font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg transition duration-300 hover:scale-105"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}