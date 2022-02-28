import { connect, mapProps } from "@formily/react";
import { RadioGroup as SemiRadioGroup } from '@douyinfe/semi-ui';

export const RadioGroup = connect(
  SemiRadioGroup,
  mapProps({
    dataSource: 'options'
  })
);

export default RadioGroup;
