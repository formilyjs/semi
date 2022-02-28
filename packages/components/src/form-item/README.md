---
title: FormItem
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormItem
---

# FormItem

> FormItem 组件定位是纯样式组件，不管理表单状态

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## 纯 JSX 案例

<code src="./demo/index_3.tsx" />

## 常用属性案例

<code src="./demo/index_4.tsx" />

## 无边框案例

<code src="./demo/index_5.tsx" />

## 内嵌模式案例

设置表单组件为内嵌模式

<code src="./demo/index_6.tsx" />

## 反馈信息定制案例

可通过 **feedbackIcon** 传入指定反馈的按钮

<code src="./demo/index_7.tsx" />

## 尺寸控制

<code src="./demo/index_8.tsx" />

## API

### FormItem

| 属性名         | 类型                                       | 描述                                        | 默认值  |
| -------------- | ------------------------------------------ | ------------------------------------------- | ------- |
| label          | ReactNode                                  | 标签                                        | -       |
| style          | CSSProperties                              | 样式                                        | -       |
| labelStyle     | CSSProperties                              | 标签样式                                    | -       |
| wrapperStyle   | CSSProperties                              | 组件容器样式                                | -       |
| className      | string                                     | 组件样式类名                                | -       |
| colon          | boolean                                    | 冒号                                        | 
TRUE    |
| direction      | `'rtl' \| 'ltr'`                           | 内容排序方向                                 | `'ltr'` |
| tooltip        | ReactNode                                  | 问号提示                                    | -       |
| tooltipLayout  | "icon" / "text"                            | 问提示布局                                  | "icon"  |
| labelAlign     | "left" / "right"                           | 标签文本对齐方式                            | "right" |
| labelWrap      | boolean                                    | 标签换⾏，否则出现省略号，hover 有 tooltip  | FALSE   |
| labelWidth     | number / string                            | 标签固定宽度                                | -       |
| wrapperWidth   | number / string                            | 内容固定宽度                                | -       |
| labelCol       | number                                     | 标签⽹格所占列数，和内容列数加起来总和为 24 | -       |
| wrapperCol     | number                                     | 内容⽹格所占列数，和标签列数加起来总和为 24 | -       |
| wrapperAlign   | "left" /"right"                            | 内容文本对齐方式⻬                          | "left"  |
| wrapperWrap    | boolean                                    | 内容换⾏，否则出现省略号，hover 有 tooltip  | FALSE   |
| fullness       | boolean                                    | 内容撑满                                    | FALSE   |
| addonBefore    | ReactNode                                  | 前缀内容                                    | -       |
| addonAfter     | ReactNode                                  | 后缀内容                                    | -       |
| size           | "small" / "default" /"large"               | 尺⼨                                        | -       |
| inset          | boolean                                    | 是否是内嵌布局                              | FALSE   |
| extra          | ReactNode                                  | 扩展描述⽂案                                | -       |
| feedbackText   | ReactNode                                  | 反馈⽂案                                    | -       |
| feedbackLayout | "loose" / "terse" / "popover" / "none"     | 反馈布局                                    | -       |
| feedbackStatus | "error" / "warning" / "success" /"pending" | 反馈布局                                    | -       |
| feedbackIcon   | ReactNode                                  | 反馈图标                                    | -       |
| asterisk       | boolean                                    | 星号提醒                                    | -       |
| gridSpan       | number                                     | ⽹格布局占宽                                | -       |
| bordered       | boolean                                    | 是否有边框                                  | -       |

### FormItem.BaseItem

纯样式组件，属性与 FormItem 一样，与 Formily Core 不做状态桥接，主要用于一些需要依赖 FormItem 的样式布局能力，但不希望接入 Field 状态的场景
