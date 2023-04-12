import { FC, useState } from 'react';

import styles from './matches.module.scss';
import { MatchesTypes } from '../../../constants/matches';

interface MatchProps {
	match: MatchesTypes;
}

const Match: FC<MatchProps> = ({ match }) => {
	const [tabIndex, setTabIndex] = useState<number>(1);

	const handleTabs = (index: number) => {
		setTabIndex((prevTabIndex) => (prevTabIndex === index ? -1 : index));
	};

	return (
		<div className={styles.match}>
			<div className={styles.matchLeftSection}>
				<p>
					{/* <img src={match.leagueLogo} alt={match.leagueName} />{" "} */}
					{match.leagueName}
				</p>
				<ul>
					<li className={styles.team1Section}>
						<span>{match.team1}</span>{' '}
						<img src={match.team1Logo} alt={match.team1} />
					</li>
					<li className={styles.scores}>{match.score}</li>
					<li className={styles.team2Section}>
						<span>{match.team2}</span> <img src={match.team2Logo} alt='' />
					</li>
					<li className={styles.matchTime}>{match.timeLabel}</li>
				</ul>
			</div>
			<ul className={styles.matchRightSection}>
				{match.matchOdds.map((item: any, index: number) => {
					return (
						<li
							key={index}
							className={tabIndex === item.id ? styles.activeTab : ''}
							onClick={() => handleTabs(item.id)}>
							<span>{item.oddName}</span>
							<span>{item.odds}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Match;
