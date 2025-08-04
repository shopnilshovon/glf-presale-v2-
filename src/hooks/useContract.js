import { useMemo } from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";
import { PRESALE_CONTRACT_ADDRESS } from "../utils/constants";

export const useContract = () => {
  return useMemo(() => {
    if (typeof window === "undefined" || !window.ethereum) return null;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(PRESALE_CONTRACT_ADDRESS, ABI, signer);
  }, []);
};