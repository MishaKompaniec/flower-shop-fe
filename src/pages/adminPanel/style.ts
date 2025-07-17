import styled from 'styled-components';
import { colors } from '@/theme/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: calc(100vh - 50px);
  margin: 50px auto 0 auto;
  padding: 0px 25px 15px 25px;
  color: ${colors.black};
  background: ${colors.lightPinkBg};

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }
`;
