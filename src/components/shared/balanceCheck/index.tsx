import React, { useState } from "react";

import headerWalletIcon from "../../../assets/images/headerWalletIcon.png";
import WalletBalance from "../../featured/walletBalances";

import styles from "./balancecheck.module.scss";

const BalanceCheck: React.FC = () => {
	const [showWalletBalance, setShowWalletBalance] = useState<boolean>(false);

  return (
    <div className={styles.balanceCheckContainer}>
      <div onClick={() => setShowWalletBalance(showWalletBalance => !showWalletBalance)} className={styles.balanceCheckBtn}>
        <span>$3202</span>
        <img src={headerWalletIcon} />
        <div className={styles.hoverEffect}></div>
      </div>

      {showWalletBalance && (
        <WalletBalance closeWalletBalance={() => setShowWalletBalance(false)}/>
      )}
      {/* <Modal
        footer={null}
        title="Balance"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className={styles.balanceCheckContainer}>
          <span className={styles.containerText}>GXP:000</span>
          <span className={styles.containerText}>Total GXP earned:000</span>
          <span className={styles.containerText}>Available GXP:000</span>
          <span className={styles.containerText}>GXP multiplier:000</span>
          <Button btnType={ButtonType.claim} text={SidebarButtonsText.GXP} />
        </div>
      </Modal> */}
    </div>
  );
};

export default BalanceCheck;
