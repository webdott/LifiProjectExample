import { useAccount, useNetwork } from 'wagmi';

import Modal from '../modal';
import { CHAIN_IDS } from '../../../constants/wallet';

import './modalStyles.scss';
import styles from './buywithcardmodal.module.scss';

export default function BuyWithCardModal({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}): JSX.Element {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const network: string = chain?.id === CHAIN_IDS.POLYGON ? 'matic%5Fmainnet' : 'xdai%5Fmainnet';
  const selectedChain: string =
    chain?.id === CHAIN_IDS.POLYGON ? 'polygon%5Fmainnet' : 'xdai%5Fmainnet';
  const bdc: string = chain?.id === CHAIN_IDS.POLYGON ? 'USDT' : 'XDAI';
  const crys: string = chain?.id === CHAIN_IDS.POLYGON ? 'USDT,MATIC' : 'XDAI';

  return (
    <Modal title='' onCancel={close} isModalVisible={visible} closable={false}>
      <div className={styles.container}>
        <iframe
          title='mt-pelerin-iframe'
          allow='usb; ethereum; clipboard-write'
          src={`https://widget.mtpelerin.com/?lang=en&tab=buy&tabs=buy&type=web&primary=%2305a56c&success=%2305a56c&mode=dark&mylogo=%2E%2Ficons%2Fgamblr.xyz.png&chain=${selectedChain}&net=${network}&nets=${network}&bsc=USD&bdc=${bdc}&crys=${crys}&addr=${address}`}
          className={styles.rampWidget}
        />
      </div>
    </Modal>
  );
}
