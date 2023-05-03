import { useEffect, useRef, useState } from 'react';
import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { CgArrowsScrollV } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { RiSettings5Fill } from 'react-icons/ri';
import { XMasonry, XBlock } from 'react-xmasonry';
import { Dropdown } from 'antd';

import MatchOddView from './matchOddView';
import SearchMarkets from './searchMarkets';
import Odds, { items } from '../odds';

import styles from './matchpage.module.scss';
import { Game } from '../../../../constants/matches';

interface Props {
  game: Game | null;
}
const AllMatchOdds = ({ game }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMasonry, setShowMasonry] = useState<boolean>(false);
  const [halfWidth, setHalfWidth] = useState<number>(900);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [gridClass, setGridClass] = useState<'fullGrid' | 'halfGrid'>('fullGrid');
  const [allCollapsed, setAllCollapsed] = useState<boolean>(false);

  useEffect(() => {
    // get width of masonry container in order to get accurate width for get block
    // delay rendering of masonry component after setting width for it to take effect
    setHalfWidth((containerRef?.current?.offsetWidth ?? 1800) / 2);
    if (containerRef?.current) {
      window.addEventListener('resize', (evt) => {
        setHalfWidth((containerRef?.current?.offsetWidth ?? 1800) / 2);
      });
    }
    setTimeout(() => {
      setShowMasonry(true);
    }, 500);
  }, [containerRef?.current]);
  if (!game) return null;
  return (
    <div className={styles.allMatchOdds}>
      <div className={styles.top}>
        <p>
          {game?.participant1.name} – {game?.participant2.name} Crypto Betting odds{' '}
          {game?.startsAt.format('DD MMM YYYY')}:
        </p>
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
          <button className={showSearch ? styles.active : ''} onClick={() => setShowSearch(true)}>
            <FiSearch size={20} />
          </button>

          {showSearch && (
            <SearchMarkets
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setShowSearch={setShowSearch}
            />
          )}

          <div className={styles.rightIcon}>
            <Odds showSettingsIcon />

            <button onClick={() => setAllCollapsed((allCollapsed) => !allCollapsed)}>
              <CgArrowsScrollV size={26} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.matchOddsContainer} ref={containerRef}>
        {showMasonry && (
          <XMasonry targetBlockWidth={halfWidth} smartUpdateCeil={100}>
            {game?.markets.map((market) => (
              <XBlock key={market.marketName} width={gridClass === 'halfGrid' ? 1 : 2}>
                <MatchOddView
                  marketDescription={market.marketDescription}
                  oddTitle={market.marketName}
                  outcomes={market.outcomes}
                  allCollapsed={allCollapsed}
                />
              </XBlock>
            ))}
          </XMasonry>
        )}
      </div>
    </div>
  );
};

export default AllMatchOdds;
