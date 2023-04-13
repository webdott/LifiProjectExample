import { FC, useState } from 'react';

import styles from './matches.module.scss';
import { MatchType } from '../../../constants/matches';

interface MatchProps {
	match: MatchType;
}

const Match: FC<MatchProps> = ({ match }) => {
	const [tabIndex, setTabIndex] = useState<number>(1);

	const handleTabs = (index: number) => {
		setTabIndex((prevTabIndex) => (prevTabIndex === index ? -1 : index));
	};

	return (
		<div className={styles.match}>
			<div className={styles.matchLeftSection}>
				<ul>
					<li className={styles.team1Section}>
						<span>{match.team1}</span>{' '}
					</li>
					<li>
						<span>-</span>
					</li>
					<li className={styles.team2Section}>
						<span>{match.team2}</span>{' '}
					</li>
				</ul>
			</div>
			<div className={styles.matchTime}>
				<p>{match.timeLabel}</p>
				<p>{match.time}</p>
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
