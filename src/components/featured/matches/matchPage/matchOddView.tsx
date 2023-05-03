import { FC, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import styles from './matchpage.module.scss';
import { getOddsDisplayString } from '../../../../utils/odds';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

interface MatchOddViewProps {
  oddTitle: string;
  outcomes: {
    selectionName: string;
    odds: string;
    id: number;
  }[][];
  allCollapsed: boolean;
  marketDescription: string;
}

const MatchOddView: FC<MatchOddViewProps> = ({
  oddTitle,
  outcomes,
  allCollapsed,
  marketDescription,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(allCollapsed);
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);

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
                <span>{marketDescription}</span>
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
      {!isCollapsed &&
        outcomes.map((odds) => (
          <div className={`${styles.odds} ${odds.length === 4 ? styles.four : ''}`}>
            {odds.map((item) => (
              <button key={item.id}>
                <span>{item.selectionName}</span>
                <span>{getOddsDisplayString(item.odds, oddsFormat)}</span>
              </button>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MatchOddView;
