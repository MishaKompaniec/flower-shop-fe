import { useTranslation } from 'react-i18next';

import {
  FlexWrapper,
  ImgWrapper,
  ImageItem,
  ImgBlock,
  Image1,
  Title,
  Inst,
} from './style';

const Instagram = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>
        {t('instagram.title1')}
        <Inst
          href='https://www.instagram.com/misha_kompaniec'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          {t('instagram.title2')}
        </Inst>
      </Title>
      <FlexWrapper>
        <Image1 src='/images/image1.jpg' alt='Image 1' />
        <ImgWrapper>
          <ImgBlock>
            <ImageItem src='/images/image2.jpg' alt='Image 2' />
            <ImageItem src='/images/image3.jpg' alt='Image 3' />
          </ImgBlock>
          <ImgBlock>
            <ImageItem src='/images/image4.jpg' alt='Image 4' />
            <ImageItem src='/images/image5.jpg' alt='Image 5' />
          </ImgBlock>
        </ImgWrapper>
      </FlexWrapper>
    </>
  );
};

export default Instagram;
