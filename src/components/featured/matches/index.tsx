import { useEffect, useState, Fragment } from 'react';
import {
	matchesColumn,
	MatchesColumnTypes,
	MatchesEnum,
	MatchesTypes,
} from '../../../constants/matches';
import BettingOption from '../../shared/bettingOption';
import useModal from './../../../hooks/useModal';
import Odds from './odds';
import Match from './match';

import styles from './matches.module.scss';

export default function Matches({ liveMatches, upcomingMatches }: any) {
	const [matches, setMatches] = useState<MatchesTypes[]>([]);
	const [matchColumn, setMatchColumn] = useState<MatchesEnum>(MatchesEnum.LIVE);
	const [activeTabId, setActiveTabId] = useState<number>(0);
	const [activeNavIcon, setActiveNavIcon] = useState<number>(0);
	const { isOpen, toggle } = useModal();

	useEffect(() => {
		if (matchColumn === 'Live') {
			setMatches(liveMatches);
		} else if (matchColumn === 'Upcoming') {
			setMatches(upcomingMatches);
		}
	}, [matchColumn]);

	const navClick = (el: MatchesEnum, index: number) => {
		setMatchColumn(el);
		setActiveTabId(index);
		setActiveNavIcon(index);
	};

	const activeNav = (index: number) => {
		if (index === activeTabId) {
			return `${styles.navItem} ${styles.activeNavItem}`;
		} else {
			return `${styles.navItem}`;
		}
	};

	const activeIcon = (el: MatchesColumnTypes, index: number) => {
		if (index !== activeNavIcon) {
			return `${el.disableIcon}`;
		} else {
			return `${el.icon}`;
		}
	};

	const hoverActive = (e: any, el: any) => {
		e.target.firstChild.src = el.icon;
	};

	const hoverDisable = (e: any, el: any, index: number) => {
		if (index !== activeNavIcon) {
			e.target.firstChild.src = el.disableIcon;
		}
	};

	return (
		<Fragment>
			<div className={styles.matches}>
				<div className={styles.sportNav}>Sport 1</div>
				<div className={styles.navSection}>
					<div className={styles.leftNav}>
						{matchesColumn.map((el, index) => {
							return (
								<div
									key={index}
									onMouseOver={(e) => hoverActive(e, el)}
									onMouseLeave={(e) => hoverDisable(e, el, index)}
									onClick={() => navClick(el.tab, index)}
									className={activeNav(index)}>
									<img
										className={styles.tabIcon}
										src={activeIcon(el, index)}
										alt={el.tab}
									/>
									<span>{el.tab}</span>
									<div className={styles.hoverEffect}></div>
								</div>
							);
						})}
					</div>
					{/* <div className={styles.rightNav}>
            <button
              className={
                tabIndex === 1
                  ? `${styles.tab} ${styles.activeTab}`
                  : `${styles.tab}`
              }
              onClick={() => handleTabs(1)}
            >
              All
            </button>
            <button
              className={
                tabIndex === 2
                  ? `${styles.tab} ${styles.activeTab}`
                  : `${styles.tab}`
              }
              onClick={() => handleTabs(2)}
            >
              Today
            </button>
            <button
              className={
                tabIndex === 3
                  ? `${styles.tab} ${styles.activeTab}`
                  : `${styles.tab}`
              }
              onClick={() => handleTabs(3)}
            >
              Tomorrow
            </button>
          </div> */}
				</div>
				<div className={styles.matchesBottomSection}>
					<div className={styles.matchesTopSection}>
						<div className={styles.matchesTitles}>
							<div className={styles.matchesTabItem}>Match</div>
							<div className={styles.titlesRightSection}>
								<div className={styles.matchesTabItem}>Time</div>
								<div className={styles.matchesTabItem}>Odds</div>
							</div>
						</div>
						<div className={styles.titleRightSection}>
							<BettingOption />
							<Odds />
							{/* Uche: Layout button changed. Button to be replaced with another later */}
							{/* <div className={styles.rightSectionIcon}>
								<div className={styles.smallHoverEffect}></div>
							</div> */}
						</div>
					</div>
					{matches.map((match: any, index: number) => (
						<Match key={index} match={match} />
					))}
				</div>
			</div>
		</Fragment>
	);
}
