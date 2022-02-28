import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__/hooks'
import cls from 'classnames'
import './index.scss';

export interface IFormLayoutProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number
  wrapperCol?: number
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal' | 'inline'
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  feedbackLayout?: 'loose' | 'terse' | 'popover'
  bordered?: boolean
}

export const FormLayoutContext = createContext<IFormLayoutProps>({})

export const FormLayoutShallowContext = createContext<IFormLayoutProps>({})

export const useFormLayout = () => useContext(FormLayoutContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutProps
  useFormShallowLayout: () => IFormLayoutProps
} = ({ shallow, children, prefixCls, className, style, ...props }) => {

  const formPrefixCls = usePrefixCls('form')
  const semiRtlPrefixCls = usePrefixCls('', { prefixCls: 'semi-rtl' })
  const layoutPrefixCls = usePrefixCls('layout', { prefixCls })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: props.layout,
      [`${semiRtlPrefixCls}`]: props.direction === 'rtl',
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    if (shallow) {
      return (
        <FormLayoutShallowContext.Provider value={props}>
          {children}
        </FormLayoutShallowContext.Provider>
      )
    } else {
      return (
        <FormLayoutContext.Provider value={props}>
          {children}
        </FormLayoutContext.Provider>
      )
    }
  }
  return (
    <div className={layoutClassName} style={style}>
      {renderChildren()}
    </div>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormLayout = useFormLayout
FormLayout.useFormShallowLayout = useFormShallowLayout

export default FormLayout
