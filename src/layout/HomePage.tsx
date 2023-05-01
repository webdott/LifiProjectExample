import { Fragment, useEffect, useState } from 'react';
import { ImFire } from 'react-icons/im';
import { useNavigate } from 'react-router';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Header from '../components/featured/header';
import Footer from '../components/featured/footer';
import SearchBar from '../components/shared/searchBar';
import BetInfo from '../components/shared/betInfo';
import { navData } from '../constants/leftSidebar';
import { LayoutProps } from '../constants/layout';
import { useLocation } from 'react-router-dom';
import LeftSideBar from './sideBarButtonList';
import liveActiveIcon from '../assets/images/activeLiveIcon.png';
import liveDisableIcon from '../assets/images/disableLiveIcon.png';

import styles from './homelayout.module.scss';
import { SportHubSlug } from '../constants/sports';

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
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

  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.leftSidebar}>
          <div className={styles.container}>
            {location.pathname == '/' && <SearchBar />}
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
                  navigate(`/live/${navData[1]?.sportTypeId}`);
                }}
              >
                <ListItemIcon style={{ minWidth: '24px' }}>
                  <img width={24} height={24} src={liveIcon} />
                  {liveHoverEffect && <div className={styles.hoverEffect}></div>}
                </ListItemIcon>
                <ListItemText primary='Live' />
              </ListItemButton>
            </div>
            <div className={styles.leagues}>
              <LeftSideBar
                sportSlugs={
                  location.pathname === '/'
                    ? [SportHubSlug.sports, SportHubSlug.esports]
                    : location.pathname === '/sports'
                    ? [SportHubSlug.sports]
                    : [SportHubSlug.esports]
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {children}
          <Footer />
        </div>
        <BetInfo />
      </div>
    </Fragment>
  );
}
