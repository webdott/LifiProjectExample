import { useNavigate } from 'react-router';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './getxdai.module.scss';

export default function GetXDAIPage() {
  const navigate = useNavigate();

  return (
    <GetFundsLayout token='XDAI'>
      <div className={styles.getXdai}>
        <div className={styles.options}>
          <div className={styles.option}>
            <p className={styles.title}>Buy with Crypto</p>
            <p className={styles.subText}>Fantastic! Just exchange your tokens for XDAI or bridge them to the Gnosis chain.</p>
            <Button
              onClick={() => navigate('/gnosis/get-funds/buy-with-crypto')}
              className={styles.buyButton}
              btnType={ButtonType.membershipButton}
              text='Buy with crypto'
            />
          </div>

          <div className={styles.option}>
            <p className={styles.title}>Buy with Card</p>
            <p className={styles.subText}>No problem! You can easily get crypto by using your credit or debit card</p>
            <Button
              onClick={() => navigate('/gnosis/get-funds/buy-with-card')}
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
