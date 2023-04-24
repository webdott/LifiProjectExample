import { gxpValueData, questsItems } from '../../../constants/sidebar';
import Button from '../button';
import { ButtonType } from '../button/type';
import CheckerLayout from '../../../layout/GxpPage';

import styles from './gxp.module.scss';

export default function Gxp() {
  return (
    <CheckerLayout>
      <div className={styles.gxp}>
        <div className={styles.pageTitle}>
          <span>GXP</span>
        </div>
        <div className={styles.gxpValues}>
          {gxpValueData.map((el, index) => {
            return (
              <div className={styles.gxpValueItem} key={index}>
                <span className={styles.title}>{el.title}</span>
                <span className={styles.value}>{el.value}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.pageTitle}>
          <span>Quests</span>
        </div>
        <div className={styles.quests}>
          {questsItems.map((el, index) => {
            return (
              <div className={styles.questItemContainer} key={index}>
                <div key={index} className={styles.questItem}>
                  <div className={styles.questTop}>
                    <div>{el.questName}</div>
                    <div>
                      Reward <span>{el.gxpCount}</span> GXP
                    </div>
                  </div>
                  <div className={styles.bottomSection}>
                    <div className={styles.questBottom}></div>
                    {/* <div className={styles.rewardsCount}>{el.rewardsCount}</div> */}
                  </div>
                </div>
                <Button btnType={ButtonType.GXP} text='Claim GXP' />
              </div>
            );
          })}
        </div>
      </div>
    </CheckerLayout>
  );
}
