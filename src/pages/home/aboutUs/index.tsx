import { useTranslation } from 'react-i18next';

import {
  LeftTextBlock,
  RightTextBlock,
  Title,
  Wrapper,
  Text,
  Img,
  FlexBox,
} from './style';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Wrapper id='about-us'>
      <Title>
        {t('about-us.hero')} {t('about-us.title')}
      </Title>
      <FlexBox>
        <LeftTextBlock>{t('about-us.block1')}</LeftTextBlock>
        <Img src='/images/romashka.png' alt='flower' />
      </FlexBox>
      <FlexBox>
        <Img src='/images/romashka.png' alt='flower' />
        <RightTextBlock>{t('about-us.block2')}</RightTextBlock>
      </FlexBox>
      <FlexBox>
        <LeftTextBlock>{t('about-us.block3')}</LeftTextBlock>
        <Img src='/images/romashka.png' alt='flower' />
      </FlexBox>
      <FlexBox>
        <Img src='/images/romashka.png' alt='flower' />
        <RightTextBlock>{t('about-us.block4')}</RightTextBlock>
      </FlexBox>
      <Text>{t('about-us.block6')}</Text>
    </Wrapper>
  );
};

export default AboutUs;
