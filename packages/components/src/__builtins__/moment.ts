import { isArr, isFn } from '@formily/shared'
import DayJs from 'dayjs'

export const momentable = (value: any, format?: string) => {
  return Array.isArray(value)
    ? value.map((val) => DayJs(val, format))
    : value
    ? DayJs(value, format)
    : value
}

export const formatMomentValue = (
  value: any,
  format: any,
  placeholder?: string
): string | string[] => {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date) return placeholder
    if (isArr(format)) {
      const _format = format[i]
      if (isFn(_format)) {
        return _format(date)
      }
      return date?.format ? date.format(_format) : date
    } else {
      if (isFn(format)) {
        return format(date)
      }
      return date?.format ? date.format(format) : date
    }
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  } else {
    return value ? formatDate(value, format) : value || placeholder
  }
}