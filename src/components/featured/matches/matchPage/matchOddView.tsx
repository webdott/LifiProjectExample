import { FC, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import styles from './matchpage.module.scss';
import { getOddsDisplayString } from '../../../../utils/odds';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getSelectionName } from '@azuro-org/dictionaries';
import { getOddsPointString } from '../../../../helpers/conditions/odds';
import { Outcome } from '../../../../constants/matches';

interface MatchOddViewProps {
  oddTitle: string;
  outcomes: Outcome[][];
  allCollapsed: boolean;
  marketDescription: string;
  onClick: (outcome: Outcome, oddTitle: string) => void;
}

const MatchOddView: FC<MatchOddViewProps> = ({
  oddTitle,
  outcomes,
  allCollapsed,
  marketDescription,
  onClick,
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
        outcomes.map((odds, idx: number) => (
          <div className={`${styles.odds} ${odds.length === 4 ? styles.four : ''}`} key={idx}>
            {odds.map((item) => (
              <button key={item.id} onClick={() => onClick(item, oddTitle)}>
                <span>
                  {getSelectionName({
                    outcomeId: item.outcomeId,
                    withPoint: getOddsPointString({ outcomeId: item.outcomeId }) ? true : false,
                  })}
                </span>
                <span>{getOddsDisplayString(item.odds, oddsFormat)}</span>
              </button>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MatchOddView;
