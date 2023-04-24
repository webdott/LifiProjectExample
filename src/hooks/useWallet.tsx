import { useState } from 'react';

export default function useWallet() {
  const [wallet, setWallet] = useState('disconnected');

  const connectWallet = () => {
    setWallet('connected');
  };

  return {
    wallet,
    connectWallet,
  };
}
