import { useState } from "react";
import { invitePageButtons } from "../../../constants/sidebar";
import Button from "../button";
import CheckerLayout from "../../../layout/GxpPage";
import { ButtonType } from "../button/type";
import MyTimer from "./timer";

import styles from "./invite.module.scss";

export default function Invite() {
  const [counter, setCounter] = useState<number>(5);
  setTimeout(function () {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  }, 1000);

  return (
    <CheckerLayout>
      <div className={styles.invite}>
        <div className={styles.inviteTitle}>Invite others to mint!</div>
        <div className={styles.inviteDiscription}>
          <span>New codes will drop in:</span>
          <MyTimer />
        </div>
        <div className={styles.inviteButtonsSection}>
          {invitePageButtons.map((el) => {
            return <Button btnType={ButtonType.claim} text={el} />;
          })}
        </div>
      </div>
    </CheckerLayout>
  );
}
