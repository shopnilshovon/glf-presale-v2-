import { useState, useEffect } from "react";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);

  // Auto switch to Polygon Mainnet
  const switchToPolygon = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // Polygon Mainnet chainId
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        // Polygon not added, so add it
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x89",
              chainName: "Polygon Mainnet",
              rpcUrls: ["https://polygon-rpc.com/"],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
            }],
          });
        } catch (addError) {
          console.error("Failed to add Polygon network:", addError);
          alert("Please add Polygon network to your wallet manually.");
        }
      } else {
        console.error("Failed to switch Polygon network:", switchError);
        alert("Please switch to Polygon network manually.");
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      await switchToPolygon();

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAccount(account);
      onConnected(account);
    } catch (error) {
      console.error("Wallet connect error:", error);
      alert("Failed to connect wallet.");
    }
  };

  // Auto update account if user switches accounts or networks
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        onConnected(null);
      } else {
        setAccount(accounts[0]);
        onConnected(accounts[0]);
      }
    };

    const handleChainChanged = (chainId) => {
      // Reload page on network change to reset state
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [onConnected]);

  return (
    <div className="mb-6">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center space-x-4 text-green-300">
          <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
          <button
            onClick={() => {
              setAccount(null);
              onConnected(null);
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}