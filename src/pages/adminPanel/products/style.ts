import styled from 'styled-components';
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { colors } from '@/theme/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: calc(100vh - 50px);
  color: ${colors.black};
  background: ${colors.lightPinkBg};

  @media (max-width: 768px) {
    padding: 20px 15px 40px 15px;
  }

  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 10px;
    font-size: 13px;
  }

  .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(2),
  .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(5),
  .ant-table-wrapper .ant-table-tbody > tr > td:nth-child(6) {
    text-align: center;
  }

  .ant-table-wrapper .ant-table-thead > tr > th:nth-child(2),
  .ant-table-wrapper .ant-table-thead > tr > th:nth-child(5),
  .ant-table-wrapper .ant-table-thead > tr > th:nth-child(6) {
    text-align: center;
  }
`;

export const Btn = styled(Button)`
  height: 40px;
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

export const WrapperCheckOutlined = styled.div`
  width: 100%;
`;

export const CheckOutlinedAnt = styled(CheckOutlined)`
  display: block;
  margin: 0 auto;
  color: ${colors.pink};
  font-size: 16px;
`;

export const UploadWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
