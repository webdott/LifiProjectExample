import { useEffect, useState } from "react";
import { HeaderButtonText } from "../../../constants/navbar";
import Button from "../button";
import { ButtonType } from "../button/type";
import Modal from "../modal";
import { WalletModalProps } from "./type";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useMetaMask } from "metamask-react";
import { ToastContainer, toast } from "react-toastify";
import connectWalletIcon from "../../../assets/images/connectWalletIcon.png";
import metamaskIcon from "../../../assets/images/metamaskIcon.png";
import walletIcon from "../../../assets/images/walletIcon.png";

import "react-toastify/dist/ReactToastify.css";
import "./modalStyles.scss";
import styles from "./walletModal.module.scss";

export default function WalletModal({
  hide,
  visible,
  onChangeNet,
  ConnectWallet,
  close,
}: WalletModalProps): JSX.Element {
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  useEffect(() => {
    if ((window as any).ethereum) {
      setIsMetamaskInstalled(true);
    }
  }, []);

  const { status, chainId, switchChain, addChain, connect } = useMetaMask();

  async function ConnectWalletconnect(): Promise<void> {
    close();
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    if (!connector.connected) {
      connector.createSession();
    }
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
    });
    connector.on("session_update", (error, payload) => {});
    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
    });
  }

  const metamaskSuccessNotify = (text: string) => {
    toast.success(<span>{text}</span>);
  };

  const downloadMetamaskNotify = () => {
    toast.warn(
      <span>
        Please download
        <a href="https://metamask.io/download/" target="_blank">
          Metamask
        </a>
      </span>
    );
  };

  const addMetamaskNetwork = async () => {
    const gnosisChainNetworkParams = {
      chainId: "0x64",
      chainName: "Gnosis Chain",
      rpcUrls: ["https://rpc.gnosischain.com/"],
      nativeCurrency: {
        name: "xDAI",
        symbol: "xDAI",
        decimals: 18,
      },
      blockExplorerUrls: ["https://blockscout.com/xdai/mainnet/"],
    };
    await addChain(gnosisChainNetworkParams);
    metamaskSuccessNotify("Network successfully added");
    connect();
  };

  const addMetamaskNetworkNotify = () => {
    toast.warn(
      <span>
        You don't have Gnosis Chain network, please{" "}
        <span onClick={addMetamaskNetwork} className={styles.notifySwitchBtn}>
          click
        </span>{" "}
        to add
      </span>
    );
  };
  const changeMetamaskNetwork = async () => {
    try {
      await switchChain("0x64");
      metamaskSuccessNotify("Network successfully switched to Gnosis Chain");
    } catch (error: any) {
      if (error.code === 4902) {
        addMetamaskNetworkNotify();
      }
    }
  };

  const switchNetworkNotify = () =>
    toast.warn(
      <span>
        Wrong network,please{" "}
        <span
          className={styles.notifySwitchBtn}
          onClick={changeMetamaskNetwork}
        >
          switch
        </span>{" "}
        to Gnosis
      </span>
    );

  const connectMetamask = async () => {
    if (status === "unavailable") {
      downloadMetamaskNotify();
    } else if (chainId !== "0x64") {
      switchNetworkNotify();
    } else {
      await connect();
    }
    close();
  };

  return (
    <Modal title="" onCancel={close} isModalVisible={visible} closable={false}>
      <div className={styles.container}>
        <div className={styles.walletSection}>
          <img src={connectWalletIcon} className={styles.walletModalImg} />
          <span className={styles.modalTitle}>Connect Wallet</span>
          <span className={styles.modalDescription}>
            Please, connect wallet to start using gamblr.XYZ
          </span>
          <div className={styles.walletButton}>
            <Button
              icon={walletIcon}
              text={HeaderButtonText.Wallet_Connect}
              btnType={ButtonType.walletButton}
              onClick={ConnectWalletconnect}
            />
            <Button
              icon={metamaskIcon}
              text={HeaderButtonText.Metamask_Wallet}
              btnType={ButtonType.walletButton}
              onClick={connectMetamask}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
