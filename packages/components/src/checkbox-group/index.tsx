import React, { FC, useMemo } from "react";
import { connect, mapProps } from "@formily/react";
import {
  Checkbox,
  CheckboxGroup as SemiCheckboxGroup,
} from "@douyinfe/semi-ui";
import { CheckboxGroupProps } from "@douyinfe/semi-ui/lib/es/checkbox";

const OriginCheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { options = [], ...rest } = props;

  const finalOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { label: opt, value: opt };
      } else {
        return opt;
      }
    });
  }, [options]);

  return (
    <SemiCheckboxGroup {...rest}>
      {finalOptions.map(({ label, value, ...restOpt }, index) => (
        <Checkbox key={index} value={value} {...restOpt}>
          {label}
        </Checkbox>
      ))}
    </SemiCheckboxGroup>
  );
};

export const CheckboxGroup = connect(
  OriginCheckboxGroup,
  mapProps({
    dataSource: "options",
  })
);

export default CheckboxGroup;
