import { Fragment, useCallback, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import SportButton from '../components/shared/sportButton';
import { SportHubSlug } from '../constants/sports';
import FlagIcon from '../components/shared/icons/FlagIcon';

import styles from './sidebarbuttonlist.module.scss';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  setCurrentCountrySlug,
  setCurrentLeagueSlug,
  setCurrentSportSlug,
} from '../redux/action-creators';
import { useDispatch } from 'react-redux';
import { getSportsWithGames, getOrderedSports } from '../helpers/redux';
import { League, Sport } from '../constants/matches';
import { AzuroSport } from '../redux/reducers/sports';
import { AzuroLeague } from '../redux/reducers/games';

interface Props {
  sportHubSlugs: SportHubSlug[];
}

function SideBarButtonList({ sportHubSlugs }: Props): JSX.Element {
  const { data: sportData, loading } = useTypedSelector((state) => state.sports.list);
  const dispatch = useDispatch();
  const { currentSportSlug, currentLeagueSlug, currentCountrySlug } = useTypedSelector(
    (state) => state.games
  );

  const handleSportClick = useCallback(
    (sport: Sport) => {
      if (currentSportSlug === sport.slug) {
        setCurrentSportSlug(null)(dispatch);
        setCurrentLeagueSlug(null)(dispatch);
        setCurrentCountrySlug(null)(dispatch);
      } else setCurrentSportSlug(sport.slug)(dispatch);
    },
    [dispatch, currentSportSlug]
  );

  const handleLeagueClick = useCallback(
    (league: League) => {
      setCurrentLeagueSlug(league.slug)(dispatch);
      setCurrentCountrySlug(league.country.slug)(dispatch);
    },
    [dispatch]
  );

  return (
    <div className={styles.leagues}>
      {getOrderedSports(sportHubSlugs).map((sport, index) => {
        return (
          <Fragment key={index}>
            <SportButton
              selected={currentSportSlug === sport.slug}
              onClick={() => handleSportClick(sport)}
              index={index}
              sport={sport}
            />

            <Collapse in={currentSportSlug === sport.slug} timeout='auto' unmountOnExit>
              {sport.leagues?.map((league, index) => (
                <ListItemButton
                  className={
                    currentLeagueSlug === league.slug && currentCountrySlug === league.country.slug
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  key={index}
                  onClick={() => handleLeagueClick(league)}
                >
                  <ListItemIcon className={styles.leagueIconSection}>
                    <FlagIcon countryCode={league.country.slug} />
                  </ListItemIcon>
                  <ListItemText primary={league.name} />
                  <span className={styles.leagueNumber}>{league.games?.length || 0}</span>
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        );
      })}
    </div>
  );
}

export default SideBarButtonList;
