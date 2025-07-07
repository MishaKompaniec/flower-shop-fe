import styled from 'styled-components';
import { colors } from '../../../theme/colors';

export const Wrapper = styled.div`
  background-color: ${colors.lightPinkBg};
`;

export const InnerWrapper = styled.div`
  margin: 0 auto;
  padding: 25px 0;

  color: ${colors.black};

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 15px 10px;
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
    padding-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 7vw;
    padding-bottom: 15px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 22px;
  margin: 0 auto;
  text-align: center;
  margin-top: 15px;
  color: ${colors.black};

  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 10px;
  }
`;

export const ContactInfo = styled.div`
  width: fit-content;
  margin: 0 auto;
  color: ${colors.black};
  line-height: 1.6;
  text-align: center;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
  }
`;

export const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 20px 0;

  li {
    width: fit-content;
    padding: 10px;
    margin: 10px auto;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 15px;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 8px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
      padding: 6px;
    }
  }
`;
