import { Link, useLocation } from 'react-router-dom';

import headerUserIcon from '../../../assets/images/headerUserIcon.png';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './accountpage.module.scss';

export default function AccountPage() {
  const location = useLocation();

  return (
    <Link
      className={styles.accountBtn}
      to={`/${getSelectedChainFromBase(location.pathname)}/account`}
    >
      <img src={headerUserIcon} className={styles.headerUserIcon} />
      <div className={styles.hoverEffect}></div>
    </Link>
  );
}
