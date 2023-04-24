export interface WalletProps {
  wallet?: string;
  connectWallet?: () => void;
}

export const CHAIN_IDS = {
  POLYGON: 137,
  GNOSIS: 100,
};
