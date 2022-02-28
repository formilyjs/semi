import { connect, mapProps } from "@formily/react";
import { TimePicker as SemiTimePicker } from "@douyinfe/semi-ui";

export const TimePicker = connect(
  SemiTimePicker,
  mapProps((props) => {
    const { onChange } = props;
    return {
      ...props,
      onChange: (time, timeStr: any) => {
        if (onChange) {
          onChange(timeStr, timeStr);
        }
      },
    };
  })
);

export default TimePicker;
