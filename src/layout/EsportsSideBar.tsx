import { Fragment, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Esports } from './../constants/leftSidebar';
import { useSideBar } from '../hooks/useSideBar';

import styles from './homelayout.module.scss';

function EsportsButtonList(): JSX.Element {
	const [sportTab, setSportTab] = useState<number>(1);
	const [leagueTab, setLeagueTab] = useState<number>(1);

	const { handleFootBall, handleBasketBall, footBallState, basketBallState } =
		useSideBar();

	return (
		<Fragment>
			{Esports.map((sport, index) => {
				let fn: any;

				let state;

				if (sport.sport === 'Dota 2') {
					fn = handleFootBall;
					state = footBallState;
				} else if (sport.sport === 'CS:GO') {
					fn = handleBasketBall;
					state = basketBallState;
				}
				return (
					<Fragment key={index}>
						<ListItemButton
							className={
								sportTab === index + 1
									? `${styles.sidebarButton} ${styles.activeTab}`
									: `${styles.sidebarButton}`
							}
							onClick={() => {
								fn();
								setSportTab(index + 1);
							}}>
							<ListItemIcon className={styles.leagueIconSection}>
								<img
									className={styles.esportsIcon}
									src={sport.icon}
									alt={sport.sport}
								/>
							</ListItemIcon>
							<ListItemText primary={sport.sport} />

							{state ? (
								<ExpandLess />
							) : (
								<ArrowForwardIosIcon sx={{ fontSize: 16 }} />
							)}
						</ListItemButton>
						<Collapse in={state} timeout='auto' unmountOnExit>
							{sport?.tournaments?.map((tournment, index) => (
								<ListItemButton
									className={
										leagueTab === index + 1
											? `${styles.sidebarButton} ${styles.activeTab}`
											: `${styles.sidebarButton}`
									}
									key={index}
									onClick={() => setLeagueTab(index + 1)}>
									<ListItemIcon>
										<img
											className={styles.leagueIcon}
											src={tournment.tournamentFlag}
											alt='Premier League'
										/>
									</ListItemIcon>
									<ListItemText primary={tournment.tournamentName} />
								</ListItemButton>
							))}
						</Collapse>
					</Fragment>
				);
			})}
		</Fragment>
	);
}

export default EsportsButtonList;
