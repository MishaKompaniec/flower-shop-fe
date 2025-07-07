import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const MobileMenuDrawerEl = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: ${colors.pink};
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 9999;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
`;

export const MenuItemLink = styled(Link)`
  font-size: 20px;
  color: white;
  text-decoration: none;
`;

export const MenuItem = styled.p`
  font-size: 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
  cursor: pointer;
  color: ${colors.white};
  font-size: 20px;
`;
