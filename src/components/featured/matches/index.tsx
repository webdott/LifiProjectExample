import { Fragment } from 'react';
import { LeagueType, MatchesEnum } from '../../../constants/matches';
import BettingOption from '../../shared/bettingOption';
import Odds from './odds';
import Match from './match';

import styles from './matches.module.scss';

export default function Matches({
	league,
	matchColumn,
}: {
	league: LeagueType;
	matchColumn: MatchesEnum;
}) {
	const matches = league.matches.filter((match) =>
		matchColumn === 'All' ? Boolean(match) : match.timeLabel === matchColumn
	);

	return (
		<Fragment>
			{matches.length > 0 ? (
				<div className={styles.matchesBottomSection}>
					<div className={styles.matchesTopSection}>
						<div className={styles.matchesTitles}>
							<p className={styles.leagueName}>{league.leagueName}</p>
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
					{league.matches
						.filter((match) =>
							matchColumn === 'All'
								? Boolean(match)
								: match.timeLabel === matchColumn
						)
						.map((match, index: number) => (
							<Match key={index} match={match} />
						))}
				</div>
			) : null}
		</Fragment>
	);
}
