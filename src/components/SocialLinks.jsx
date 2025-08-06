import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 drop-shadow-md">
        🌍 Stay Connected with GreenLeaf
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">
        <a
          href="https://x.com/GreenLeafDApp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <FaTwitter className="text-xl group-hover:animate-bounce" />
          <span>Follow us on Twitter</span>
        </a>

        <a
          href="https://t.me/GreenLeafDapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <FaTelegramPlane className="text-xl group-hover:animate-bounce" />
          <span>Join our Telegram</span>
        </a>
      </div>
    </div>
  );
}