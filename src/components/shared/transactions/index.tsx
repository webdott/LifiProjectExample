import { Modal } from "antd";
import React, { useState } from "react";

import styles from "./transactions.module.scss";

const Transactions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal} className={styles.transactionsBtn}></div>
      <Modal
        footer={null}
        title="Balance"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className={styles.transactionsContainer}>No transactions</div>
      </Modal>
    </>
  );
};

export default Transactions;
