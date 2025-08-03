import { useEffect, useState } from "react";

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState(null);
  const [networkError, setNetworkError] = useState("");

  const polygonChain = {
    chainId: "0x89", // 137 in hex
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  };

  const checkNetwork = async () => {
    try {
      const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== polygonChain.chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: polygonChain.chainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [polygonChain],
            });
          } else {
            setNetworkError("Failed to switch to Polygon network.");
          }
        }
      }
    } catch (err) {
      setNetworkError("Unable to detect network.");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or use a Web3-enabled browser like Mises");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      onConnect(accounts[0]);
      await checkNetwork();
    } catch (error) {
      console.error("Wallet connect error:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="text-center mb-4">
      {account ? (
        <button className="bg-green-600 text-white px-4 py-2 rounded-full">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
        >
          Connect Wallet
        </button>
      )}
      {networkError && <p className="text-red-500 mt-2">{networkError}</p>}
    </div>
  );
};

export default WalletConnect;
