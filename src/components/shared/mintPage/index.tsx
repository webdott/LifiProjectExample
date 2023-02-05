import { SidebarButtonsText } from "../../../constants/sidebar";
import Button from "../button";
import { ButtonType } from "../button/type";
import CheckerLayout from "../../../layout/GxpPage";

import styles from "./mint.module.scss";

const MintVideo = require("../../../public/video/MintVideo.mp4");

export default function Mint() {
  return (
    <CheckerLayout>
      <div className={styles.mint}>
        <div className={styles.mintTitle}>Mint your Bowtie</div>
        <div className={styles.mintDiscription}>Text Rodolfo</div>
        <div className={styles.mintImg}>
          <video src={MintVideo} width='600' height='300' autoPlay={true} />
        </div>
        <Button btnType={ButtonType.claim} text={SidebarButtonsText.MINT} />
      </div>
    </CheckerLayout>
  );
}
