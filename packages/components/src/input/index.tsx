import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as SemiInput, TextArea } from '@douyinfe/semi-ui'
import { IconLoading } from "@douyinfe/semi-icons";
import { InputProps } from "@douyinfe/semi-ui/lib/es/input";
import { TextAreaProps } from "@douyinfe/semi-ui/lib/es/input";

import './index.scss';
import { PreviewText } from '../preview-text'

type ComposedInput = React.ForwardRefExoticComponent<InputProps> & {
  TextArea?: React.ForwardRefExoticComponent<TextAreaProps>
}

export const Input: ComposedInput = connect(
  SemiInput,
  mapProps((props, field: any) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <IconLoading />
          ) : (
            props.suffix
          )}
        </span>
      ),
    }
  }),
  mapReadPretty(PreviewText.Input)
) as any

Input.TextArea = connect(TextArea, mapReadPretty(PreviewText.Input)) as any

export default Input
