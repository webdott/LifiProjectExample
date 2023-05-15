import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Tab, Tabs, Tooltip } from '@mui/material';

import FlagIcon from '../../../shared/icons/FlagIcon';
import { Game } from '../../../../constants/matches';

import styles from './matchpage.module.scss';

function a11yProps(index: number) {
  return {
    id: `match-detail-tab-${index}`,
    'aria-controls': `match-detail-tabpanel-${index}`,
  };
}

const tabStyles = {
  tabs: {
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  },
  tab: {
    fontSize: '12px',
    fontWeight: '600',
    minHeight: '14px',
    color: 'white',
    opacity: '0.6',
    padding: '0px 4px',
    textTransform: 'capitalize',

    '&.Mui-selected': {
      color: '#00ffb2',
      opacity: '1',
      borderBottom: '2px solid #00ffb2',
    },
  },
  disabledTab: {
    color: '#fff',
    opacity: '0.5',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
};

interface MatchHeaderProps {
  game: Game | null;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const MatchHeader: FC<MatchHeaderProps> = ({ game, value, setValue }) => {
  const handleChange = (newValue: number) => {
    if (newValue === 1) return;
    setValue(newValue);
  };

  if (!game) return null;
  return (
    <div className={styles.matchHeader}>
      <div className={styles.leagueName}>
        <FlagIcon countryCode={game.league.country.slug} />
        <p>
          {game.league.country.name} &middot; {game.league.name}
        </p>
      </div>
      <div className={styles.matchDetails}>
        <div className={styles.matchDetailsContent}>
          <div className={styles.teamLogo}>
            <img
              src={game.participant1.image || '/assets/images/gamblr-xyz.png'}
              alt='team1 icon'
            />
          </div>
          <div className={styles.teamNames}>
            <div>
              <p>{game.startsAtString}</p>
              <span>{game.timeLabel}</span>
            </div>
            <p>
              {' '}
              {game.participant1.name} – {game.participant2.name}
            </p>
          </div>
          <div className={styles.teamLogo}>
            <img
              src={game.participant2.image || '/assets/images/gamblr-xyz.png'}
              alt='team2 icon'
            />
          </div>
        </div>
      </div>
      <div className={styles.tabPanelContainer}>
        <Tabs
          value={value}
          onChange={(event, newValue) => handleChange(newValue)}
          aria-label='match details tabs'
          variant='fullWidth'
          className={styles.tabs}
          sx={tabStyles.tabs}
        >
          <Tab label='ODDS' {...a11yProps(0)} sx={tabStyles.tab} />
          <Tab
            label={
              <Tooltip
                title={
                  <div className={styles.featurePrompt}>
                    <span>This feature is coming soon!</span>
                  </div>
                }
                placement='top'
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: '#2c2c2e',
                      right: '15px !important',
                      width: '300px',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                  }}
                >
                  <div className={styles.soonIcon}>Soon</div>
                  STATISTICS
                </Box>
              </Tooltip>
            }
            {...a11yProps(1)}
            sx={{ ...tabStyles.disabledTab }}
            disableRipple={true}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default MatchHeader;
