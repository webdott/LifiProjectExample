import { BaseSyntheticEvent, FC, useCallback, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

import Button from '../button';
import { ButtonType } from '../button/type';

import styles from './settings.module.scss';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { updateQuickBetOptions, updateSlippageTolerance } from '../../../redux/action-creators';
import { debounce } from 'lodash';

const slippageOptions: number[] = [2, 3, 10];

interface SettingPageProps {
  closePage: () => void;
}

const SettingsPage: FC<SettingPageProps> = ({ closePage }) => {
  const dispatch = useDispatch();
  const { slippageTolerance, quickBetOptions } = useTypedSelector((state) => state.app);
  const [customSlippage, setCustomSlippage] = useState<number>(0);

  useEffect(() => {
    if (!slippageOptions.includes(slippageTolerance)) setCustomSlippage(slippageTolerance);
  }, [slippageTolerance]);

  const debouncedUpdateSlippage = debounce((value: number) => {
    updateSlippageTolerance(value)(dispatch);
  }, 1000);

  const handleCustomSlippageChange = useCallback((newVal: number | string) => {
    const value = +newVal;
    if (value > 100) return;

    setCustomSlippage(value);
    debouncedUpdateSlippage(value);
  }, []);

  const handleSlippageChange = useCallback((newValue: number) => {
    updateSlippageTolerance(newValue)(dispatch);
  }, []);

  const handleQuickBetChange = useCallback(
    (newValue: number, index: number) => {
      if (newValue > 100) return;
      const newOptions = [...quickBetOptions];
      newOptions[index] = newValue;
      updateQuickBetOptions(newOptions)(dispatch);
    },
    [quickBetOptions]
  );

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
          <>
            {slippageOptions.map((value) => (
              <Button
                key={value}
                className={`${styles.oddSlippageButton} ${
                  slippageTolerance === value ? styles.active : ''
                }`}
                btnType={ButtonType.membershipButton}
                text={`${value} %`}
                onClick={() => handleSlippageChange(value)}
              />
            ))}
            <Button
              key={'Custom'}
              className={`${styles.oddSlippageButton} ${
                !slippageOptions.includes(slippageTolerance) ? styles.active : ''
              }`}
              btnType={ButtonType.membershipButton}
              text={'Custom'}
              onClick={() => handleSlippageChange(15)}
            />
          </>
        </div>
        {!slippageOptions.includes(slippageTolerance) && (
          <div className={styles.oddSlippageInput}>
            <label>
              <div className={styles.inputContainer}>
                <input
                  type='text'
                  value={customSlippage}
                  onChange={(event: BaseSyntheticEvent) =>
                    handleCustomSlippageChange(event.target.value)
                  }
                  max={100}
                />
              </div>
              <div className={styles.percent}>%</div>
            </label>
          </div>
        )}
      </div>

      <div className={styles.quickBet}>
        <div className={styles.top}>
          <p>Quick bet</p>
          <Tooltip
            title={
              <p className={styles.infoPrompt}>
                You can set up the value of bets you generally place to make the betting experience
                quicker and smoother. The betting slip will pre-offer y these values for your future
                bets.
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
          {quickBetOptions.map((val, index) => (
            <div key={`quick-bet-${index}`} className={styles.quickBetInput}>
              <label>
                <div className={styles.inputContainer}>
                  <input
                    type='text'
                    value={`${val}`}
                    onChange={({ target }) => handleQuickBetChange(+target.value, index)}
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
