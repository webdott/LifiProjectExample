import { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from '../../../layout/sidebarbuttonlist.module.scss';
import { SPORTS_ICONS } from '../../../constants/sports';
import { Sport } from '../../../constants/matches';

export default function SportButton({
  sport,
  index,
  onClick,
  selected,
}: {
  sport: Sport;
  index: number;
  onClick: () => void;
  selected?: boolean;
}) {
  const [Icon, setIcon] = useState<string | IconType>(SPORTS_ICONS[sport.slug]?.disableIcon);
  const [hoverEffect, setHoverEffect] = useState(false);

  useEffect(() => {
    if (selected) {
      setIcon(SPORTS_ICONS[sport.slug].activeIcon);
      setHoverEffect(true);
    } else {
      setIcon(SPORTS_ICONS[sport.slug].disableIcon);
      setHoverEffect(false);
    }
  }, [selected, sport]);

  const hoverEnd = () => {
    if (!selected) {
      setIcon(SPORTS_ICONS[sport.slug].disableIcon);
      setHoverEffect(false);
    }
  };

  return (
    <ListItemButton
      onMouseOver={() => {
        setIcon(SPORTS_ICONS[sport.slug].activeIcon);
        setHoverEffect(true);
      }}
      onMouseOut={() => hoverEnd()}
      key={index}
      className={
        selected ? `${styles.sidebarButton} ${styles.activeTab}` : `${styles.sidebarButton}`
      }
      onClick={onClick}
    >
      <ListItemIcon className={styles.sportIcon}>
        {hoverEffect ? <div className={styles.hoverEffect}></div> : ''}
        {typeof Icon === 'object' ? (
          Icon
        ) : (
          <img alt='' src={Icon as string} width={22} height={22} />
        )}
      </ListItemIcon>
      <ListItemText primary={sport.name} />
      {/* <span className={styles.gameNumber}>{sport.sportsGames}</span> */}
      {selected ? <ExpandLess /> : <ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
      {sport.name === 'MMA' || sport.name === 'Basketball' ? (
        <div className={styles.soonIcon}>Soon</div>
      ) : null}
    </ListItemButton>
  );
}
