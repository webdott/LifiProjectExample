import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import TabPanel from './tabpanel';
import SettingsPage from '../../../settingsPage';
import { useDispatch } from 'react-redux';
import { removeBetSlip } from '../../../../../redux/action-creators';

import styles from './bestsliptab.module.scss';

function a11yProps(index: number) {
  return {
    id: `wallet-balance-tab-${index}`,
    'aria-controls': `wallet-balance-tabpanel-${index}`,
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
    minHeight: '40px',
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

interface BetSlipTabProps {}

export default function BetSlipTab() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleChange = (newValue: number) => {
    if (newValue === 1) return;
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.betSlipTabContainer}>
        <Box className={styles.betSlipTab}>
          <Box className={styles.tabPanelContainer}>
            <IconButton
              sx={{ padding: 0, color: '#fff', opacity: '0.5' }}
              onClick={() => setShowSettings(true)}
            >
              <SettingsIcon fontSize='small' />
            </IconButton>
            <Tabs
              value={value}
              onChange={(event, newValue) => handleChange(newValue)}
              aria-label='bet slip tabs'
              centered
              className={styles.tabs}
              sx={tabStyles.tabs}
            >
              <Tab label='SINGLE BET' {...a11yProps(0)} sx={tabStyles.tab} />
              <Tab
                label={
                  <Tooltip
                    title={
                      <div className={styles.comboPrompt}>
                        <p>Combo is coming soon!</p>
                        <span>
                          You combine several outcomes from different games into one bet in order to
                          create bigger odds and potentially a bigger payout. All the chosen need to
                          be successful for you combo bet to win.
                        </span>
                      </div>
                    }
                    placement='bottom'
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
                      COMBO
                    </Box>
                  </Tooltip>
                }
                {...a11yProps(1)}
                sx={{ ...tabStyles.tab, ...tabStyles.disabledTab }}
                disableRipple={true}
              />
            </Tabs>
            <IconButton
              sx={{ padding: 0, color: '#fff', opacity: '0.5' }}
              onClick={() => removeBetSlip()(dispatch)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>
          <TabPanel value={value} index={0} />
          <TabPanel value={value} index={1} />
        </Box>
      </div>

      {showSettings && <SettingsPage closePage={() => setShowSettings(false)} />}
    </>
  );
}
