import { useTranslation } from 'react-i18next';

import {
  InnerWrapper,
  ContactInfo,
  ContactList,
  SubTitle,
  Wrapper,
  Title,
} from './style';

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <Wrapper id="contacts">
      <InnerWrapper>
        <Title>{t('contacts.title')}</Title>
        <ContactInfo>
          <p>{t('contacts.address')}</p>
          <p>{t('contacts.phone')}</p>
          <p>{t('contacts.email')}</p>
          <SubTitle>{t('contacts.scheduleTitle')}</SubTitle>
          <ContactList>
            <li>{t('contacts.schedule.mon-fri')}</li>
            <li>{t('contacts.schedule.sat')}</li>
            <li>{t('contacts.schedule.sun')}</li>
          </ContactList>
          <p>{t('contacts.note')}</p>
        </ContactInfo>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Contacts;
