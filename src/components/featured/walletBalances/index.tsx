import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillCaretUp } from 'react-icons/ai';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import PolygonIcon from '../../shared/icons/polygonIcon';
import GnosisIcon from '../../shared/icons/gnosisIcon';
import TabPanel from './tabpanel';

import styles from './walletbalance.module.scss';
import useOutsideClick from '../../../hooks/useClickOutside';
import { CHAIN_IDS } from '../../../constants/wallet';

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
    minHeight: '32px',
    borderRadius: '4px',
    color: 'white',
    opacity: '0.6',
    padding: '0px 4px',
    textTransform: 'capitalize',

    '&.Mui-selected': {
      background: '#2c2c2e',
      color: '#00ffb2',
      opacity: '1',
      borderBottom: 'none',
    },

    '&.Mui-disabled': {
      color: 'white',
      opacity: '0.6',
      borderBottom: 'none',
    },
  },
};

interface WalletBalanceProps {
  closeWalletBalance: () => void;
}

export default function WalletBalance({ closeWalletBalance }: WalletBalanceProps) {
  const { chain } = useNetwork();
  const [value, setValue] = useState(chain?.id === CHAIN_IDS.POLYGON ? 0 : 1);

  const checkChain = () => {
    if (chain?.id === CHAIN_IDS.POLYGON) {
      setValue(0);
      handleChange(0);
    } else {
      setValue(1);
      handleChange(1);
    }
  };

  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork({
    onError(error) {
      //@ts-ignore
      if (error?.code === 4001) {
        toast.error(<span>User rejected the request</span>);
        return;
      } else {
        toast.error(<span>Error connecting wallet, try again</span>);
      }
      checkChain();
    },
  });
  const { ref: clickOutRef } = useOutsideClick(closeWalletBalance);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    checkChain();
  }, [chain?.id]);

  return (
    <div className={styles.walletBalanceContainer} ref={clickOutRef}>
      <AiFillCaretUp color='#2c2c2e' className={styles.arrowUp} size={24} />
      <Box className={styles.walletBalance}>
        <Box className={styles.tabPanelContainer}>
          <Tabs
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            aria-label='wallet balance tabs'
            variant='fullWidth'
            className={styles.tabs}
            sx={tabStyles.tabs}
          >
            <Tab
              icon={<PolygonIcon />}
              iconPosition='start'
              label='Polygon Mainnet'
              {...a11yProps(0)}
              sx={tabStyles.tab}
              disabled={!switchNetwork || chain?.id === CHAIN_IDS.POLYGON}
              onClick={() => switchNetwork?.(CHAIN_IDS.POLYGON)}
            />
            <Tab
              icon={<GnosisIcon />}
              iconPosition='start'
              label='Gnosis'
              {...a11yProps(1)}
              sx={tabStyles.tab}
              disabled={!switchNetwork || chain?.id === CHAIN_IDS.GNOSIS}
              onClick={() => switchNetwork?.(CHAIN_IDS.GNOSIS)}
            />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          isLoading={isLoading && pendingChainId === CHAIN_IDS.POLYGON}
        />
        <TabPanel
          value={value}
          index={1}
          isLoading={isLoading && pendingChainId === CHAIN_IDS.GNOSIS}
        />
      </Box>
    </div>
  );
}
