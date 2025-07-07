import { Select as AntSelect } from 'antd';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const Select = styled(AntSelect)`
  &&& {
    .ant-select-selector {
      background-color: transparent;
      border: 1px solid ${colors.white};
      box-shadow: none !important;
      color: ${colors.white};
    }

    &:hover .ant-select-selector {
      border: 1px solid ${colors.white} !important;
    }

    &.ant-select-focused .ant-select-selector,
    &.ant-select-open .ant-select-selector {
      border: 1px solid ${colors.white} !important;
      background-color: transparent;
      box-shadow: none !important;
    }

    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      color: ${colors.white};
    }

    .ant-select-arrow {
      color: ${colors.white};
    }

    .ant-select-dropdown {
      background-color: transparent;
      color: ${colors.white};
    }

    .ant-select-item-option-content {
      color: ${colors.white};
    }

    .ant-select-item-option-active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;
