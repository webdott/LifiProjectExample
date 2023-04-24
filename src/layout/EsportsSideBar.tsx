import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { ImFire } from 'react-icons/im';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Esports } from './../constants/leftSidebar';
import { useESportsSideBar } from '../hooks/useESportsSidebar';

import styles from './homelayout.module.scss';

function EsportsButtonList(): JSX.Element {
  const navigate = useNavigate();
  const [sportTab, setSportTab] = useState<number>(0);
  const [leagueTab, setLeagueTab] = useState<number>(1);

  const {
    handleDota2,
    handleCsGo,
    handleLeagueOfLegends,
    dota2State,
    csGoState,
    leagueOfLegendsState,
  } = useESportsSideBar();

  return (
    <Fragment>
      <ListItemButton
        className={
          sportTab === 0
            ? `${styles.sidebarButton} ${styles.topEvents} ${styles.activeTab}`
            : `${styles.sidebarButton} ${styles.topEvents}`
        }
        onClick={() => {
          navigate('/esports');
        }}
      >
        <ListItemIcon className={styles.homeLiveButtonIcon} style={{ minWidth: '24px' }}>
          <ImFire size={22} />
        </ListItemIcon>
        <ListItemText primary='Top Events' />
      </ListItemButton>

      {Esports.map((sport, index) => {
        let fn: any;

        let state;

        if (sport.sport === 'Dota 2') {
          fn = handleDota2;
          state = dota2State;
        } else if (sport.sport === 'CS:GO') {
          fn = handleCsGo;
          state = csGoState;
        } else if (sport.sport === 'League of Legends') {
          fn = handleLeagueOfLegends;
          state = leagueOfLegendsState;
        }

        return (
          <Fragment key={index}>
            <ListItemButton
              className={
                sportTab === index + 1
                  ? `${styles.sidebarButton} ${styles.activeTab}`
                  : `${styles.sidebarButton}`
              }
              onClick={() => {
                fn();
                setSportTab(index + 1);
              }}
            >
              <ListItemIcon className={styles.leagueIconSection}>
                <img className={styles.esportsIcon} src={sport.icon} alt={sport.sport} />
              </ListItemIcon>
              <ListItemText primary={sport.sport} />

              {state ? <ExpandLess /> : <ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
            </ListItemButton>
            <Collapse in={state} timeout='auto' unmountOnExit>
              {sport?.tournaments?.map((tournment, index) => (
                <ListItemButton
                  className={
                    leagueTab === index + 1
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  key={index}
                  onClick={() => setLeagueTab(index + 1)}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <img
                      className={styles.leagueIcon}
                      src={tournment.tournamentFlag}
                      alt='Premier League'
                    />
                  </ListItemIcon>
                  <ListItemText primary={tournment.tournamentName} />
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default EsportsButtonList;
