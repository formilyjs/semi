import React from 'react';
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as SemiSelect } from '@douyinfe/semi-ui';
import { IconLoading } from '@douyinfe/semi-icons';
import { PreviewText } from '../preview-text'
export const Select = connect(
  SemiSelect,
  mapProps<any>(
    {
      loading: true,
      dataSource: 'optionList',
    },
    (props, field) => {
      return {
        ...props,
        suffix:
          field?.['loading'] || field?.['validating'] ? (
            <IconLoading />
          ) : (
            props.suffix
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
