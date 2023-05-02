import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  officialContract,
  OfficialContractProps,
  privacy,
  PrivacyLinkProps,
} from '../../../constants/footer';
import { socialMedia, SocialProps } from '../../../constants/social';
import GamblrXYZLogo from '../../shared/logo';
import editIcon from '../../../assets/images/editIcon.png';
import { getTruncatedAddress } from '../../../functions';

import styles from './footer.module.scss';

export default function Footer(): JSX.Element {
  const { selectedChain } = useParams();
  const [activeIcon, setActiveIcon] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <GamblrXYZLogo />
          </div>
          <div className={styles.social}>
            {socialMedia?.map((e: SocialProps, index: number) => (
              <div key={index} className={styles.media}>
                <a
                  onMouseEnter={() => setActiveIcon(index)}
                  onMouseLeave={() => setActiveIcon(null)}
                  href={e.isMail ? `mailto:${e.link}` : e.link}
                >
                  <img
                    src={activeIcon === index ? e.activeIcon : e.icon}
                    width={20}
                    height={30}
                    alt='social icon'
                  />
                  <div className={styles.hoverEffect}></div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.disclaimer}>
          <span>
            {' '}
            <span>gamblr.xyz</span> is a unique betting service built directly on the blockchain. At{' '}
            <span>gamblr.xyz</span> there is no company or "House" that bets against you or ever
            holds any of your funds. Everything is run through smart contracts powered by Azuro - a
            decentralized blockchain ecosystem that makes this all possible so you can bet freely
            while still being fully in control of your own funds.
          </span>
        </div>

        <div className={styles.contracts}>
          <div className={styles.contractsTitle}>
            <img src={editIcon} alt='' />
            <span>Official Contracts</span>
          </div>
          <div className={styles.officialSection}>
            <div className={styles.leftSection}>
              {officialContract?.map((e: OfficialContractProps, index: number) => (
                <div className={styles.betSection} key={index}>
                  <div className={styles.bet}>
                    <span>{e.bet}:</span>
                  </div>
                  <a
                    href={e.wallets?.[selectedChain === 'polygon' ? 'poly' : 'gnosis'].link ?? '#'}
                    target='_blank'
                    rel='noreferrer'
                    className={styles.wallet}
                  >
                    <span>
                      {getTruncatedAddress(
                        e.wallets?.[selectedChain === 'polygon' ? 'poly' : 'gnosis'].wallet
                      )}
                    </span>
                  </a>
                </div>
              ))}
            </div>

            <div className={styles.privacyLinks}>
              {privacy?.map((item: PrivacyLinkProps, index: number) => (
                <a href={item.link} key={index}>
                  <span key={index}>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyRight}>
          <span>©2022 gamblr.xyz</span>
        </div>
      </div>
    </div>
  );
}
