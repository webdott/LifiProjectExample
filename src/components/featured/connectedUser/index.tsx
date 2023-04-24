import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Avatar from '@mui/material/Avatar';
import styles from './connected.module.scss';
import AvatarProfile from './../../../assets/images/avatar.png';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import betIcon from './../../../assets/images/bet.png';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

interface funcProps {
  DisconnectWallet: (st: boolean) => void;
}
function ConnetedUser({ DisconnectWallet }: funcProps): JSX.Element {
  const { copyToClipboard } = useCopyToClipboard();

  const [disconnect, setDisconnect] = useState<boolean>(false);

  const toggleDropDown = () => {
    setDisconnect((prev: boolean) => !prev);
  };

  const disconnectWallet = () => {
    DisconnectWallet(false);
  };
  return (
    <div className={styles.userAccount}>
      <div className={styles.userAccountContainer} onClick={toggleDropDown}>
        <IconButton className={styles.profileButton} size='small'>
          <Avatar src={AvatarProfile} sx={{ width: 25, height: 25 }} />
        </IconButton>

        {disconnect ? (
          <ArrowDropUpIcon className={styles.arrowIcon} />
        ) : (
          <ArrowDropDownIcon className={styles.arrowIcon} />
        )}
      </div>
      {disconnect && (
        <div className={styles.disconnectModal}>
          <button>
            0X1123...FFFXYZ
            <OpenInNewIcon className={styles.btnIcon} />
            <ContentCopyIcon
              className={styles.btnIcon}
              onClick={() => copyToClipboard('0X1123...FFFXYZ')}
            />
          </button>
          <button>
            <img src={betIcon} alt='bet icon' />
            My Bets
          </button>
          <button onClick={disconnectWallet}>
            <LogoutIcon className={styles.btnIcon} />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnetedUser;
