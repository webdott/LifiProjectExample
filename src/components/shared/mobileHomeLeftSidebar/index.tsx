import { KeyboardEvent, MouseEvent, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ImFire } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SearchBar from '../searchBar';
import liveActiveIcon from '../../../assets/images/activeLiveIcon.png';
import liveDisableIcon from '../../../assets/images/activeLiveIcon.png';
import LeftSideBar from '../../../layout/sideBarButtonList';
import { checkIfBase } from '../../../functions';
import { SportHubSlug } from '../../../constants/sports';

import styles from './mobileleftsidebar.module.scss';

export default function MobileLeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [topNav, setTopNav] = useState<number>(1);
  const [liveIcon, setLiveIcon] = useState(liveDisableIcon);
  const [homeHoverEffect, setHomeHoverEffect] = useState(false);
  const [liveHoverEffect, setLiveHoverEffect] = useState(false);

  useEffect(() => {
    if (topNav === 1) {
      setHomeHoverEffect(true);
    } else {
      setHomeHoverEffect(false);
    }
  }, [topNav]);

  useEffect(() => {
    if (topNav === 2) {
      setLiveIcon(liveActiveIcon);
      setLiveHoverEffect(true);
    } else {
      setLiveIcon(liveDisableIcon);
      setLiveHoverEffect(false);
    }
  }, [topNav]);

  const getSportHubSlugs = useCallback(() => {
    if (location.pathname.includes('/esports')) return [SportHubSlug.esports];
    if (location.pathname.includes('/sports')) return [SportHubSlug.sports];

    return [SportHubSlug.sports, SportHubSlug.esports];
  }, [location]);

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
          {checkIfBase(location.pathname) && <SearchBar />}
          <div className={styles.nav}>
            <ListItemButton
              className={
                topNav === 1
                  ? `${styles.homeLiveButton} ${styles.activeTab}`
                  : `${styles.homeLiveButton}`
              }
              onClick={() => {
                navigate('/');
                setTopNav(1);
              }}
            >
              <ListItemIcon className={styles.homeLiveButtonIcon} style={{ minWidth: '24px' }}>
                <ImFire size={22} />
                {homeHoverEffect ? <div className={styles.hoverEffect}></div> : null}
              </ListItemIcon>
              <ListItemText primary='Top Events' />
            </ListItemButton>
            <ListItemButton
              onMouseOver={() => {
                setLiveIcon(liveActiveIcon);
                setLiveHoverEffect(true);
              }}
              onMouseOut={
                topNav !== 2
                  ? () => {
                      setLiveIcon(liveDisableIcon);
                      setLiveHoverEffect(false);
                    }
                  : () => setLiveIcon(liveActiveIcon)
              }
              className={
                topNav === 2
                  ? `${styles.homeLiveButton} ${styles.activeTab}`
                  : `${styles.homeLiveButton}`
              }
              onClick={() => {
                setTopNav(2);
                navigate(`/`);
              }}
            >
              <ListItemIcon style={{ minWidth: '24px' }}>
                <img width={24} height={24} src={liveIcon} alt='img' />
                {liveHoverEffect && <div className={styles.hoverEffect}></div>}
              </ListItemIcon>
              <ListItemText primary='Live' />
            </ListItemButton>
          </div>
          <div className={styles.leagues}>
            <LeftSideBar sportHubSlugs={getSportHubSlugs()} />
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
