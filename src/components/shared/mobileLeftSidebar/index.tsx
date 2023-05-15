import { KeyboardEvent, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import MobileGXPLeftSidebarLinks from '../mobileGXPSidebarLinks';
import MobileGetFundsLinks from '../mobileGetFundsLinks';
import MobileSportsESportsLeftSidebarLinks from '../mobileSportsESportsLeftSidebar';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './mobileleftsidebar.module.scss';

export default function MobileLeftSidebar() {
  const location = useLocation();
  const [openDetails, setOpenDetails] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const homeLinks: {
    name: string;
    linkTo?: string;
    pathCheck?: string[];
  }[] = [
    {
      name: 'Home',
      linkTo: `/${getSelectedChainFromBase(location.pathname)}`,
    },
    {
      name: 'Sports',
      pathCheck: ['/sports'],
    },
    {
      name: 'Esports',
      pathCheck: ['/esports'],
    },
    {
      name: 'Membership',
      pathCheck: ['/help', '/membership', '/mint', '/upgrade'],
    },
  ];

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
            {homeLinks.map((el, index) => {
              return el.name === 'Home' ? (
                <NavLink
                  key={index}
                  className={
                    location.pathname === el.linkTo
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : `${styles.navLink} `
                  }
                  to={el.linkTo!}
                >
                  {el.name}
                  <div className={styles.hoverEffect}></div>
                </NavLink>
              ) : (
                <button
                  key={index}
                  className={
                    el.pathCheck?.find((path) => location.pathname.includes(path))
                      ? `${styles.navLink} ${styles.activeNavLink}`
                      : `${styles.navLink} `
                  }
                  onClick={() => setOpenDetails(el.name)}
                >
                  <p>{el.name}</p>
                  <HiOutlineChevronRight size={20} />
                  {el.name === 'Membership' && <div className={styles.soonIcon}>Soon</div>}
                  <div className={styles.hoverEffect}></div>
                </button>
              );
            })}
          </div>
        </div>

        <Divider sx={{ background: '#fff', opacity: 0.5 }} />

        <div className={`${styles.container} ${styles.second}`}>
          <div className={styles.sidebarNav}>
            {[
              {
                name: 'Get Funds',
                linkTo: `/${getSelectedChainFromBase(location.pathname)}/get-funds`,
                pathCheck: 'get-funds',
              },
            ].map((el, index) => (
              <button
                key={index}
                className={
                  location.pathname.includes(el.pathCheck)
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : `${styles.navLink} `
                }
                onClick={() => setOpenDetails(el.name)}
              >
                <p>{el.name}</p>
                <HiOutlineChevronRight size={20} />
              </button>
            ))}
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
        {openDetails === 'Get Funds' && (
          <MobileGetFundsLinks
            closeDrawer={() => setOpenDrawer(false)}
            goBack={() => setOpenDetails(null)}
          />
        )}
        {openDetails === 'Membership' && (
          <MobileGXPLeftSidebarLinks
            closeDrawer={() => setOpenDrawer(false)}
            goBack={() => setOpenDetails(null)}
          />
        )}
        {(openDetails === 'Sports' || openDetails === 'Esports') && (
          <MobileSportsESportsLeftSidebarLinks
            closeDrawer={() => setOpenDrawer(false)}
            goBack={() => setOpenDetails(null)}
            pageTitle={openDetails}
          />
        )}
        {!openDetails && <List />}
      </Drawer>
    </div>
  );
}
