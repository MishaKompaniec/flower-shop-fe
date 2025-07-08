import { Select as AntSelect } from 'antd';
import styled, { css } from 'styled-components';
import { colors } from '../../theme/colors';

export const Select = styled(AntSelect)<{ isBlack?: boolean }>`
  &&& {
    ${({ isBlack }) => {
      const color = isBlack ? colors.black : colors.white;
      const background = isBlack
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(255, 255, 255, 0.1)';
      return css`
        .ant-select-selector {
          background-color: transparent;
          border: 1px solid ${color};
          box-shadow: none !important;
          color: ${color};
        }

        &:hover .ant-select-selector {
          border: 1px solid ${color} !important;
        }

        &.ant-select-focused .ant-select-selector,
        &.ant-select-open .ant-select-selector {
          border: 1px solid ${color} !important;
          background-color: transparent;
          box-shadow: none !important;
        }

        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          color: ${color};
        }

        .ant-select-arrow {
          color: ${color};
        }

        .ant-select-dropdown {
          background-color: transparent;
          color: ${color};
        }

        .ant-select-item-option-content {
          color: ${color};
        }

        .ant-select-item-option-active {
          background-color: ${background};
        }
      `;
    }}
  }
`;
