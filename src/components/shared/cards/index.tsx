import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cardProps } from '../../../constants/games';
import { OddsBoxValues } from './../../../constants/featuresGame';
import Card from './card';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import styles from './sidebar.module.scss';

function Cards({ games }: cardProps): JSX.Element {
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
            {OddsBoxValues.map((slide, slideIndex: number) => (
              <SwiperSlide key={slideIndex}>
                <Card slide={slide} slideIndex={slideIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Cards;
