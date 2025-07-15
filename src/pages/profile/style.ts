import { colors } from '@/theme/colors';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 50px);
  margin: 50px auto 0 auto;
  padding: 15px 25px;
  color: ${colors.black};
  background: ${colors.lightPinkBg};

  .ant-form-item:last-child {
    margin-bottom: 0;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 30px;
  font-size: 3vw;
  color: ${colors.black};

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const AvatarUploadLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: ${colors.black};

  &:hover {
    opacity: 0.8;
  }

  div {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FormWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;
