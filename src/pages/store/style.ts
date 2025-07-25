import { colors } from '@/theme/colors';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  padding-top: 50px;
  background-color: ${colors.pinkBg};

  .ant-tabs .ant-tabs-tab {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    user-select: none;
    color: ${colors.pink};
  }

  @media (max-width: 768px) {
    & .ant-tabs-nav {
      padding: 0 15px 0 15px;
    }

    & .ant-tabs .ant-tabs-tab {
      font-size: 12px;
    }
  }
`;
