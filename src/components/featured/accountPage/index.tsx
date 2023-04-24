import { Link } from 'react-router-dom';
import headerUserIcon from '../../../assets/images/headerUserIcon.png';

import styles from './accountpage.module.scss';

export default function AccountPage() {
  return (
    <Link className={styles.accountBtn} to='/account'>
      <img src={headerUserIcon} className={styles.headerUserIcon} />
      <div className={styles.hoverEffect}></div>
    </Link>
  );
}
