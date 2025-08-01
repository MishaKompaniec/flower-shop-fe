import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  padding: 0 45px 0 30px;
  background-color: ${colors.transparentBlack};
  display: flex;
  align-items: center;
  z-index: 1000;
`;

export const LogoWrapper = styled(Link)`
  text-decoration: none;
`;

export const Logo = styled.img`
  width: 35px;
  height: 35px;
  user-select: none;

  &:hover {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in;
  }

  &:not(:hover) {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 1024px) {
    gap: 25px;
  }
`;

export const MenuItemLink = styled(NavLink).attrs(() => ({
  end: true,
}))`
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 600;
  color: ${colors.white};
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  user-select: none;

  &:hover,
  &.active {
    color: ${colors.primary};
    transform: scale(1.15);
  }
`;

export const MenuItem = styled.p`
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 600;
  color: ${colors.white};
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${colors.primary};
    transform: scale(1.15);
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

export const BurgerButton = styled.button`
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    background: none;
    border: none;
    color: ${colors.white};
    cursor: pointer;
  }
`;

export const AvatarWrapper = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-left: 15px;
  cursor: pointer;
  border-radius: 50%;
  box-sizing: border-box;

  ${({ $active }) =>
    $active &&
    `
    border: 2px solid #2ecc71;
  `}

  & .ant-avatar {
    width: 32px;
    height: 32px;
    background-color: #fff;
    color: #2ecc71;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    opacity: 0.8;
  }
`;
