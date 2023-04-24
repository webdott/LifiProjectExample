import { GiPadlock } from 'react-icons/gi';
import Button from '../../components/shared/button';
import { ButtonType } from '../../components/shared/button/type';
import { message, message404, messagesCounty } from '../../constants/404';
import { HeaderButtonText } from '../../constants/navbar';
import { socialMedia, SocialProps } from '../../constants/social';

import styles from './error404.module.scss';

export default function Error404(): JSX.Element {
  return (
    <div className={styles.container}>
      {/* <div
				className={styles.headerLogo}
				style={{ cursor: 'pointer' }}
				onClick={ToHomepage}>
				<img src={logo} width={80} height={80} alt='Logo' />
			</div> */}
      <div className={styles.mainSection}>
        <div className={styles.mainLogo}>
          <GiPadlock size={80} />
        </div>
        <span className={styles.title}>Geo zone restriction</span>
        <div className={styles.message}>
          <span>{message404}</span>
          <span>{messagesCounty}</span>
        </div>
        <span>{message}</span>
      </div>
      <div className={styles.socialLinks}>
        <Button
          className={styles.discord}
          btnType={ButtonType.medium}
          text={HeaderButtonText.Link_Discord}
        />
        <div className={styles.img}>
          {socialMedia?.map((e: SocialProps, index: number) => (
            <div key={index} className={styles.media}>
              <a href={e.isMail ? `mailto:${e.link}` : e.link}>
                <img src={e.icon} width={25} height={25} alt='Logo' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
