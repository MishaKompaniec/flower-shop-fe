import { colors } from '@/theme/colors';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 25px 25px 50px 25px;
  color: ${colors.black};

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 20px;
  }
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

export const Text = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding-top: 20px;
  text-align: center;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const LeftTextBlock = styled.div`
  max-width: 600px;
  font-size: 16px;
  text-align: justify;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const RightTextBlock = styled(LeftTextBlock)``;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  margin: 20px;
  animation: ${rotate} 10s linear infinite;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 15px;
  }

  @media (max-width: 480px) {
    width: 65px;
    height: 65px;
    margin: 15px;
  }
`;
