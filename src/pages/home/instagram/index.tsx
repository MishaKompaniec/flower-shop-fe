import { useTranslation } from 'react-i18next';
import { Container, Title, Grid, LargeImage, SmallImage, Inst } from './style';

const Instagram = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>
        {t('instagram.title1')}{' '}
        <Inst
          href='https://www.instagram.com/misha_kompaniec'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('instagram.title2')}
        </Inst>
      </Title>
      <Grid>
        <LargeImage src='/images/image1.jpg' alt='Image 1' />
        <SmallImage src='/images/image2.jpg' alt='Image 2' />
        <SmallImage src='/images/image3.jpg' alt='Image 3' />
        <SmallImage src='/images/image4.jpg' alt='Image 4' />
        <SmallImage src='/images/image5.jpg' alt='Image 5' />
      </Grid>
    </Container>
  );
};

export default Instagram;
