import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

import styles from './matches.module.scss';

type record = {
  label: string;
  value: number;
};

interface Props {
  options: number[];
  onSelect: (value: number) => void;
  selected: number;
}

const OddChangeListItem = ({ options, onSelect, selected }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (newValue?: number) => {
    if (newValue) onSelect(newValue);
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
        <span>{selected}</span>
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
        {options.map((item) => (
          <MenuItem
            key={item}
            sx={() =>
              selected === item
                ? {
                    background: '#3a3a3d',
                    borderRadius: '4px',
                    '&:hover': {
                      background: '#3a3a3d',
                    },
                  }
                : { opacity: 0.7 }
            }
            onClick={() => handleClose(item)}
          >
            {item.toFixed(1)}
          </MenuItem>
        ))}
      </Menu>
    </li>
  );
};

export default OddChangeListItem;
