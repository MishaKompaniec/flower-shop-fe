import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const OrderCard = styled.div`
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const DateText = styled.div`
  color: #666;
  font-size: 14px;
`;

export const Status = styled.div<{ status: string }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'processing':
        return 'blue';
      case 'cancelled':
        return 'red';
      default:
        return '#999';
    }
  }};
`;

export const ProductList = styled.div`
  margin: 15px 0 15px 0;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Title = styled.div`
  font-weight: 500;
`;

export const Details = styled.div`
  color: #555;
`;

export const Total = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  margin-top: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
