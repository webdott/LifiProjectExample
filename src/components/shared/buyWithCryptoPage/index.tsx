import { useNetwork } from 'wagmi';
import GetFundsLayout from '../../../layout/GetFundsLayout';

import { CHAIN_IDS } from '../../../constants/wallet';

import styles from './buywithcrypto.module.scss';

export default function BuyWithCryptoPage() {
  const { chain } = useNetwork();

  return (
    <GetFundsLayout token={chain?.id === CHAIN_IDS.POLYGON ? 'USDT' : 'XDAI'}>
      <div className={styles.buyCrypto}>
        <div className={styles.options}>
          <div className={styles.header}>Buy With Crypto</div>
          <div className={styles.toast}>
            <p>Commission: 2.5% + 1.20 CHF. Minimum fee: 1.20 CHF.</p>
            <p>Delivery time: 10 min - 1 hour. Accepts only cards issued in the Europe region.</p>
          </div>
        </div>
      </div>
    </GetFundsLayout>
  );
}
