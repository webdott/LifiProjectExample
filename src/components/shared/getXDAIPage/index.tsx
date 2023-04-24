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
            <p className={styles.subText}>Just swap your tokens to XDAI and/or bridge them in.</p>
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
