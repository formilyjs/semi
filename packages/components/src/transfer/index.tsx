import { connect, mapProps } from '@formily/react';
import { Transfer as SemiTransfer } from '@douyinfe/semi-ui';

export const Transfer = connect(
  SemiTransfer,
  mapProps({
    value: true,
    dataSource: true,
  })
);

export default Transfer;
