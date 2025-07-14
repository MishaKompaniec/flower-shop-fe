import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { StarFilled } from '@ant-design/icons';

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
  font-size: 12px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-height: 3em;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.pink};
`;

export const Star = styled(StarFilled)`
  position: absolute;
  top: -15px;
  right: -15px;
  color: ${colors.pink};
`;
