import { Fragment, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import SportButton from '../components/shared/sportButton';
import { SportHubSlug } from '../constants/sports';
import { SportSlug } from '../constants/sports';
import { getGamesByLeageus } from '../helpers/redux';
import FlagIcon from '../components/shared/icons/FlagIcon';

import styles from './homelayout.module.scss';

interface Props {
  sportHubSlugs?: SportHubSlug[];
}

function SideBarButtonList({
  sportHubSlugs = [SportHubSlug.sports, SportHubSlug.esports],
}: Props): JSX.Element {
  // const gamesLoading = useTypedSelector((state) => state.games.loading);
  const [selectedSport, setSelectedSport] = useState<SportSlug | null>(null);

  const [sportTab, setSportTab] = useState<number>(-1);
  const [leagueTab, setLeagueTab] = useState<number>(1);

  return (
    <Fragment>
      {getGamesByLeageus(sportHubSlugs).map((sport, index) => {
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
                    <FlagIcon countryCode={league.country.slug} />
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
