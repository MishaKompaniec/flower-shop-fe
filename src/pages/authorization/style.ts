import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.black};
  background: ${colors.lightPinkBg};
`;

export const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 30px;
  font-size: 4vw;
  color: ${colors.black};

  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 7vw;
  }
`;

export const Inner = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const LanguageSelectWrapper = styled.div`
  position: absolute;
  right: 25px;
  top: 25px;
`;
