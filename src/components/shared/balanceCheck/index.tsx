import { Modal } from "antd";
import React, { useState } from "react";
import Button from "../button";
import { ButtonType } from "../button/type";
import { SidebarButtonsText } from "../../../constants/sidebar";
import headerWalletIcon from "../../../assets/images/headerWalletIcon.png";

import styles from "./balancecheck.module.scss";

const BalanceCheck: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal} className={styles.balanceCheckBtn}>
        <span>$3202</span>
        <img src={headerWalletIcon} />
        <div className={styles.hoverEffect}></div>
      </div>
      <Modal
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
      </Modal>
    </>
  );
};

export default BalanceCheck;
