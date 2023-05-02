import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Tooltip from '@mui/material/Tooltip';

import Upload from '../uploadPhoto/Upload';
import { WalletProps } from './../../../constants/wallet';
import walletIcon from '../../../assets/images/buttonWalletIcon.png';
import copyIcon from '../../../assets/images/copyIcon.png';
import viewIcon from '../../../assets/images/viewIcon.png';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

import styles from './userInfo.module.scss';

export default function UserInfo(props: WalletProps): JSX.Element {
  const { address } = useAccount();
  const { selectedChain } = useParams();
  const { copyToClipboard, feedback } = useCopyToClipboard();

  const baseNetworkUrl =
    selectedChain === 'polygon' ? 'https://polygonscan.com' : 'https://gnosisscan.io';

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <Upload />
        <div className={styles.user}>
          <div className={styles.username}>Username</div>
          <div className={styles.bottomSection}>
            <div className={styles.walletAddress}>
              <img src={walletIcon} />
              <span>
                {address
                  ? address.length > 8
                    ? address.substring(0, 4) +
                      '...' +
                      address.substring(address.length - 4, address.length)
                    : address
                  : ''}
              </span>{' '}
              <Tooltip title={feedback.length > 0 ? feedback : 'Copy address'} placement='top'>
                <img
                  src={copyIcon}
                  alt='copy address'
                  onClick={() => copyToClipboard(address ?? '')}
                />
              </Tooltip>
            </div>
            <a
              href={`${baseNetworkUrl}/address/${address}`}
              target='_blank'
              rel='noreferrer'
              className={styles.viewBtn}
            >
              <img src={viewIcon} />
              <span>View on Explorer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
