import React from "react";
import { connect, mapProps, mapReadPretty } from "@formily/react";
import { InputNumber as SemiInputNumber } from "@douyinfe/semi-ui";
import { PreviewText } from "../preview-text";
import { IconLoading } from "@douyinfe/semi-icons";

export const InputNumber = connect(
  SemiInputNumber,
  mapProps((props, field: any) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.["loading"] || field?.["validating"] ? (
            <IconLoading />
          ) : (
            props.suffix
          )}
        </span>
      ),
    };
  }),
  mapReadPretty(PreviewText.Input)
) as any;

export const NumberPicker = InputNumber;

export default InputNumber;
