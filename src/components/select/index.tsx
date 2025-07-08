import i18n from 'i18next';
import { Select } from './style';
import type { FC } from 'react';

type LanguageSelectProps = {
  isBlack?: boolean;
};

const LanguageSelect: FC<LanguageSelectProps> = ({ isBlack }) => {
  return (
    <Select
      $isBlack={isBlack}
      classNames={{ popup: { root: 'custom-select-dropdown' } }}
      defaultValue={i18n.language}
      onChange={(value) => i18n.changeLanguage(String(value))}
      options={[
        { value: 'en', label: 'EN' },
        { value: 'ru', label: 'RU' },
        { value: 'ua', label: 'UA' },
      ]}
    />
  );
};

export { LanguageSelect };
