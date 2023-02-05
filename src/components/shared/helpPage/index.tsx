import styles from "./help.module.scss";
import CheckerLayout from "../../../layout/GxpPage";
import { HelpGxpContent } from "../../../constants/helpGxp";

export default function Help() {
  return (
    <CheckerLayout>
      <div className={styles.help}>
        {HelpGxpContent.map((help) => (
          <span key={help}>{help}</span>
        ))}
      </div>
    </CheckerLayout>
  );
}
