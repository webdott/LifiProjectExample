import { useState, useEffect } from "react";
import Button from "../../shared/button";
import WalletModal from "./../../shared/walletModal";
import { HeaderButtonText, navbar } from "../../../constants/navbar";
import { ButtonType } from "../../shared/button/type";
import { useNavigate } from "react-router-dom";
import CheckBalance from "../../shared/balanceCheck";
import Transactions from "../../shared/transactions";
import GamblrXYZLogo from "../../shared/logo";
import AccountPage from "../accountPage";
import { NavLink } from "react-router-dom";
import ConnetedUser from "./../connectedUser";
import { useMetaMask } from "metamask-react";
import { ToastContainer } from "react-toastify";
import disableWalletIcon from "../../../assets/images/disableWalletIcon.png";
import activeWalletIcon from "../../../assets/images/activeWalletIcon.png";

import styles from "./header.module.scss";

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [netState, setNetState] = useState<boolean>(true);
  const [isMetamask, setIsMetamask] = useState<boolean>(false);
  const [NeterrorWin, setNeterrorWin] = useState<string>("block");
  const walletStatus = window.location.href.split("/")[5];

  const { status } = useMetaMask();

  const [walletIcon, setWalletIcon] = useState(disableWalletIcon);

  const visible = () => {
    setShowModal(!showModal);
  };

  const Neterror = () => {
    setNeterrorWin("none");
  };

  const close = () => {
    setShowModal(showModal);
  };

  const ToHomepage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (walletStatus === "connected") {
      setShowWallet(true);
    } else {
      setShowWallet(false);
    }
  }, [walletStatus]);
  const onChangeNet = (val: boolean) => {
    setNetState(val);
  };
  const SwitchNetwork = async () => {
    setNetState(true);
    const toHex = (num: number) => {
      return "0x" + num.toString(16);
    };
    const params = {
      chainId: toHex(100),
      chainName: "Gnosis",
      nativeCurrency: {
        name: "GNO",
        symbol: "xDAI",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.gnosischain.com"],
      blockExplorerUrls: ["https://gnosisscan.io"],
    };
    let accounts = (window as any).ethereum.request({ method: "eth_accounts" });

    await (window as any).ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x64" }],
      })
      .then((e: any) => {})
      .catch(async (switchError: any) => {
        await (window as any).ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [params, accounts[0]],
          })
          .then(() => {
            console.log("success");
          })
          .catch(() => {
            console.log("error");
          });
      });
  };

  return (
    <div>
      <ToastContainer theme="dark" />
      {!netState && (
        <div
          className={styles.netState}
          style={{
            padding: "12px",
            backgroundColor: "#E1D7CA",
            color: "white",
            display: NeterrorWin,
          }}
        ></div>
      )}

      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeftSection}>
            <div className={styles.headerLogo}>
              <span>
                <GamblrXYZLogo />
              </span>
            </div>
            <ul className={styles.headerNav}>
              {navbar.map((navItem, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : `${styles.navLink} `
                  }
                  to={`${navItem.path}`}
                >
                  {navItem.name}
                  {navItem.name === "Membership" ? (
                    <div className={styles.soonIcon}>Soon</div>
                  ) : (
                    ""
                  )}
                  <div className={styles.hoverEffect}></div>
                </NavLink>
              ))}
            </ul>
          </div>

          {showWallet ? (
            <div className={styles.walletModal}>
              {isMetamask ? (
                <div className={styles.walleteNavItems}>
                  <ConnetedUser DisconnectWallet={setIsMetamask} />
                </div>
              ) : (
                <Button
                  text={HeaderButtonText.Connect_Wallet}
                  btnType={ButtonType.small}
                  onClick={visible}
                />
              )}
              {showModal && (
                <WalletModal
                  hide={close}
                  onChangeNet={setNetState}
                  visible={showModal}
                  close={visible}
                  ConnectWallet={setIsMetamask}
                />
              )}
            </div>
          ) : (
            <div className={styles.headerRightSection}>
              {status === "connected" ? (
                <>
                  <CheckBalance /> <AccountPage />
                  {/* <Transactions /> */}
                </>
              ) : (
                <div
                  onMouseEnter={() => setWalletIcon(activeWalletIcon)}
                  onMouseLeave={() => setWalletIcon(disableWalletIcon)}
                  className={styles.connectWalletBtn}
                  onClick={visible}
                >
                  <div className={styles.hoverEffect}></div>
                  <img
                    alt="walletIcon"
                    src={walletIcon}
                    className={styles.connectWalletIcon}
                  />
                  <span>{HeaderButtonText.Connect_Wallet}</span>
                </div>
              )}
              {showModal && (
                <WalletModal
                  hide={close}
                  onChangeNet={setNetState}
                  visible={showModal}
                  close={visible}
                  ConnectWallet={setIsMetamask}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
