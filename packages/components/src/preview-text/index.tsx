import React, { createContext, useContext } from 'react'
import { isPlainObj, isArr, isValid } from '@formily/shared'
import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import { InputProps } from '@douyinfe/semi-ui/input'
import { SelectProps } from '@douyinfe/semi-ui/select'
import { TreeSelectProps } from '@douyinfe/semi-ui/treeSelect'
import { CascaderProps } from '@douyinfe/semi-ui/cascader'
import { DatePickerProps, } from '@douyinfe/semi-ui/datePicker'
import { TimePickerProps } from '@douyinfe/semi-ui/timePicker/TimePicker'
import { Tag, Space } from '@douyinfe/semi-ui'
import cls from 'classnames'

import './index.scss';
import { formatMomentValue, usePrefixCls } from '../__builtins__'

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

const Input: React.FC<InputProps> = (props) => {
  const prefixCls = usePrefixCls('text')
  return (
    <Space className={cls(prefixCls, props.className)} style={props.style}>
      {props.addonBefore}
      {props.prefix}
      {usePlaceholder(props.value)}
      {props.suffix}
      {props.addonAfter}
    </Space>
  )
}

const Select: React.FC<SelectProps> = observer((props) => {
  const field = useField<Field>()
  const prefixCls = usePrefixCls('text')
  const dataSource: any[] = field?.dataSource?.length
    ? field.dataSource : []
  const placeholder = usePlaceholder()
  const getSelected = () => {
    const { value, onChangeWithObject } = props
    if (props.multiple) {
      return isArr(value) ? value.map(val => (onChangeWithObject ? val : { label: val, value: val })) : []
    } else {
      return onChangeWithObject && isPlainObj(value) ? [value] : (
        // 保护value可能为0的情况
        value !== undefined && value !== null ? [{ label: value, value }] : []
      )
    }
  }

  const getLabels = () => {
    const selected = getSelected()
    if (!selected.length) return <Tag>{placeholder}</Tag>
    return selected.map(({ value, label }, key) => {
      const text =
        dataSource?.find((item) => item.value === value)?.label || label
      return <Tag key={key}>{text || placeholder}</Tag>
    })
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      <Space>
        {getLabels()}
      </Space>
    </div>
  )
})

const TreeSelect: React.FC<TreeSelectProps> = observer((props) => {
  const field = useField<Field>()
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : []
  const getSelected = () => {
    const value = props.value
    if (props.multiple) {
      return isArr(value)
        ? value.map((val) => ({ label: val, value: val }))
        : []
    } else {
      return value ? [{ label: value, value }] : []
    }
  }

  const findLabel = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item = dataSource[i]
      if (item?.value === value) {
        return item?.label
      } else {
        const childLabel = findLabel(value, item?.children)
        if (childLabel) return childLabel
      }
    }
  }

  const getLabels = () => {
    const selected = getSelected()
    if (!selected?.length) return <Tag>{placeholder}</Tag>
    return selected.map(({ value, label }, key) => {
      return (
        <Tag key={key}>
          {findLabel(value, dataSource) || label || placeholder}
        </Tag>
      )
    })
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
})

const Cascader: React.FC<CascaderProps> = observer((props) => {
  const field = useField<Field>()
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const dataSource: any[] = field?.dataSource?.length
    ? field.dataSource
    : []
  const getSelected = () => {
    return isArr(props.value) ? props.value : []
  }
  const findLabel = (value: any, dataSource: any[]) => {
    for (let i = 0; i < dataSource?.length; i++) {
      const item = dataSource[i]
      if (item?.value === value) {
        return item?.label
      } else {
        const childLabel = findLabel(value, item?.children)
        if (childLabel) return childLabel
      }
    }
  }
  const getLabels = () => {
    const selected = getSelected()
    if (!selected?.length) {
      return placeholder
    }
    return selected
      .map((value) => {
        return findLabel(value, dataSource) || placeholder
      })
      .join('/')
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
})

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

const DateRangePicker: React.FC<DatePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
}

const TimeRangePicker: React.FC<TimePickerProps> = (props) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('text')
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {getLabels()}
    </div>
  )
}

const Text = (props: React.PropsWithChildren<any>) => {
  const prefixCls = usePrefixCls('text')

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  )
}

Text.Input = Input
Text.Select = Select
Text.TreeSelect = TreeSelect
Text.Cascader = Cascader
Text.DatePicker = DatePicker
Text.DateRangePicker = DateRangePicker
Text.TimePicker = TimePicker
Text.TimeRangePicker = TimeRangePicker
Text.Placeholder = Placeholder
Text.usePlaceholder = usePlaceholder

export const PreviewText = Text

export default PreviewText
