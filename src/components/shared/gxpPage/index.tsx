import {
  gxpValueData,
  questsTwoItems,
  SidebarButtonsText,
} from "../../../constants/sidebar";
import Button from "../button";
import { ButtonType } from "../button/type";
import CheckerLayout from "../../../layout/GxpPage";

import styles from "./gxp.module.scss";

export default function Gxp() {
  return (
    <CheckerLayout>
      <div className={styles.gxp}>
        <div className={styles.pageTitle}>
          <span>GXP</span>
        </div>
        <div className={styles.gxpValues}>
          {gxpValueData.map((el) => {
            return (
              <div className={styles.gxpValueItem}>
                <span>{el}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.rewardGxp}>
          <div>GXP</div>
          <div>Reward x GXP</div>
        </div>
        <div className={styles.questsTwo}>
          {questsTwoItems.map((el,index) => {
            return (
              <div key={index} className={styles.questItem}>
                <div className={styles.questTop}>
                  <div>{el.questName}</div>
                  <div>
                    Reward <span>{el.gxpCount}</span> GXP
                  </div>
                </div>
                <div className={styles.bottomSection}>
                  <div className={styles.questBottom}></div>
                  <div className={styles.rewardsCount}>{el.rewardsCount}</div>
                </div>
              </div>
            );
          })}
          <Button btnType={ButtonType.claim} text={SidebarButtonsText.GXP} />
        </div>
      </div>
    </CheckerLayout>
  );
}
