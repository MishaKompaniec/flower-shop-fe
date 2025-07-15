import { useTranslation } from 'react-i18next';

import {
  AdvantagesWraper,
  AdvantagesItem,
  InformWrapper,
  SubTitle,
  FlexBox,
  Title,
  Info,
  Text,
  Img,
} from './style';
import type { FC } from 'react';
import { AdvantageItemProps } from '@/types';
import { useAdvantagesData } from '@/utils/pages';

const AdvantageItem: FC<AdvantageItemProps> = ({ title, text }) => (
  <AdvantagesItem>
    <Img src='/images/flower.png' alt='flower' />
    <FlexBox>
      <SubTitle>{title}</SubTitle>
      <Text>{text}</Text>
    </FlexBox>
  </AdvantagesItem>
);

const Advantages = () => {
  const { t } = useTranslation();
  const advantagesData = useAdvantagesData();

  return (
    <InformWrapper>
      <Title>{t('advantages.title')}</Title>
      <Info>{t('advantages.info')}</Info>
      <AdvantagesWraper>
        {advantagesData.map((advantage, index) => (
          <AdvantageItem key={index} {...advantage} />
        ))}
      </AdvantagesWraper>
    </InformWrapper>
  );
};

export default Advantages;
