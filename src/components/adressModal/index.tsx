import {
  useGetAreasQuery,
  useLazyGetCitiesQuery,
  useLazyGetStreetsQuery,
} from '@/store/services/adressApi';
import { Modal, Select, Input, Form } from 'antd';
import { useState } from 'react';

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
  const [form] = Form.useForm();
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

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title='Выберите адрес'
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='area' label='Область' rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder='Выберите область'
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
          label='Населённый пункт'
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder='Выберите город'
            loading={loadingCities}
            onChange={handleCityChange}
            disabled={!selectedAreaRef}
            options={cities.map((city) => ({
              label: city.Description,
              value: city.Ref,
            }))}
          />
        </Form.Item>

        <Form.Item name='street' label='Улица' rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder='Выберите улицу'
            loading={loadingStreets}
            disabled={!selectedCityRef}
            options={streets.map((street) => ({
              label: street.Description,
              value: street.Ref,
            }))}
          />
        </Form.Item>

        <Form.Item name='houseNumber' label='Дом' rules={[{ required: true }]}>
          <Input placeholder='Номер дома' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
