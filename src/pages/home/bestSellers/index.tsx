import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from '@/store/services/productsApi';
import { BasketItem } from '@/types';
import { SwiperBreakpoints } from '@/utils/pages';
import {
  addToBasket,
  toggleBasket,
  selectBasket,
} from '@/store/slices/basketSlice';
import { AppDispatch } from '@/store/store';
import {
  InnerWrapper,
  Description,
  CardTitle,
  CardInfo,
  Spinner,
  Wrapper,
  Image,
  Title,
  Price,
} from './style';

const BestSellers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const basket = useSelector(selectBasket);
  const { t } = useTranslation();

  const { data: products, isLoading: productsIsLoading } =
    useGetProductsQuery();
  const [bestSellers, setBestSellers] = useState<BasketItem[]>([]);

  useEffect(() => {
    setBestSellers(products?.filter((p) => p.isBestSellers) || []);
  }, [products]);

  if (productsIsLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper id='bestSellers'>
      <InnerWrapper>
        <Title>{t('bestSellers.title')}</Title>
        <Swiper
          breakpoints={SwiperBreakpoints}
          slidesPerView={3}
          spaceBetween={15}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          style={{ paddingBottom: '35px' }}
          loop={bestSellers.length >= 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {bestSellers.map((product) => {
            const isInCart = basket.some((item) => item.id === product.id);

            return (
              <SwiperSlide key={product.id}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={t(product.title)}
                      src={product.image ?? '/images/no-img.jpeg'}
                    />
                  }
                >
                  <CardInfo>
                    <CardTitle>{t(product.title)}</CardTitle>
                    <Description>{t(product.description)}</Description>
                    <Price>{product.price} ₴</Price>
                    <Button
                      type={isInCart ? 'default' : 'primary'}
                      onClick={() => {
                        if (isInCart) {
                          dispatch(toggleBasket());
                        } else {
                          dispatch(addToBasket(product));
                        }
                      }}
                    >
                      {isInCart
                        ? t('bestSellersBlock.viewCart')
                        : t('bestSellersBlock.addToCart')}
                    </Button>
                  </CardInfo>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default BestSellers;
