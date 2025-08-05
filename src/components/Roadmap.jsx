import React from "react";

export default function Roadmap() {
  return (
    <section className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-8 my-12 text-gray-100">
      <h2 className="text-3xl font-extrabold text-green-400 mb-6 text-center">
        ✅ GreenLeaf (GLF) Project Roadmap
      </h2>

      <div className="space-y-8">

        {/* Phase 1 */}
        <div>
          <h3 className="text-xl font-bold text-lime-400 mb-2 flex items-center gap-2">
            🌱 Phase 1: Project Initialization (Current Stage)
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>✅ Deploy GreenLeaf Token (GLF) with 1,000,000 fixed supply</li>
            <li>✅ Develop GreenLeaf DApp with daily passive reward system</li>
            <li>✅ Set 4% daily reward based on wallet-hold GLF tokens</li>
            <li>✅ Launch Public Presale Round 1</li>
            <li>✅ Total Presale Token Pool: 300,000 GLF (3 rounds)</li>
            <li>✅ Set reward cap at 2,000,000 total GLF supply</li>
            <li className="italic text-sm mt-1">
              Reward & interest will stop permanently after reaching 2M
            </li>
          </ul>
        </div>

        <hr className="border-gray-700" />

        {/* Phase 2 */}
        <div>
          <h3 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
            🛒 Phase 2: Presale Rounds
          </h3>

          <div className="space-y-4 pl-4 border-l-4 border-lime-400">
            <div>
              <h4 className="font-semibold text-green-300">🔵 Round 1</h4>
              <p className="text-gray-300 ml-4">Token Price: $0.10 USDT</p>
              <p className="text-gray-300 ml-4">Token Pool: 100,000 GLF</p>
            </div>

            <div>
              <h4 className="font-semibold text-orange-400">🟠 Round 2</h4>
              <p className="text-gray-300 ml-4">Token Price: $0.15 USDT</p>
              <p className="text-gray-300 ml-4">Token Pool: 100,000 GLF</p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-500">🟣 Round 3</h4>
              <p className="text-gray-300 ml-4">Token Price: $0.20 USDT</p>
              <p className="text-gray-300 ml-4">Token Pool: 100,000 GLF</p>
            </div>

            <p className="italic text-sm mt-2">
              ⏳ Users must hold presale-purchased GLF in wallet to receive daily mining rewards.
            </p>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Phase 3 */}
        <div>
          <h3 className="text-xl font-bold text-lime-400 mb-2 flex items-center gap-2">
            🚀 Phase 3: Listing & Liquidity
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>✅ Launch on DEX (Uniswap / Quickswap)</li>
            <li>✅ Initial DEX Token Price: $0.30 USDT</li>
            <li>✅ Provide 300,000 GLF as liquidity to DEX</li>
          </ul>
        </div>

        <hr className="border-gray-700" />

        {/* Phase 4 */}
        <div>
          <h3 className="text-xl font-bold text-lime-400 mb-2 flex items-center gap-2">
            🎁 Phase 4: Airdrop & Community Expansion
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>🎉 Airdrop Campaign</li>
            <li>Total Airdrop Pool: 200,000 GLF</li>
            <li>Distribution based on community participation & task completion</li>
            <li>💥 DEX Trade Volume Event</li>
            <li>Bonus reward pool: 50,000 GLF</li>
            <li>For high-volume DEX traders & active users</li>
          </ul>
        </div>

        <hr className="border-gray-700" />

        {/* Phase 5 */}
        <div>
          <h3 className="text-xl font-bold text-lime-400 mb-2 flex items-center gap-2">
            🌍 Phase 5: Global Expansion
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>🌐 List GLF on top centralized exchanges (CEX)</li>
            <li>🌱 Launch influencer & community ambassador programs</li>
            <li>📣 Run targeted campaigns for ecosystem adoption</li>
            <li>🔒 Use remaining GLF tokens for:</li>
            <ul className="list-disc list-inside ml-6 text-gray-400">
              <li>Ecosystem growth</li>
              <li>Future utility development</li>
              <li>Community rewards</li>
            </ul>
          </ul>
        </div>

        <hr className="border-gray-700" />

        {/* End of Reward Phase */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
            🔚 End of Reward Phase
          </h3>
          <p className="text-gray-300">
            When total GLF supply reaches 2,000,000, the daily mining & reward system will be permanently disabled
            <br />
            Focus shifts to long-term growth, exchange listings, and utility creation
          </p>
        </div>

        <hr className="border-gray-700" />

        <p className="text-gray-400 italic text-center mt-6">
          🟢 This roadmap will evolve based on community feedback, ecosystem success, and market conditions.
        </p>
      </div>
    </section>
  );
}