import React from 'react';
import { isVoidField } from "@formily/core"
import { connect, mapProps } from "@formily/react"
import { Typography, Space } from '@douyinfe/semi-ui';

const BaseItem = ({ children, readPretty, ...props }) => {
  if (!readPretty) {
    return React.cloneElement(children, props ?? {})
  } else {
    return (
      <Typography.Paragraph>
        <Space>
          {props.title}:
          {React.cloneElement(children, props)}
        </Space>
      </Typography.Paragraph>
    )
  }
}

export const FormItem: any = connect(
  BaseItem,
  mapProps(
    { validateStatus: true, title: true, required: true },
    // translate label
    (props: any, field) => {
      if (isVoidField(field)) return props
      if (!field) return props

      if (!props.title) {
        const titleTxt = props.children.props.label;
        return {
          title: typeof titleTxt === 'string' ? titleTxt : titleTxt.text
        }
      } else {
        return {
          label: { text: props.title, required: props.required }
        }
      }
    },
    // translate field(semi form item field)
    (props: any, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        field: field.props.name,
      }
    },
    (props: any, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf
            return index < messages.length - 1
              ? buf.concat([text, ', '])
              : buf.concat([text])
          }, [])
        }
        if (field.validating) return
        if (props.feedbackText) return props.feedbackText
        if (field.errors.length) return split(field.errors)
        if (field.warnings.length) return split(field.warnings)
        if (field.successes.length) return split(field.successes)
      }

      return {
        feedbackText: takeMessage(),
        extra: props.extra || field.description,
      }
    },
    (props: any, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : field.decorator[1]?.feedbackStatus || field.validateStatus,
      }
    },
    (props: any, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      let asterisk = false
      const readPretty = Boolean(field.readPretty)
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk ?? false
      }
      return {
        asterisk,
        readPretty
      }
    }
  )
)

FormItem.BaseItem = BaseItem

export default FormItem;
