import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Description,
  MainWrapper,
  MainInfo,
  Wrapper,
  Title,
  Btn,
} from './style';

const Intro = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <MainWrapper>
      <Wrapper>
        <MainInfo>
          <Title>flower</Title>
          <Description>{t('intro.description')}</Description>
          <Btn type="primary" size="large" onClick={() => navigate('/store')}>
            {t('intro.btn')}
          </Btn>
        </MainInfo>
      </Wrapper>
    </MainWrapper>
  );
};

export default Intro;
