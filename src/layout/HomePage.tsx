import { Fragment, useEffect, useState } from "react";
import Header from "../components/featured/header";
import Footer from "../components/featured/footer";
import SearchBar from "../components/shared/searchBar";
import BetInfo from "../components/shared/betInfo";
import { navData } from "../constants/leftSidebar";
import { LayoutProps } from "../constants/layout";
import { useNavigate } from "react-router";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LeftSideBar from "./sideBarButtonList";
import homeDisableIcon from "../assets/images/disableHomeIcon.png";
import homeActiveIcon from "../assets/images/activeHomeIcon.png";
import liveActiveIcon from "../assets/images/activeLiveIcon.png";
import liveDisableIcon from "../assets/images/disableLiveIcon.png";

import styles from "./homelayout.module.scss";

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [topNav, setTopNav] = useState<number>(1);
  const [homeIcon, setHomeIcon] = useState(homeDisableIcon);
  const [liveIcon, setLiveIcon] = useState(liveDisableIcon);
  const [homeHoverEffect, setHomeHoverEffect] = useState(false);
  const [liveHoverEffect, setLiveHoverEffect] = useState(false);

  useEffect(() => {
    if (topNav === 1) {
      setHomeIcon(homeActiveIcon);
      setHomeHoverEffect(true);
    } else {
      setHomeIcon(homeDisableIcon);
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
            <SearchBar />
            <div className={styles.nav}>
              <ListItemButton
                onMouseOver={() => {
                  setHomeIcon(homeActiveIcon);
                  setHomeHoverEffect(true);
                }}
                onMouseOut={
                  topNav !== 1
                    ? () => setHomeIcon(homeDisableIcon)
                    : () => setHomeIcon(homeActiveIcon)
                }
                className={
                  topNav === 1
                    ? `${styles.homeLiveButton} ${styles.activeTab}`
                    : `${styles.homeLiveButton}`
                }
                onClick={() => {
                  navigate("/");
                  setTopNav(1);
                }}
              >
                <ListItemIcon style={{ minWidth: "24px" }}>
                  <img width={24} height={24} src={homeIcon} />
                  {homeHoverEffect ? (
                    <div className={styles.hoverEffect}></div>
                  ) : null}
                </ListItemIcon>
                <ListItemText primary="Home" />
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
                <ListItemIcon style={{ minWidth: "24px" }}>
                  <img width={24} height={24} src={liveIcon} />
                  {liveHoverEffect && (
                    <div className={styles.hoverEffect}></div>
                  )}
                </ListItemIcon>
                <ListItemText primary="Live" />
              </ListItemButton>
            </div>
            <div className={styles.leagues}>
              <LeftSideBar />
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
