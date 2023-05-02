import React, { FC, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import styles from './matchpage.module.scss';

interface MatchOddViewProps {
  oddTitle: string;
  odds: {
    selectionName: string;
    odds: string;
    id: number;
  }[];
  allCollapsed: boolean;
}

const MatchOddView: FC<MatchOddViewProps> = ({ oddTitle, odds, allCollapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(allCollapsed);

  useEffect(() => {
    setIsCollapsed(allCollapsed);
  }, [allCollapsed]);

  return (
    <div className={styles.matchOddView}>
      <div className={styles.topSection}>
        <div>
          <p>{oddTitle}</p>
          <Tooltip
            title={
              <p className={styles.topPrompt}>
                <p>Combo is coming soon!</p>
                <span>
                  You combine several outcomes from different games into one bet in order to create
                  bigger odds and potentially a bigger payout. All the chosen need to be successful
                  for you combo bet to win.
                </span>
              </p>
            }
            arrow={true}
            placement='top'
          >
            <IconButton className={styles.info}>
              <InfoIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </div>
        {isCollapsed ? (
          <button onClick={() => setIsCollapsed(false)}>
            <MdOutlineKeyboardArrowDown size={20} />
          </button>
        ) : (
          <button onClick={() => setIsCollapsed(true)}>
            <MdOutlineKeyboardArrowUp size={20} />
          </button>
        )}
      </div>
      {!isCollapsed && (
        <div className={`${styles.odds} ${odds.length === 4 ? styles.four : ''}`}>
          {odds.map((item) => (
            <button key={item.id}>
              <span>{item.selectionName}</span>
              <span>{item.odds}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchOddView;
