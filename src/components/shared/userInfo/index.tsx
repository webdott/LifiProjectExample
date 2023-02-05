import Upload from "../uploadPhoto/Upload";
import { WalletProps } from "./../../../constants/wallet";
import walletIcon from "../../../assets/images/buttonWalletIcon.png";
import copyIcon from "../../../assets/images/copyIcon.png";
import { useMetaMask } from "metamask-react";
import viewIcon from "../../../assets/images/viewIcon.png";

import styles from "./userInfo.module.scss";

export default function UserInfo(props: WalletProps): JSX.Element {
  const { account } = useMetaMask();
  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <Upload />
        <div className={styles.user}>
          <div className={styles.username}>Username</div>
          <div className={styles.bottomSection}>
            <div className={styles.walletAddress}>
              <img src={walletIcon} />
              <span>
                {account
                  ? account.length > 8
                    ? account.substring(0, 4) +
                      "..." +
                      account.substring(account.length - 4, account.length)
                    : account
                  : ""}
              </span>{" "}
              <img src={copyIcon} />
            </div>
            <div className={styles.viewBtn}>
              <img src={viewIcon} />
              <span>View on Explorer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
