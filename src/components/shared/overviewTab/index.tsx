import { useState } from "react";
import { Link } from "react-router-dom";
import { overview } from "../../../constants/overwiewTab";

import styles from "./overviewTab.module.scss";

export default function OverviewTab(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<number>(0);
  const [fillter, setFillter] = useState<number>(1);
  const showDropdown = (): void => {
    setVisible(!visible);
  };

  const handleFillters = (index: number) => {
    setFillter(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabSection}>
        {overview.map((el, index) => (
          <Link
            className={
              toggleState === index
                ? `${styles.tabSection_tab} ${styles.tabSection_activeTab}`
                : `${styles.tabSection_tab}`
            }
            key={el.name}
            to={`/account?name=${el.path}`}
            onClick={() => setToggleState(index)}
          >
            <div className={styles.hoverEffect}></div>
            <img className={styles.overviewNavIcon} src={el.icon} />
            <span>{el.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
