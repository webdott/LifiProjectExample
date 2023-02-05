import ExpandLess from "@mui/icons-material/ExpandLess";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "../../../layout/homelayout.module.scss";
import { useEffect, useState } from "react";

export default function SportButton({
  sport,
  index,
  sportTab,
  setSportTab,
  fn,
  state,
}: any) {
  const [icon, setIcon] = useState(sport.disableIcon);
  const [hoverEffect, setHoverEffect] = useState(false);

  useEffect(() => {
    if (sportTab === index + 1) {
      setIcon(sport.activeIcon);
      setHoverEffect(true);
    } else {
      setIcon(sport.disableIcon);
      setHoverEffect(false);
    }
  }, [sportTab]);

  const hoverEnd = () => {
    if (sportTab !== index + 1) {
      setIcon(sport.disableIcon);
      setHoverEffect(false);
    }
  };

  return (
    <ListItemButton
      onMouseOver={() => {
        setIcon(sport.activeIcon);
        setHoverEffect(true);
      }}
      onMouseOut={() => hoverEnd()}
      key={index}
      className={
        sportTab === index + 1
          ? `${styles.sidebarButton} ${styles.activeTab}`
          : `${styles.sidebarButton}`
      }
      onClick={() => {
        fn();
        setSportTab(index + 1);
      }}
    >
      <ListItemIcon className={styles.sportIcon}>
        {hoverEffect ? <div className={styles.hoverEffect}></div> : ""}
        <img alt='' src={icon} width={22} height={22} />
      </ListItemIcon>
      <ListItemText primary={sport.sport} />
      {/* <span className={styles.gameNumber}>{sport.sportsGames}</span> */}
      {state ? <ExpandLess /> : <ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
      {sport.sport === "MMA" || sport.sport === "Basketball" ? <div className={styles.soonIcon}>Soon</div> : null}
    </ListItemButton>
  );
}
