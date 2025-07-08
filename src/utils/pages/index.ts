import { useTranslation } from 'react-i18next';
import type { Advantage } from '../../types';

export const Pages = {
  HOME: '/',
  STORE: '/store',
  AUTHORIZATION: '/authorization',
  ADMIN: '/admin',
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

export const bestSellers = [
  {
    category: 'bestSellersBlock',
    id: 'bouquet1',
    title: 'bestSellersBlock.bouquet1.title',
    description: 'bestSellersBlock.bouquet1.description',
    price: 2150,
    image: '/images/image2.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'basket1',
    title: 'bestSellersBlock.basket1.title',
    description: 'bestSellersBlock.basket1.description',
    price: 3200,
    image: '/images/image3.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'aroma1',
    title: 'bestSellersBlock.aroma1.title',
    description: 'bestSellersBlock.aroma1.description',
    price: 1650,
    image: '/images/image4.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'roses1',
    title: 'bestSellersBlock.roses1.title',
    description: 'bestSellersBlock.roses1.description',
    price: 680,
    image: '/images/image5.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'bouquet2',
    title: 'bestSellersBlock.bouquet2.title',
    description: 'bestSellersBlock.bouquet2.description',
    price: 1450,
    image: '/images/image2.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'basket2',
    title: 'bestSellersBlock.basket2.title',
    description: 'bestSellersBlock.basket2.description',
    price: 1200,
    image: '/images/image3.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'aroma2',
    title: 'bestSellersBlock.aroma2.title',
    description: 'bestSellersBlock.aroma2.description',
    price: 900,
    image: '/images/image4.jpg',
    quantity: 1,
  },
  {
    category: 'bestSellersBlock',
    id: 'roses2',
    title: 'bestSellersBlock.roses2.title',
    description: 'bestSellersBlock.roses2.description',
    price: 1200,
    image: '/images/image5.jpg',
    quantity: 1,
  },
];
