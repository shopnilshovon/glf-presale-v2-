import { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import presaleAbi from "../abis/PresaleABI.json";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";

const useContract = (account) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum && account) {
        const browserProvider = new BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const presaleContract = new Contract(PRESALE_CONTRACT_ADDRESS, presaleAbi, signer);
        setContract(presaleContract);
        setProvider(browserProvider);
      } else {
        setContract(null);
        setProvider(null);
      }
    };

    init();
  }, [account]);

  return { contract, provider };
};

export default useContract;
