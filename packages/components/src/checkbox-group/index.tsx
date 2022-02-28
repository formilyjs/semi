import { connect, mapProps } from '@formily/react';
import { CheckboxGroup as SemiCheckboxGroup } from '@douyinfe/semi-ui';

export const CheckboxGroup = connect(
  SemiCheckboxGroup,
  mapProps({
    dataSource: 'options',
  })
);

export default CheckboxGroup;
