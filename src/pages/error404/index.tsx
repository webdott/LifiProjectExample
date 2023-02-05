import { Navigate } from 'react-router-dom'
import Button from '../../components/shared/button'
import { ButtonType } from '../../components/shared/button/type'
import { message, message404, messagesCounty } from '../../constants/404'
import { HeaderButtonText } from '../../constants/navbar'
import { socialMedia, SocialProps } from '../../constants/social'
import logo from '../../public/icons/logoDefault.png'

import styles from './error404.module.scss'
import { useNavigate } from 'react-router-dom'

export default function Error404(): JSX.Element {
  const navigate = useNavigate()
  const ToHomepage = () => {
    navigate('/')
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.headerLogo}
        style={{ cursor: 'pointer' }}
        onClick={ToHomepage}
      >
        <img src={logo} width={80} height={80} alt="Logo" />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.mainLogo}>
          <img src={logo} width={150} height={150} alt="Logo" />
        </div>
        <div className={styles.message}>
          <div>
            <span>{message404}</span>
            <span>{messagesCounty}</span>
          </div>

          <span>{message}</span>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <Button
          btnType={ButtonType.medium}
          text={HeaderButtonText.Link_Discord}
        />
        <div className={styles.img}>
          {socialMedia?.map((e: SocialProps, index: number) => (
            <div key={index} className={styles.media}>
              <a href={e.link}>
                <img src={e.icon} width={25} height={25} alt="Logo" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
