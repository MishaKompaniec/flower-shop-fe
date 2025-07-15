import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import {
  InnerWrapper,
  Description,
  CardTitle,
  CardInfo,
  Wrapper,
  Image,
  Title,
  Price,
  Spinner,
} from './style';

import { SwiperBreakpoints } from '../../../utils/pages';
import { useGetProductsQuery } from '../../../services/productsApi';
import type { BasketItem } from '../../../types';
import { useEffect, useState } from 'react';
import { useCart } from '../../../context/basketContext';

const BestSellers = () => {
  const { basket, addToBasket, toggleBasket } = useCart();
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
          loop
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
                      src={
                        product.image ? product.image : '/images/no-img.jpeg'
                      }
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
                          toggleBasket();
                        } else {
                          addToBasket(product);
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
