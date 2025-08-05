import React from "react";
import { FaSeedling, FaCoins, FaRocket, FaGift, FaChartLine } from "react-icons/fa";

const roadmapItems = [
  {
    icon: <FaSeedling size={24} className="text-green-500" />,
    title: "Phase 1: Launch & Mining System",
    description: "GLF token holders receive 4% daily passive rewards. When total supply reaches 2M, rewards stop permanently.",
  },
  {
    icon: <FaCoins size={24} className="text-yellow-500" />,
    title: "Phase 2: Presale Rounds",
    description: "3 Presale rounds – 100K tokens each. Price increases per round: $0.10 → $0.15 → $0.20 USDT.",
  },
  {
    icon: <FaRocket size={24} className="text-purple-500" />,
    title: "Phase 3: DEX Listing",
    description: "GLF will be listed on Uniswap/Quickswap at $0.30 with 300K token liquidity pool.",
  },
  {
    icon: <FaGift size={24} className="text-pink-500" />,
    title: "Phase 4: Airdrop Distribution",
    description: "200K tokens distributed via airdrop based on user activity and contribution.",
  },
  {
    icon: <FaChartLine size={24} className="text-blue-500" />,
    title: "Phase 5: Exchange Listings & Events",
    description: "List GLF on centralized exchanges. Host trading competitions with 50K token reward pool.",
  },
];

const Roadmap = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-16 bg-[#0e1a12] text-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-400">🌿 Project Roadmap</h2>
        <p className="mt-4 text-gray-300">Here's what lies ahead for GLF Token – phase by phase.</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {roadmapItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start bg-[#142218] p-6 rounded-2xl border border-green-800 hover:shadow-xl transition duration-300"
          >
            <div className="mr-4">{item.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-green-300">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;