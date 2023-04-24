import { useNavigate } from 'react-router';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './getusdc.module.scss';

export default function GetUSDCPage() {
  const navigate = useNavigate();
  return (
    <GetFundsLayout token='USDC'>
      <div className={styles.getUsdc}>
        <div className={styles.options}>
          <div className={styles.option}>
            <p className={styles.title}>Buy with Crypto</p>

            <p className={styles.subText}>
              Fantastic! Just exchange your tokens for USDC/MATIC and/or transfer them to the
              Polygon Mainnet.
            </p>
            <Button
              onClick={() => navigate('/buy-with-crypto')}
              className={styles.buyButton}
              btnType={ButtonType.membershipButton}
              text='Buy with crypto'
            />
          </div>

          <div className={styles.option}>
            <p className={styles.title}>Buy with Card</p>
            <p className={styles.subText}>Use your debit or credit card to get crypto.</p>
            <Button
              onClick={() => navigate('/buy-with-card')}
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
