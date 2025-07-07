import { Button } from 'antd';
import styled from 'styled-components';

import { colors } from '../../theme/colors';
import BasketIcon from '../../icon/basket';

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const Logo = styled.img`
  width: 35px;
  height: 35px;
`;

export const List = styled.ul`
  padding: 0;
`;

export const Total = styled.div`
  width: fit-content;
  margin: 0 auto;
  font-weight: 500;
`;

export const BasketWrapper = styled.div`
  position: relative;
  height: 28px;
`;

export const Basket = styled(BasketIcon)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${colors.primary};
    transform: scale(1.15);
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

export const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -9px;
  background: ${colors.pink};
  color: ${colors.white};
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
