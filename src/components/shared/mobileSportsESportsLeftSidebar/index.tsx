import { useCallback, FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import LeftSideBar from '../../../layout/sideBarButtonList';
import { SportHubSlug } from '../../../constants/sports';

import styles from './mobileleftsidebar.module.scss';
import { useDispatch } from 'react-redux';
import { getSelectedChainFromBase } from '../../../functions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { fetchFeaturedGames, fetchGames, fetchSports } from '../../../redux/action-creators';

import { gnosis, polygon } from 'wagmi/chains';

interface MobileSportsESportsLeftSidebarLinksProps {
  closeDrawer: () => void;
  goBack: () => void;
  pageTitle: string;
}

const MobileSportsESportsLeftSidebarLinks: FC<MobileSportsESportsLeftSidebarLinksProps> = ({
  closeDrawer,
  goBack,
  pageTitle,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const chainId =
    getSelectedChainFromBase(location.pathname) === 'polygon' ? polygon.id : gnosis.id;

  const {
    list: { data: sportsData },
  } = useTypedSelector((state) => state.sports);

  const { currentSportSlug, currentLeagueSlug, currentCountrySlug } = useTypedSelector(
    (state) => state.games
  );

  useEffect(() => {
    (async () => {
      await fetchSports({
        chainId,
        hubSlugs: [pageTitle === 'Sports' ? SportHubSlug.sports : SportHubSlug.esports],
      })(dispatch);
    })();
  }, []);

  useEffect(() => {
    fetchGames({
      chainId,
      sportSlug: currentSportSlug,
      leagueSlug: currentLeagueSlug,
      countrySlug: currentCountrySlug,
    })(dispatch);
    fetchFeaturedGames({ chainId })(dispatch);
  }, [chainId, sportsData, currentLeagueSlug, currentSportSlug]);

  const getSportHubSlugs = useCallback(() => {
    if (pageTitle === 'Esports') return [SportHubSlug.esports];
    if (pageTitle === 'Sports') return [SportHubSlug.sports];

    return [SportHubSlug.sports, SportHubSlug.esports];
  }, [location]);

  const List = () => (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }} role='presentation'>
      <div className={styles.mobileLeftSidebar}>
        <div className={styles.container}>
          <ListItemButton
            className={styles.closeDrawer}
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            <ListItemIcon className={styles.close} style={{ minWidth: '24px' }}>
              <IoMdClose size={24} />
            </ListItemIcon>
          </ListItemButton>

          <div className={styles.title} onClick={goBack}>
            <HiOutlineChevronLeft size={20} />
            <p>{pageTitle}</p>
          </div>

          <Divider sx={{ background: '#fff', opacity: 0.5 }} />

          <div className={styles.leagues}>
            <LeftSideBar
              sportHubSlugs={getSportHubSlugs()}
              sportsHub={pageTitle.toLowerCase()}
              closeDrawer={closeDrawer}
            />
          </div>
        </div>
      </div>
    </Box>
  );

  return <List />;
};

export default MobileSportsESportsLeftSidebarLinks;
