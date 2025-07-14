import { Spin } from 'antd';
import { Wrapper } from './style';

const Spinner = () => {
  return (
    <Wrapper>
      <Spin size='large' />
    </Wrapper>
  );
};

export { Spinner };
