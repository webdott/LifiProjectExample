import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import CircularProgress from '@mui/material/CircularProgress';

import Modal from '../modal';

import './modalStyles.scss';
import styles from './buywithcardmodal.module.scss';

export default function BuyWithCardModal({
  visible,
  close,
  base64Hash,
}: {
  visible: boolean;
  close: () => void;
  base64Hash: string | undefined;
}): JSX.Element {
  const { address } = useAccount();
  const { selectedChain } = useParams();

  const network: string = selectedChain === 'polygon' ? 'matic%5Fmainnet' : 'xdai%5Fmainnet';
  const chainSelected: string =
    selectedChain === 'polygon' ? 'polygon%5Fmainnet' : 'xdai%5Fmainnet';
  const bdc: string = selectedChain === 'polygon' ? 'USDT' : 'XDAI';
  const crys: string = selectedChain === 'polygon' ? 'USDT,MATIC' : 'XDAI';

  return (
    <Modal title='' onCancel={close} isModalVisible={visible} closable={false}>
      <div className={styles.container}>
        {base64Hash ? (
          <iframe
            title='mt-pelerin-iframe'
            allow='usb; ethereum; clipboard-write'
            src={`https://widget.mtpelerin.com/?lang=en&tab=buy&tabs=buy&type=web&primary=%2305a56c&success=%2305a56c&mode=dark&mylogo=https://raw.githubusercontent.com/webdott/customHooks-and-Functions/master/gamblr.xyz.png&chain=${chainSelected}&net=${network}&nets=${network}&bsc=USD&bdc=${bdc}&crys=${crys}&addr=${address}&hash=${base64Hash}`}
            className={styles.rampWidget}
          />
        ) : (
          <CircularProgress sx={{ color: '#05a56c' }} />
        )}
      </div>
    </Modal>
  );
}
