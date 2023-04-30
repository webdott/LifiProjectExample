import React, { useState } from 'react';
import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { CgArrowsScrollV } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { RiSettings5Fill } from 'react-icons/ri';
import { Dropdown } from 'antd';

import MatchOddView from './matchOddView';
import { items } from '../odds';

import styles from './matchpage.module.scss';

const allOdds: Record<
  string,
  {
    matchOdds: {
      odds: string;
      oddName: string;
      id: number;
    }[];
  }
> = {
  'Match Winner': {
    matchOdds: [
      { odds: '1.25', oddName: '1', id: 1 },
      { odds: '4.25', oddName: 'x', id: 2 },
      { odds: '10.00', oddName: '3', id: 3 },
    ],
  },
  'Total Goals': {
    matchOdds: [
      { odds: '1.25', oddName: 'Over (5.5)', id: 1 },
      { odds: '4.25', oddName: 'Under (5.5)', id: 2 },
    ],
  },
  Handicap: {
    matchOdds: [
      { odds: '1.25', oddName: 'Team 1 (-0.5)', id: 1 },
      { odds: '4.25', oddName: 'Team 1 (0.5)', id: 2 },
      { odds: '4.25', oddName: 'Team 2 (-0.5)', id: 3 },
      { odds: '4.25', oddName: 'Team 2 (0.5)', id: 4 },
    ],
  },
};

const AllMatchOdds = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [gridClass, setGridClass] = useState<'fullGrid' | 'halfGrid'>('fullGrid');
  const [allCollapsed, setAllCollapsed] = useState<boolean>(false);

  return (
    <div className={styles.allMatchOdds}>
      <div className={styles.top}>
        <p>Leicester City – Manchester City Crypto Betting odds 30 April 2023</p>
        <div className={styles.actions}>
          <button
            className={gridClass === 'fullGrid' ? styles.active : ''}
            onClick={() => setGridClass('fullGrid')}
          >
            <CiGrid2H size={20} />
          </button>
          <button
            className={gridClass === 'halfGrid' ? styles.active : ''}
            onClick={() => setGridClass('halfGrid')}
          >
            <CiGrid2V size={20} />
          </button>
          <button className={showSearch ? styles.active : ''}>
            <FiSearch size={20} />
          </button>

          <div className={styles.rightIcon}>
            <Dropdown menu={{ items }} trigger={['click']} placement='bottom'>
              <button>
                <RiSettings5Fill size={24} />
              </button>
            </Dropdown>

            <button onClick={() => setAllCollapsed((allCollapsed) => !allCollapsed)}>
              <CgArrowsScrollV size={26} />
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.matchOddsContainer} ${styles?.[gridClass]}`}>
        {Object.keys(allOdds).map((odd) => (
          <MatchOddView
            key={odd}
            oddTitle={odd}
            odds={allOdds[odd].matchOdds}
            allCollapsed={allCollapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default AllMatchOdds;
