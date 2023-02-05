export interface WalletModalProps {
  visible: boolean;
  hide: () => void;
  onChangeNet: (st: boolean) => void;
  ConnectWallet: (st: boolean) => void;
  close: () => void;
}
