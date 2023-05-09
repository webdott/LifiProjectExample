import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import Skeleton from 'react-loading-skeleton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import Button from '../../shared/button';
import { ButtonType } from '../../shared/button/type';
import { formatBalanceString, getSelectedChainFromBase } from '../../../functions';
import { CHAIN_IDS } from '../../../constants/wallet';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './walletbalance.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const walletbalanceDetails: {
  poly: {
    balance: string;
    inBets: string;
    toPayouts: string;
  };
  gnosis: {
    balance: string;
    inBets: string;
    toPayouts: string;
  };
} = {
  poly: {
    balance: '0 USDT',
    inBets: '0 USDT',
    toPayouts: '0 USDT',
  },
  gnosis: {
    balance: '0 XDAI',
    inBets: '0 XDAI',
    toPayouts: '0 XDAI',
  },
};

export default function TabPanel(props: TabPanelProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: nativeData, isLoading: isLoadingNativeDataBalance } = useBalance({
    address,
    chainId:
      getSelectedChainFromBase(location.pathname) === 'polygon'
        ? CHAIN_IDS.POLYGON
        : CHAIN_IDS.GNOSIS,
  });
  const { data: USDTBalanceData, isLoading: isLoadingUSDTBalance } = useBalance({
    address: getSelectedChainFromBase(location.pathname) === 'polygon' ? address : undefined,
    chainId:
      getSelectedChainFromBase(location.pathname) === 'polygon'
        ? CHAIN_IDS.POLYGON
        : CHAIN_IDS.GNOSIS,
    token: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  });
  const { children, value, index, ...other } = props;
  const balanceDetail: 'poly' | 'gnosis' = value === 0 ? 'poly' : 'gnosis';

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={styles.tabPanel}
      {...other}
    >
      {value === index && (
        <>
          <div className={styles.block}>
            <p className={styles.title}>Balance</p>
            {isLoadingNativeDataBalance || isLoadingUSDTBalance ? (
              <Box
                sx={{
                  opacity: 0.25,
                }}
              >
                <Skeleton
                  style={{
                    width: '80px',
                    height: '18px',
                    borderRadius: '50px',
                  }}
                />
              </Box>
            ) : (
              <div className={styles.polyBalance}>
                <p className={styles.value}>
                  {value === 0 ? (
                    <>
                      {formatBalanceString(USDTBalanceData?.formatted ?? '')}{' '}
                      {USDTBalanceData?.symbol}
                      <span>
                        {' '}
                        + {formatBalanceString(nativeData?.formatted ?? '')} {nativeData?.symbol}
                      </span>
                    </>
                  ) : (
                    `
                    ${formatBalanceString(nativeData?.formatted ?? '')} ${nativeData?.symbol}
                  `
                  )}
                </p>
                {value === 0 && (
                  <Tooltip
                    title={
                      <p className={styles.infoPrompt}>
                        To place bets Polygon Mainnet, you'll need USDT and some MATIC to pay for
                        transactions. You can get USDT and MATIC in the{' '}
                        <Link to='/polygon/get-funds'>
                          <span className={styles.getFunds}>funding section here</span>
                        </Link>
                      </p>
                    }
                    arrow={true}
                    placement='bottom'
                  >
                    <IconButton className={styles.info}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
          </div>

          <div className={styles.block}>
            <p className={styles.title}>In Bets</p>
            <p className={styles.value}>{walletbalanceDetails[balanceDetail].inBets}</p>
          </div>

          <div className={styles.payoutsBlock}>
            <div className={styles.payouts}>
              <p className={styles.title}>Available GXP</p>
              <p className={styles.value}>{walletbalanceDetails[balanceDetail].toPayouts}</p>
            </div>

            {value === 0 && (
              <Button
                className={styles.ctaButton}
                btnType={ButtonType.membershipButton}
                text={'See All'}
              />
            )}
          </div>

          <div className={styles.cta}>
            <Button
              className={styles.ctaButton}
              btnType={ButtonType.membershipButton}
              text={index === 0 ? 'Get USDT' : 'Get XDAI'}
              onClick={() =>
                index === 0 ? navigate('/polygon/get-funds') : navigate('/gnosis/get-funds')
              }
            />

            <Button
              className={`${styles.ctaButton} ${styles.accountMobile}`}
              btnType={ButtonType.membershipButton}
              text='Go to Account'
              onClick={() =>
                index === 0 ? navigate('/polygon/account') : navigate('/gnosis/account')
              }
            />

            <Button
              className={styles.disconnectButton}
              btnType={ButtonType.membershipButton}
              text={'Disconnect wallet'}
              onClick={() => disconnect()}
            />
          </div>
        </>
      )}
    </div>
  );
}
