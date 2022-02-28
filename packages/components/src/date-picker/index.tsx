import { connect, mapProps } from '@formily/react';
import { DatePicker as SemiDatePicker } from '@douyinfe/semi-ui';

export const DatePicker = connect(
  SemiDatePicker,
  mapProps(props => {
    const { onChange } = props;
    return {
      ...props,
      onChange: (date, dateStr) => {
        if (onChange) {
          // 这种方式破坏了原有属性
          onChange(dateStr);
        }
      },
    };
  })
);

export default DatePicker;
