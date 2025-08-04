import { useEffect, useState } from "react";
import { useNotification } from "../utils/notification";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);
  const { notifySuccess, notifyError } = useNotification();

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

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // 137 in hex
      });
    } catch (switchError) {
      // Chain not added
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
          notifyError("Could not add Polygon network");
        }
      } else {
        notifyError("Please switch to Polygon network manually");
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      notifyError("MetaMask not found. Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await switchToPolygon();

      setAccount(accounts[0]);
      onConnected(accounts[0]);
      notifySuccess("Wallet connected successfully!");
    } catch (err) {
      notifyError("Connection failed!");
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onConnected(null);
    notifySuccess("Disconnected");
  };

  return (
    <div className="mb-4 text-white">
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