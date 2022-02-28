import { Switch as SemiSwitch } from '@douyinfe/semi-ui';
import { connect, mapProps } from '@formily/react';

export const Switch = connect(
  SemiSwitch,
  mapProps({
    value: 'checked',
  })
);

export default Switch;
