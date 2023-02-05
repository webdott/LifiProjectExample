import { SidebarButtonsText } from "../../../constants/sidebar";
import Button from "../button";
import { ButtonType } from "../button/type";
import CheckerLayout from "../../../layout/GxpPage";
import styles from "./upgrade.module.scss";

const MintVideo = require("../../../public/video/MintVideo.mp4");

export default function Upgrade() {
  return (
    <CheckerLayout>
      <div className={styles.upgrade}>
        <div className={styles.upgradeTitle}>Upgrade your Bowtie</div>
        <div className={styles.upgradeDescription}>Available GXP</div>
        <div className={styles.upgradeImg}>
          <video src={MintVideo} width='600' height='300' autoPlay={true} />
        </div>
        <div className={styles.pointsSection}>
          <span>Level x</span>
          <span>Points to upgrade: x</span>
          <Button
            text={SidebarButtonsText.UPGRADE}
            btnType={ButtonType.claim}
          />
        </div>
      </div>
    </CheckerLayout>
  );
}
