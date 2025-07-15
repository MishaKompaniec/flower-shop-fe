import { colors } from '@/theme/colors';
import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 auto;
  padding: 30px 25px 50px 25px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 15px 40px 15px;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  font-size: 4vw;
  color: ${colors.black};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 7vw;
  }
`;

export const Image1 = styled.img`
  width: 490px;
  height: 500px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: auto;
  }
`;

export const ImageItem = styled.img`
  width: 245px;
  height: 245px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 48%;
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ImgBlock = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const Inst = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${colors.pink};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${colors.black};
  }
`;
