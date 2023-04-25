import { useNavigate } from 'react-router';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './buycrypto.module.scss';

export default function BuyCryptoPage() {
  const navigate = useNavigate();
  return (
    <GetFundsLayout token='USDC'>
      <div className={styles.buyCrypto}>
        <div className={styles.options}>
          <div className={styles.header}>Buy Crypto</div>
          <div className={styles.toast}>
            <p>Commission: 2.5% + 1.20 CHF. Minimum fee: 1.20 CHF.</p>
            <p>Delivery time: 10 min - 1 hour. Accepts only cards issued in the Europe region.</p>
          </div>
        </div>
      </div>
    </GetFundsLayout>
  );
}
