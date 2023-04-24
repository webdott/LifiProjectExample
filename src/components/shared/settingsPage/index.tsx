import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import settingsIcon from '../../../public/images/settingsIcon.png';

import styles from './settings.module.scss';
import 'antd/dist/antd.css';

const items: MenuProps['items'] = [
  {
    label: <div className={styles.settingsContainer}>Settings</div>,
    key: '0',
  },
];

const SettingsPage: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <div onClick={(e: any) => e.preventDefault()} className={styles.settingsIcon}>
      <img src={settingsIcon} />
    </div>
  </Dropdown>
);

export default SettingsPage;
