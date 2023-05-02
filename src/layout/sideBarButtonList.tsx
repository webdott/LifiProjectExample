import { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import { gnosis, polygon } from 'wagmi/chains';

import SportButton from '../components/shared/sportButton';
import { SportHubSlug } from '../constants/sports';
import { fetchAllGames } from '../redux/action-creators';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SportSlug } from '../constants/sports';
import { getGamesByLeageus } from '../helpers/redux';

import styles from './homelayout.module.scss';

interface Props {
  sportSlugs?: SportHubSlug[];
}

function SideBarButtonList({
  sportSlugs = [SportHubSlug.sports, SportHubSlug.esports],
}: Props): JSX.Element {
  const { selectedChain } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedSport, setSelectedSport] = useState<SportSlug | null>(null);

  useEffect(() => {
    const chainId = selectedChain
      ? selectedChain === 'polygon'
        ? polygon.id
        : gnosis.id
      : location.pathname.includes('polygon')
      ? polygon.id
      : gnosis.id;
    (async () => {
      // TODO: get sportshub info from redux state
      await fetchAllGames(chainId, sportSlugs)(dispatch);
    })();
  }, [selectedChain, location.pathname]);

  const [sportTab, setSportTab] = useState<number>(-1);
  const [leagueTab, setLeagueTab] = useState<number>(1);

  return (
    <Fragment>
      {getGamesByLeageus(sportSlugs).map((sport, index) => {
        return (
          <Fragment key={index}>
            <SportButton
              selected={selectedSport === sport.sportSlug}
              sportTab={sportTab}
              setSportTab={setSportTab}
              fn={() =>
                setSelectedSport((prev) => (prev === sport.sportSlug ? null : sport.sportSlug))
              }
              index={index}
              sport={sport}
            />

            <Collapse in={selectedSport === sport.sportSlug} timeout='auto' unmountOnExit>
              {sport?.leagues?.map((league: any, index: number) => (
                <ListItemButton
                  className={
                    leagueTab === index + 1
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  key={index}
                  onClick={() => setLeagueTab(index + 1)}
                >
                  <ListItemIcon className={styles.leagueIconSection}>
                    <img className={styles.leagueIcon} src={league.flag} alt='Premier League' />
                  </ListItemIcon>
                  <ListItemText primary={league.name} />
                  <span className={styles.leagueNumber}>{league.games.length}</span>
                </ListItemButton>
              ))}
            </Collapse>
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default SideBarButtonList;
