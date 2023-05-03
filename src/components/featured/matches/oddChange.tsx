import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BsFillCaretUpFill, BsFillCaretDownFill} from 'react-icons/bs';

import styles from './matches.module.scss';

const oddValues: number[] = [-1.5, 1.5];

const OddChangeListItem = () => {
  const [currentValue, setCurrentValue] = useState<number>(-1.5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (newValue?: number) => {
    if (newValue) setCurrentValue(newValue);
    setAnchorEl(null);
  };

  return (
    <li className={styles.oddChange}>
      <Button
        id='odd-change-button'
        aria-controls={open ? 'odd-change-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={styles.selectButton}
      >
        <BsFillCaretUpFill size={12} />
        <span>{currentValue}</span>
        <BsFillCaretDownFill size={12} />
      </Button>
      <Menu
        id='odd-change-menu'
        aria-labelledby='odd-change-button'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        className={styles.oddChangeMenu}
        PaperProps={{
          style: {
            marginTop: '10px',
            background: '#2c2c2e',
            color: '#fff',
            padding: '0 4px',
          },
        }}
      >
        {oddValues.map((value) => (
          <MenuItem
            key={value}
            sx={() =>
              currentValue === value
                ? {
                    background: '#3a3a3d',
                    borderRadius: '4px',
                    '&:hover': {
                      background: '#3a3a3d',
                    },
                  }
                : { opacity: 0.7 }
            }
            onClick={() => handleClose(value)}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </li>
  );
};

export default OddChangeListItem;
