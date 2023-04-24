import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { HeaderButtonText } from '../../../constants/navbar';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './username.module.scss';

const UserNameModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameText, setUsernameText] = useState<string>('');
  const [username, setUsername] = useState<string>('username');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const saveUsername = () => {
    if (usernameText === '') {
      setUsername('username');
    } else {
      setUsername(usernameText);
    }
    handleCancel();
  };

  return (
    <>
      <div className={styles.usernameButton} onClick={showModal}>
        {username}
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className={styles.modalContent}>
          <Input
            onChange={(e) => setUsernameText(e.target.value)}
            className={styles.input}
            placeholder='Username'
          />
          <Button btnType={ButtonType.medium} text={HeaderButtonText.Save} onClick={saveUsername} />
        </div>
      </Modal>
    </>
  );
};

export default UserNameModal;
