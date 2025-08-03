import { useState } from "react";
import WalletConnect from "./components/WalletConnect";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🌱 GreenLeaf Presale</h1>

      {/* Wallet Connect */}
      <WalletConnect onConnect={setAccount} />

      {/* Show address if connected */}
      {account && (
        <p className="mt-4 text-green-400">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
    </div>
  );
}

export default App;