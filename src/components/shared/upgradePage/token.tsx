import { FC, useEffect, useState } from 'react';

import { GxpTokenType } from '../../../constants/upgradeGxp';
import { SidebarButtonsText } from '../../../constants/sidebar';
import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './upgrade.module.scss';

interface TokenProps {
  token: GxpTokenType;
}

const Token: FC<TokenProps> = ({ token }) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  useEffect(() => {
    setPlayVideo(!!(window.innerWidth > 800));
  }, []);

  return (
    <div className={styles.gxpToken}>
      <div className={styles.tokenId}>{token.id}</div>
      <div className={styles.upgradeImg}>
        <video
          src={token.urlSrc}
          autoPlay={playVideo}
          poster='/assets/images/nft-video-poster.png'
        />
      </div>
      <div className={styles.pointsSection}>
        <span className={styles.level}>
          Level <span>{token.level}</span>
        </span>
        <span className={styles.pointsUpgrade}>
          Points to upgrade <span>{token.gxpToUpgrade}</span>
        </span>
        <Button text={SidebarButtonsText.UPGRADE} btnType={ButtonType.membershipButton} />
      </div>
    </div>
  );
};

export default Token;
