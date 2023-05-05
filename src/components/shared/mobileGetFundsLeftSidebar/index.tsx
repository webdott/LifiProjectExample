import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { getUSDTLinks, getXDAILinks } from '../../../constants/getFunds';

import styles from './mobilegetfundsleftsidebar.module.scss';

export default function MobileGetFundsLeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedChain } = useParams();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleNavigation = (path: string) => {
    navigate(`/${selectedChain}${path}`);
  };

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const List = () => (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }} role='presentation'>
      <div className={styles.mobileLeftSidebar}>
        <div className={styles.container}>
          <ListItemButton
            className={styles.closeDrawer}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemIcon className={styles.close} style={{ minWidth: '24px' }}>
              <IoMdClose size={24} />
            </ListItemIcon>
          </ListItemButton>
          <div className={styles.sidebarNav}>
            {(selectedChain === 'polygon' ? getUSDTLinks : getXDAILinks).map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname === `/${selectedChain}${el.path}`
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  onClick={() => handleNavigation(el.path)}
                >
                  {el.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div className={styles.mobileCover}>
      <Button onClick={toggleDrawer(true)} className={styles.hamburgerButton}>
        <GiHamburgerMenu size={30} />
      </Button>
      <Drawer
        anchor='left'
        open={openDrawer}
        onClose={toggleDrawer(false)}
        className={styles.mobileSidebarDrawer}
      >
        <List />
      </Drawer>
    </div>
  );
}
