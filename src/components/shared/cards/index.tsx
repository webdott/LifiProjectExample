import { useState } from 'react';
import { cardProps } from '../../../constants/games';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { OddsBoxValues } from './../../../constants/featuresGame';

import './styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './sidebar.module.scss';

function Cards({ games }: cardProps): JSX.Element {
	const [boxIndex, setBoxIndex] = useState<number>(1);

	const handleBoxIndex = (index: number) => {
		setBoxIndex((prevIndex) => (prevIndex === index ? 1 : index));
	};
	let i = 0;

	return (
		<div className={styles.container}>
			<p className={styles.matchesTitle}>Featured Games</p>
			<div className={styles.sideSec}>
				<div className={styles.sidebar}>
					<Swiper
						spaceBetween={10}
						slidesPerView={'auto'}
						centeredSlides={true}
						loop={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: true,
						}}
						pagination={{
							clickable: true,
						}}
						navigation={true}
						modules={[Autoplay, Navigation]}
						className='mySwiper'>
						{OddsBoxValues.map((slide, index: number) => {
							i++;
							if (i === 3) {
								i = 0;
							}
							return (
								<SwiperSlide key={index}>
									<div
										className={`${styles.card} ${
											i === 1
												? styles.lightCard
												: i === 0
												? styles.greenCard
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
												{/* {slide.leagueName === "premierLeague" && (
                          <YouTubeIcon style={{ color: "red" }} />
                        )} */}
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
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</div>
	);
}

export default Cards;
