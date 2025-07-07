import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const DrawerItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

export const Title = styled.p`
  min-width: 220px;

  @media (max-width: 768px) {
    min-width: 100px;
  }
`;

export const Price = styled.p`
  min-width: 90px;

  @media (max-width: 768px) {
    min-width: 60px;
    margin-left: auto;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const Counter = styled.span`
  display: block;
  width: 20px;
  margin: 0 10px;
  text-align: center;
`;

export const Btn = styled(Button)`
  color: ${colors.red};
  margin-left: 20px;

  &:hover {
    color: ${colors.red} !important;
  }

  &:active {
    color: ${colors.red} !important;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  color: ${colors.pink};
`;
