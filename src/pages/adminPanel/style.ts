import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Button } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 75px);
  margin: 50px auto 0 auto;
  padding: 25px 25px 50px 25px;
  color: ${colors.black};
  background: ${colors.lightPinkBg};

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }
`;

export const Btn = styled(Button)`
  height: 50px;
  margin: 0 auto;
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
