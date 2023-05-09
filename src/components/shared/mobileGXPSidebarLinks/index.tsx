import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IoMdClose } from 'react-icons/io';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import { navBarLinks } from '../../../constants/sidebar';
import { getSelectedChainFromBase } from '../../../functions';

import styles from './mobilegxpleftsidebar.module.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';

interface MobileGXPLeftSidebarLinksProps {
  closeDrawer: () => void;
  goBack: () => void;
}

const MobileGXPLeftSidebarLinks: FC<MobileGXPLeftSidebarLinksProps> = ({ closeDrawer, goBack }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(
      path.includes('help') ? path : `/${getSelectedChainFromBase(location.pathname)}${path}`
    );
  };

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
            <p>Membership</p>
          </div>

          <Divider sx={{ background: '#fff', opacity: 0.5 }} />

          <div className={styles.sidebarNav}>
            {navBarLinks.map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    location.pathname ===
                      `/${getSelectedChainFromBase(location.pathname)}${el.path}` ||
                    location.pathname === `${el.path}`
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

  return <List />;
};

export default MobileGXPLeftSidebarLinks;
