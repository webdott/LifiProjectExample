import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from '@mui/material/Skeleton';

import Card from './card';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import styles from './sidebar.module.scss';
import { Game } from '../../../constants/matches';

export interface Props {
  games: Game[];
}
function Cards({ games }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.matchesTitle}>Featured Games</p>
      <div className={styles.sideSec}>
        <div className={styles.sidebar}>
          <Swiper
            spaceBetween={10}
            slidesPerView={'auto'}
            centeredSlides={true}
            loopedSlides={0}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            watchSlidesProgress={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className='mySwiper'
          >
            {games.length > 0
              ? games.map((game, slideIndex: number) => (
                  <SwiperSlide key={slideIndex}>
                    <Card game={game} slideIndex={slideIndex} />
                  </SwiperSlide>
                ))
              : new Array(6).fill(0).map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className={styles.card}>
                      <Skeleton
                        variant='rectangular'
                        sx={{ backgroundColor: '#2c2c2e', borderRadius: '20px' }}
                        animation='wave'
                        height={311}
                        width={320}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Cards;
