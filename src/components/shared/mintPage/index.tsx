import { useEffect, useState } from 'react';

import { SidebarButtonsText } from '../../../constants/sidebar';
import Button from '../button';
import { ButtonType } from '../button/type';
import CheckerLayout from '../../../layout/GxpPage';

import styles from './mint.module.scss';

const MintVideo = require('../../../public/video/MintVideo.mp4');

export default function Mint() {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  useEffect(() => {
    setPlayVideo(!!(window.innerWidth > 800));
  }, []);

  return (
    <CheckerLayout>
      <div className={styles.mint}>
        <div className={styles.mintTitle}>Mint your Bowtie</div>
        <div className={styles.mintDiscription}>
          <p>Gamblr Membership NFT </p>
          <span>
            An infinitely unique 3D generative NFT that grants the user access to various benefits
            and exclusive communities throughout the Gamblr ecosystem as you level up your NFT from
            1-100.
          </span>
          <span>
            As you level up using GXP, each NFT's metadata is revealed to show your truly unique
            Gamblr Bowtie. GXP is earned through using the site and completing the daily quests in
            the "GXP" section.
          </span>
          <span>
            Each user that connects their wallet can mint one of these unique Gamblr Membership NFTs
            for free!
          </span>
        </div>
        <div className={styles.mintImg}>
          <video src={MintVideo} autoPlay={playVideo} />
        </div>
        <Button btnType={ButtonType.membershipButton} text={SidebarButtonsText.MINT} />
      </div>
    </CheckerLayout>
  );
}
