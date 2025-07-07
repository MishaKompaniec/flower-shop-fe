import { FooterWrapper, FooterText, FlexBox } from './style';

const Footer = () => (
  <FooterWrapper>
    <FlexBox>
      <FooterText>+38 (093) 123-45-67</FooterText>
      <FooterText>&copy; {new Date().getFullYear()}</FooterText>
    </FlexBox>
  </FooterWrapper>
);

export { Footer };
