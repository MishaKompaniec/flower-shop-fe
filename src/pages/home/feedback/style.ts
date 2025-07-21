import styled from 'styled-components';
import { colors } from '@/theme/colors';

export const InnerWrapper = styled.div`
  margin: 0 auto;
  padding: 25px;
  color: ${colors.black};

  .swiper-pagination-bullet-active {
    background-color: ${colors.primary}!important;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
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

export const FeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const FeedbackTitle = styled.h3`
  font-size: 18px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const FeedbackText = styled.p`
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;
