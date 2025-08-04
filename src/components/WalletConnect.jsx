import { useEffect, useState } from "react";
import Notification from "./Notification";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState(null); // holds {type, message}

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
    setTimeout(() => {
      setNotification(null);
    }, 3000);
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
    <div className="mb-4 text-white">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {account ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}