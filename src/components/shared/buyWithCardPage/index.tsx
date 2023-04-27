import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNetwork } from 'wagmi';

import GetFundsLayout from '../../../layout/GetFundsLayout';
import { CHAIN_IDS } from '../../../constants/wallet';
import BuyWithCardModal from '../buyWithCardModal';
import MTPELERIN from '../../../assets/images/mt_pelerin.svg';
import usePelerinSigner from '../../../hooks/usePelerinSigner';

import styles from './buywithcard.module.scss';

export default function BuyWithCardPage() {
  const { chain } = useNetwork();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { base64Hash, isErrorSigning, getSignature } = usePelerinSigner();

  useEffect(() => {
    if (isErrorSigning) {
      toast.error('Error signing message');
      setShowModal(false);
    }
  }, [isErrorSigning]);

  return (
    <GetFundsLayout token={chain?.id === CHAIN_IDS.POLYGON ? 'USDT' : 'XDAI'}>
      <div className={styles.buyCrypto}>
        <div className={styles.options}>
          <div className={styles.header}>Buy With Card</div>
          <div className={styles.buyCryptoContent}>
            <div
              className={styles.toast}
              onClick={() => {
                setShowModal(true);
                getSignature();
              }}
            >
              <img
                alt='fiat provider logo'
                srcSet={`${MTPELERIN} 1x, ${MTPELERIN} 2x'
                  src='${MTPELERIN}`}
                width='84'
                height='20'
                decoding='async'
                data-nimg='future'
                className={styles.fiatProvider}
                loading='lazy'
              />
              <div className={styles.commisionDetails}>
                <p>Commission: 2.5% + 1.20 CHF. Minimum fee: 1.20 CHF.</p>
                <p>
                  Delivery time: 10 min - 1 hour. Accepts only cards issued in the Europe region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <BuyWithCardModal
          visible={showModal}
          close={() => setShowModal(false)}
          base64Hash={base64Hash}
        />
      )}
    </GetFundsLayout>
  );
}
