import { colors } from '@/theme/colors';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 50px 20px;

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }
`;

export const Title = styled.h1`
  font-size: 4vw;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 6vw;
  }

  @media (max-width: 480px) {
    font-size: 7vw;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 250px);
  gap: 5px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 200px);
    gap: 5px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 200px);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 5px;
  }
`;

export const LargeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column: span 2;
  grid-row: span 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    grid-column: span 2;
    grid-row: span 1;
    height: 100%;
  }

  @media (max-width: 480px) {
    grid-column: 1 / -1;
    grid-row: auto;
    height: auto;
  }
`;

export const SmallImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    height: auto;
  }
`;

export const Inst = styled.a`
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  cursor: pointer;
  color: ${colors.pink};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${colors.black};
  }
`;
