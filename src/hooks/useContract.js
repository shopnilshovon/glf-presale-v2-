import { useMemo } from "react";
import { ethers } from "ethers";
import PresaleABI from "../abis/PresaleABI.json";

export const useContract = (contractAddress) => {
  return useMemo(() => {
    if (!window.ethereum) return null;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, PresaleABI, signer);

    return contract;
  }, [contractAddress]);
};