import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";
import PresaleABI from "../abis/PresaleABI.json";

export default function useContract() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        PresaleABI,
        signer
      );

      setContract(contractInstance);
    }
  }, []);

  return contract;
}