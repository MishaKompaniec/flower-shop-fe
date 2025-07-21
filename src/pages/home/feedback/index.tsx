import { useTranslation } from 'react-i18next';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  FeedbackWrapper,
  FeedbackTitle,
  FeedbackText,
  InnerWrapper,
  Image,
  Title,
} from './style';
import { SwiperBreakpoints } from '@/utils/pages';
import { feedbackList } from '@/utils';

const Feedback = () => {
  const { t } = useTranslation();

  return (
    <InnerWrapper>
      <Title>{t('feedbacks.title')}</Title>
      <Swiper
        breakpoints={SwiperBreakpoints}
        slidesPerView={3}
        spaceBetween={15}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        style={{ paddingBottom: '35px' }}
        loop={feedbackList.length >= 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {feedbackList.map((item) => (
          <SwiperSlide key={item.id}>
            <FeedbackWrapper>
              <Image src={item.image} />
              <FeedbackTitle>
                {t(`feedbacks.items.${item.id}.name`)}
              </FeedbackTitle>
              <FeedbackText>
                {t(`feedbacks.items.${item.id}.feedback`)}
              </FeedbackText>
            </FeedbackWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </InnerWrapper>
  );
};

export default Feedback;
