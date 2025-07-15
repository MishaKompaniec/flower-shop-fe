import { colors } from '@/theme/colors';
import { Button } from 'antd';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('/images/main-flower.jpg');
  background-size: cover;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  background-color: ${colors.transparentBlack};
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 1024px) {
    width: 70%;
    height: auto;
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 85%;
    padding: 16px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 12px;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 25px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 7vw;

  @media (max-width: 768px) {
    font-size: 9vw;
  }

  @media (max-width: 480px) {
    font-size: 10vw;
  }
`;

export const Description = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const Btn = styled(Button)`
  height: 50px;
  font-size: 20px;

  @media (max-width: 768px) {
    height: 45px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    height: 40px;
    font-size: 16px;
  }
`;
