import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenPoolInfo from "./components/TokenPoolInfo";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-6">🌱 GLF Token Presale</h1>

      <WalletConnect setAccount={setAccount} setProvider={setProvider} />

      {account && provider && (
        <>
          <TokenPoolInfo account={account} provider={provider} />
        </>
      )}
    </div>
  );
}

export default App;