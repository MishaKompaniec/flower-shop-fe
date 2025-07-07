import i18n from 'i18next';

import { Select as AntSelect } from './style';

const LanguageSelect = () => {
  return (
    <AntSelect
      popupClassName='custom-select-dropdown'
      defaultValue={i18n.language}
      onChange={(value) => {
        i18n.changeLanguage(String(value));
      }}
      options={[
        { value: 'en', label: 'EN' },
        { value: 'ru', label: 'RU' },
        { value: 'ua', label: 'UA' },
      ]}
    />
  );
};

export { LanguageSelect };
