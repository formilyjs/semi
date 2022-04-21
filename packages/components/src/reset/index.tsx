import React from "react";
import { Button } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import { useForm } from "@formily/react";
import { IFieldResetOptions } from "@formily/core";

type ResetProps = IFieldResetOptions & ButtonProps;

export const Reset: React.FC<ResetProps> = ({
  forceClear,
  validate,
  ...props
}) => {
  const form = useForm();
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        form.reset("*", {
          forceClear,
          validate,
        });
      }}
    />
  );
};

export default Reset;
