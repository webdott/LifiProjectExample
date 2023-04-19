import { FC, useState } from 'react';

import { oddsBoxProps } from '../../../constants/featuresGame';

import styles from './sidebar.module.scss';

interface CardProps {
	slide: oddsBoxProps;
	slideIndex: number;
}

const Card: FC<CardProps> = ({ slide, slideIndex }) => {
	const [boxIndex, setBoxIndex] = useState<number>(-1);

	const handleBoxIndex = (index: number) => {
		setBoxIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	return (
		<div
			className={`${styles.card} ${
				boxIndex > -1
					? styles.greenCard
					: slideIndex % 2 === 0
					? styles.lightCard
					: styles.darkCard
			}`}>
			<div className={styles.card_content}>
				<div className={styles.card_content_league}>
					{/* <img
                          src={slide.leagueLogo}
                          alt='league'
                          className={styles.card_content_league_laliga}
                        /> */}
				</div>
				{/* <div className={styles.card_content_teams}>
												<div>
													<img src={slide.team1Logo} alt='leicester' />
												</div>
												<div className={styles.card_content_teams_goals}>
													<span>{slide.score}</span>
												</div>
												<div>
													<img src={slide.team2Logo} alt='napoli' />
												</div>
											</div> */}
				<div className={styles.card_content_time}>
					<span>{slide.time}</span>
				</div>
				<div className={styles.card_content_teamOneScore}>
					<span>{slide.team1Name}</span>
					{/* <span>{slide.team1Percent}</span> */}
				</div>
				<div className={styles.card_content_teamTwoScore}>
					<span>{slide.team2Name}</span>
					{/* <span>{slide.team2Percent}</span> */}
				</div>

				<div className={styles.card_content_oddboxes}>
					{slide.box.map((box, index) => (
						<div
							key={index}
							className={
								boxIndex === box.id
									? `${styles.card_content_oddboxes_box} ${styles.card_content_oddboxes_activeBox}`
									: `${styles.card_content_oddboxes_box}`
							}
							onClick={() => handleBoxIndex(box.id)}>
							<div>{box.val1}</div>
							<div>{box.val2}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card;
