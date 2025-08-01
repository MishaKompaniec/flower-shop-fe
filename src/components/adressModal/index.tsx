import {
  useGetAreasQuery,
  useLazyGetCitiesQuery,
  useLazyGetStreetsQuery,
} from '@/store/services/adressApi';
import { Modal, Select, Input, Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AddressModal = ({
  open,
  onClose,
  onSubmit,
}: AddressModalProps) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const [citySearch, setCitySearch] = useState('');
  const [streetSearch, setStreetSearch] = useState('');
  const { data: areas = [], isLoading: loadingAreas } = useGetAreasQuery();
  const [fetchCities, { data: cities = [], isFetching: loadingCities }] =
    useLazyGetCitiesQuery();
  const [fetchStreets, { data: streets = [], isFetching: loadingStreets }] =
    useLazyGetStreetsQuery();

  const [selectedAreaRef, setSelectedAreaRef] = useState<string | null>(null);
  const [selectedCityRef, setSelectedCityRef] = useState<string | null>(null);

  const handleAreaChange = (areaRef: string) => {
    setSelectedAreaRef(areaRef);
    form.setFieldsValue({ city: undefined, street: undefined });
    fetchCities({ areaRef });
  };

  const handleCityChange = (cityRef: string) => {
    setSelectedCityRef(cityRef);
    form.setFieldsValue({ street: undefined });
    fetchStreets({ cityRef, streetName: '' });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      onClose();
    });
  };

  const handleCitySearch = (value: string) => {
    setCitySearch(value);
  };

  const handleStreetSearch = (value: string) => {
    setStreetSearch(value);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title={t('addressModal.title')}
    >
      <Form form={form} layout='vertical' autoComplete='off'>
        <Form.Item
          name='area'
          label={t('addressModal.area')}
          rules={[
            {
              required: true,
              message: `${t('addressModal.area')} ${t(
                'addressModal.required'
              )}`,
            },
          ]}
        >
          <Select
            placeholder={t('addressModal.placeholders.area')}
            loading={loadingAreas}
            onChange={handleAreaChange}
            options={areas.map((area) => ({
              label: area.Description,
              value: area.Ref,
            }))}
          />
        </Form.Item>

        <Form.Item
          name='city'
          label={t('addressModal.city')}
          rules={[
            {
              required: true,
              message: `${t('addressModal.city')} ${t(
                'addressModal.required'
              )}`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder={t('addressModal.placeholders.city')}
            loading={loadingCities}
            onChange={handleCityChange}
            disabled={!selectedAreaRef}
            onSearch={handleCitySearch}
            filterOption={(input, option) =>
              option
                ? option.label.toLowerCase().includes(input.toLowerCase())
                : false
            }
            options={
              citySearch
                ? cities
                    .filter((city) =>
                      city.Description.toLowerCase().includes(
                        citySearch.toLowerCase()
                      )
                    )
                    .map((city) => ({
                      label: city.Description,
                      value: city.Ref,
                    }))
                : cities.map((city) => ({
                    label: city.Description,
                    value: city.Ref,
                  }))
            }
          />
        </Form.Item>

        <Form.Item
          name='street'
          label={t('addressModal.street')}
          rules={[
            {
              required: true,
              message: `${t('addressModal.street')} ${t(
                'addressModal.required'
              )}`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder={t('addressModal.placeholders.street')}
            loading={loadingStreets}
            disabled={!selectedCityRef}
            onSearch={handleStreetSearch}
            filterOption={(input, option) =>
              option
                ? option.label.toLowerCase().includes(input.toLowerCase())
                : false
            }
            options={
              streetSearch
                ? streets
                    .filter((street) =>
                      street.Description.toLowerCase().includes(
                        streetSearch.toLowerCase()
                      )
                    )
                    .map((street) => ({
                      label: street.Description,
                      value: street.Ref,
                    }))
                : streets.map((street) => ({
                    label: street.Description,
                    value: street.Ref,
                  }))
            }
          />
        </Form.Item>

        <Form.Item
          name='houseNumber'
          label={t('addressModal.house')}
          rules={[
            {
              required: true,
              message: `${t('addressModal.house')} ${t(
                'addressModal.required'
              )}`,
            },
          ]}
        >
          <Input
            placeholder={t('addressModal.placeholders.house')}
            autoComplete='nope'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
