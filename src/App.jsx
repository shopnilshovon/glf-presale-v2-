import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenPoolInfo from "./components/TokenPoolInfo";
import BuyToken from "./components/BuyToken";
import Notification from "./components/Notification";

function App() {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-green-400">GLF Token Presale</h1>
        <WalletConnect setAccount={setAccount} />
      </header>

      {/* Main Section */}
      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <TokenPoolInfo account={account} />
        <BuyToken account={account} setNotification={setNotification} />
      </main>

      {/* Notification */}
      {notification && <Notification message={notification} />}

      {/* Roadmap Section */}
      <section className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-green-300">
          Project Roadmap
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-md border border-white/20 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Phase 1 - Launch</h3>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Smart contract development</li>
              <li>Presale website live</li>
              <li>Initial marketing push</li>
              <li>Community building (Telegram, Twitter)</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-md border border-white/20 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Phase 2 - Growth</h3>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>DEX listing (QuickSwap/Uniswap)</li>
              <li>Liquidity pool creation</li>
              <li>Staking & rewards system</li>
              <li>Social media ads campaign</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-md border border-white/20 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Phase 3 - Utility</h3>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>GreenLeaf DApp v1 launch</li>
              <li>GLF payment integrations</li>
              <li>Eco donation gateway</li>
              <li>Token buyback system</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-md border border-white/20 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Phase 4 - Expansion</h3>
            <ul className="list-disc ml-6 text-sm leading-relaxed">
              <li>Partnerships with eco-projects</li>
              <li>Green NFT ecosystem</li>
              <li>Mobile app release</li>
              <li>Global community events</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-12 mb-4">
        © {new Date().getFullYear()} GreenLeaf Finance. All rights reserved.
      </footer>
    </div>
  );
}

export default App;