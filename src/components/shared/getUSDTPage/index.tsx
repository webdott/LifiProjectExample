import { useNavigate } from 'react-router';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './getusdt.module.scss';

export default function GetUSDTPage() {
  const navigate = useNavigate();
  return (
    <GetFundsLayout token='USDT'>
      <div className={styles.getUsdt}>
        <div className={styles.options}>
          <div className={styles.option}>
            <p className={styles.title}>Buy with Crypto</p>

            <p className={styles.subText}>
              Fantastic! Just exchange your tokens for USDT/MATIC and/or transfer them to the
              Polygon Mainnet.
            </p>
            <Button
              onClick={() => navigate('/polygon/buy-with-crypto')}
              className={styles.buyButton}
              btnType={ButtonType.membershipButton}
              text='Buy with crypto'
            />
          </div>

          <div className={styles.option}>
            <p className={styles.title}>Buy with Card</p>
            <p className={styles.subText}>Use your debit or credit card to get crypto.</p>
            <Button
              onClick={() => navigate('/polygon/buy-with-card')}
              className={styles.buyButton}
              btnType={ButtonType.membershipButton}
              text='Buy with card'
            />
          </div>
        </div>
      </div>
    </GetFundsLayout>
  );
}
