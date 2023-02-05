import invoice from "../../../assets/images/myBetsIcon.png";
import { HeaderButtonText } from "../../../constants/navbar";
import Button from "../button";
import { ButtonType } from "../button/type";

import styles from "./myBets.module.scss";

export default function MyBets(): JSX.Element {
  return (
    <div className={styles.container}>
      <img src={invoice} width={87} height={77} alt="invoice" />
      <Button
        btnType={ButtonType.betInfoLargeButton}
        text={HeaderButtonText.How_To_Make_a_Bet}
      />
    </div>
  );
}
