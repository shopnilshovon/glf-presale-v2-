import { useState, useEffect } from "react";

const polygonNetwork = {
  chainId: "0x89", // 137 in hex
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"]
};

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);

  // Auto connect on load
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onConnected(accounts[0]);
          checkNetwork();
        }
      });

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
  }, []);

  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== polygonNetwork.chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: polygonNetwork.chainId }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [polygonNetwork]
          });
        }
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccount(accounts[0]);
        onConnected(accounts[0]);
        checkNetwork();
      } catch (err) {
        console.error("Wallet connect error:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onConnected(null);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-xl shadow-lg">
      {account ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}