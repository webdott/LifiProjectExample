import { Token } from '@lifi/sdk';
import {
  LiFiWalletManagement,
  Wallet,
  readActiveWallets,
  supportedWallets,
} from '@lifi/wallet-management';
import { Signer } from 'ethers';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface WalletContextProps {
  account: WalletAccount;
  usedWallet?: Wallet;
  addChain(chainId: number): Promise<boolean>;
  addToken(chainId: number, token: Token): Promise<void>;
  disconnect(): void;
  switchChain(chainId: number): Promise<boolean>;
  connect(wallet?: Wallet | undefined): Promise<void>;
}

interface WalletAccount {
  address?: string;
  isActive?: boolean;
  signer?: Signer;
  chainId?: number;
}

const liFiWalletManagement = new LiFiWalletManagement();

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <WalletProvider>.');
};

export const initialContext: WalletContextProps = {
  connect: stub,
  disconnect: stub,
  switchChain: stub,
  addChain: stub,
  addToken: stub,
  account: {},
};

const WalletContext = createContext<WalletContextProps>(initialContext);

export const useWallet = (): WalletContextProps => React.useContext(WalletContext);

export const WalletProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [account, setAccount] = useState<WalletAccount>({});
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>();

  // autoConnect
  useEffect(() => {
    const autoConnect = async () => {
      const persistedActiveWallets = readActiveWallets();
      const activeWallets = supportedWallets.filter((wallet) =>
        persistedActiveWallets.some((perstistedWallet) => perstistedWallet.name === wallet.name)
      );
      if (!activeWallets.length) {
        return;
      }
      await liFiWalletManagement.autoConnect(activeWallets);
      activeWallets[0].on('walletAccountChanged', handleWalletUpdate);
      handleWalletUpdate(activeWallets[0]);
    };
    autoConnect();
  }, []);

  const handleWalletUpdate = async (wallet?: Wallet) => {
    setCurrentWallet(wallet);
    const account = await extractAccountFromSigner(wallet?.account?.signer);
    setAccount(account);
  };

  const connect = useCallback(async (wallet: Wallet) => {
    await liFiWalletManagement.connect(wallet);
    wallet.on('walletAccountChanged', handleWalletUpdate);

    handleWalletUpdate(wallet);
  }, []);

  const disconnect = useCallback(async () => {
    if (currentWallet) {
      await liFiWalletManagement.disconnect(currentWallet);
      currentWallet.removeAllListeners();
      handleWalletUpdate(undefined);
    }
  }, [account, currentWallet]);

  const switchChain = useCallback(
    async (chainId: number) => {
      try {
        await currentWallet?.switchChain(chainId);
        handleWalletUpdate(currentWallet);
        return true;
      } catch {
        return false;
      }
    },
    [currentWallet]
  );

  const addChain = useCallback(
    async (chainId: number) => {
      try {
        await currentWallet?.addChain(chainId);
        handleWalletUpdate(currentWallet);
        return true;
      } catch {
        return false;
      }
    },
    [currentWallet]
  );

  const addToken = useCallback(
    async (chainId: number, token: Token) => {
      await currentWallet?.addToken(chainId, token);
      handleWalletUpdate(currentWallet);

      return;
    },
    [currentWallet]
  );

  const value = useMemo(
    () => ({
      connect,
      disconnect,
      switchChain,
      addChain,
      addToken,
      account,
      usedWallet: currentWallet,
    }),
    [account, addChain, addToken, connect, disconnect, switchChain, currentWallet]
  );

  return <WalletContext.Provider value={value}> {children} </WalletContext.Provider>;
};

const extractAccountFromSigner = async (signer?: Signer) => {
  try {
    return {
      address: (await signer?.getAddress()) || undefined,
      isActive: (signer && !!(await signer.getAddress()) === null) || !!signer,
      signer,
      chainId: (await signer?.getChainId()) || undefined,
    };
  } catch {
    return {} as WalletAccount;
  }
};
