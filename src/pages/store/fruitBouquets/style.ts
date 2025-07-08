import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 15px 15px 15px 0;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Image = styled.img`
  height: 200px;
  object-fit: cover;
`;
