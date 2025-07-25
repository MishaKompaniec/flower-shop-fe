import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const CardInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.p`
  min-height: 36px;
  font-size: 14px;
  text-align: center;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.pink};
`;

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 60vh;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin: 16px 0;

  @media (max-width: 768px) {
    max-height: 50vh;
  }

  @media (max-width: 480px) {
    max-height: 40vh;
  }
`;

export const UpdateDate = styled.div`
  margin-left: auto;
  font-size: 12px;
  font-style: italic;
`;
