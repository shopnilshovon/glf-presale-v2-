import { useEffect } from "react";

export default function WalletConnect({ onConnected }) {
  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    onConnected(accounts[0]);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => onConnected(accounts[0]));
    }
  }, [onConnected]);

  return (
    <button
      onClick={connectWallet}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      Connect Wallet
    </button>
  );
}