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
import { useEffect, useState } from 'react';

const Intro = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MainWrapper
      style={{ backgroundPosition: `${50 + offset.x}% ${50 + offset.y}%` }}
    >
      <Wrapper>
        <MainInfo>
          <Title>flower</Title>
          <Description>{t('intro.description')}</Description>
          <Btn type='primary' size='large' onClick={() => navigate('/store')}>
            {t('intro.btn')}
          </Btn>
        </MainInfo>
      </Wrapper>
    </MainWrapper>
  );
};

export default Intro;
