import styles from './help.module.scss';
import CheckerLayout from '../../../layout/GxpPage';
import { HelpGxpContent } from '../../../constants/helpGxp';

export default function Help() {
  return (
    <CheckerLayout>
      <div className={styles.help}>
        {HelpGxpContent.map((help, index: number) => (
          <div key={index} className={styles.helpBlock}>
            <p className={styles.question}>{help.question}</p>
            <span className={styles.answer}>{help.answer}</span>
          </div>
        ))}
      </div>
    </CheckerLayout>
  );
}
