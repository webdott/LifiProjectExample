import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './settings.module.scss';
import { Tooltip } from '@mui/material';

const oddSlippageValues: string[] = ['2%', '3%', '10%', 'Custom'];

interface SettingPageProps {
  closePage: () => void;
}

const SettingsPage: FC<SettingPageProps> = ({ closePage }) => {
  const [selectedOddSlippage, setSelectedOddSlippage] = useState<string>('2%');
  const [oddSlippageInputValue, setOddSlippageInputValue] = useState<string>('');
  const [quickBetValues, setQuickBetValues] = useState<Record<number, string>>({
    1: '10',
    2: '30',
    3: '50',
  });

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Settings</h1>
        <IconButton sx={{ padding: 0, color: '#fff', opacity: '0.5' }} onClick={closePage}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
      <div className={styles.oddSlippageTolerance}>
        <div className={styles.top}>
          <p>Odds Slippage Tolerance</p>
          <Tooltip
            title={
              <p className={styles.infoPrompt}>
                The percentage of maximum slippage or change in odds when placing a bet.
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
        <div className={styles.oddSlippageButtons}>
          {oddSlippageValues.map((value) => (
            <Button
              key={value}
              className={`${styles.oddSlippageButton} ${
                selectedOddSlippage === value ? styles.active : ''
              }`}
              btnType={ButtonType.membershipButton}
              text={value}
              onClick={() => setSelectedOddSlippage(value)}
            />
          ))}
        </div>
        {selectedOddSlippage === 'Custom' && (
          <div className={styles.oddSlippageInput}>
            <label>
              <div className={styles.inputContainer}>
                <input
                  type='text'
                  value={oddSlippageInputValue}
                  onChange={({ target }) => setOddSlippageInputValue(target.value)}
                />
              </div>
              <div className={styles.percent}>%</div>
            </label>
          </div>
        )}
      </div>

      <div className={styles.quickBet}>
        <div className={styles.top}>
          <p>Odds Slippage Tolerance</p>
          <Tooltip
            title={
              <p className={styles.infoPrompt}>
                The percentage of maximum slippage or change in odds when placing a bet.
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

        <div className={styles.quickBets}>
          {Object.entries(quickBetValues).map((val) => (
            <div key={val[0]} className={styles.quickBetInput}>
              <label>
                <div className={styles.inputContainer}>
                  <input
                    type='text'
                    value={val[1]}
                    onChange={({ target }) =>
                      setQuickBetValues({ ...quickBetValues, [val[0]]: target.value })
                    }
                  />
                </div>
                <div className={styles.percent}>%</div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
