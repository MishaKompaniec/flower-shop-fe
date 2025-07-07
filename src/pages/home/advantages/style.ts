import styled, { keyframes } from 'styled-components';
import { colors } from '../../../theme/colors';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const InformWrapper = styled.div`
  margin: 0 auto;
  padding: 50px 25px;
  color: ${colors.black};

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  font-size: 4vw;

  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 7vw;
  }
`;

export const Info = styled.p`
  max-width: 800px;
  margin: 20px auto 40px auto;
  line-height: 25px;
  font-size: 19px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 17px;
    line-height: 23px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 20px;
    margin: 15px auto 30px auto;
  }
`;

export const AdvantagesWraper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const AdvantagesItem = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    width: fit-content;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const Img = styled.img`
  width: 40px;
  height: 40px;
  animation: ${rotate} 10s linear infinite;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Text = styled.p`
  max-width: 280px;
  line-height: 18px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`;
