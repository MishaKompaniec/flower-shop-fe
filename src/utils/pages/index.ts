import { Advantage } from '@/types';
import { useTranslation } from 'react-i18next';

export const Pages = {
  HOME: '/',
  STORE: '/store',
  AUTHORIZATION: '/authorization',
  ADMIN: '/admin',
  PROFILE: '/profile',
};

export const SwiperBreakpoints = {
  0: {
    slidesPerView: 1,
    centeredSlides: true,
  },
  480: {
    slidesPerView: 1.2,
    centeredSlides: true,
  },
  640: {
    slidesPerView: 2,
    centeredSlides: false,
  },
  768: {
    slidesPerView: 2.5,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 3,
    centeredSlides: false,
  },
  1280: {
    slidesPerView: 4,
    centeredSlides: false,
  },
  1536: {
    slidesPerView: 5,
    centeredSlides: false,
  },
};

export const useAdvantagesData = (): Advantage[] => {
  const { t } = useTranslation();

  return [
    {
      title: t('advantages.cards.prices.title'),
      text: t('advantages.cards.prices.text'),
    },
    {
      title: t('advantages.cards.fresh.title'),
      text: t('advantages.cards.fresh.text'),
    },
    {
      title: t('advantages.cards.florists.title'),
      text: t('advantages.cards.florists.text'),
    },
  ];
};
