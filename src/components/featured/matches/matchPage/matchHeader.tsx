import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Tab, Tabs, Tooltip } from '@mui/material';

import PremierLeagueFlag from '../../../../public/images/leaguesFlags/england.webp';
import Team1Flag from '../../../../assets/images/LeicesterCity.png';
import Team2Flag from '../../../../assets/images/mancity.png';

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
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const MatchHeader: FC<MatchHeaderProps> = ({ value, setValue }) => {
  const handleChange = (newValue: number) => {
    if (newValue === 1) return;
    setValue(newValue);
  };

  return (
    <div className={styles.matchHeader}>
      <div className={styles.leagueName}>
        <img className={styles.leagueIcon} src={PremierLeagueFlag} alt='league icon' />
        <p>England &middot; Premier League</p>
      </div>
      <div className={styles.matchDetails}>
        <div className={styles.matchDetailsContent}>
          <div className={styles.teamLogo}>
            <img src={Team1Flag} alt='team1 icon' />
          </div>
          <div className={styles.teamNames}>
            <div>
              <p>05:30 PM</p>
              <span>Tomorrow</span>
            </div>
            <p>Leicester City – Manchester City</p>
          </div>
          <div className={styles.teamLogo}>
            <img src={Team2Flag} alt='team2 icon' />
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
