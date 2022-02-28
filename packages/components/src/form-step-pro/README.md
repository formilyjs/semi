---
title: FormStepPro
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormStepPro
---

# FormStepPro

> 分步表单组件
> (注意：该组件只能用在 Schema 场景)

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## API

### FormStepPro

| 属性名   | 类型                | 描述                                   | 默认值 |
| -------- | ------------------- | -------------------------------------- | ------ |
| formStep | IFormStep           | 传入通过 createFormStep 创建出来的模型 | -      |
| onSubmit | (val?: any) => void | 提交回调                               | -      |

### FormStepPro.Next | FormStepPro.Previous

| 属性名 | 类型   | 描述     | 默认值 |
| ------ | ------ | -------- | ------ |
| text   | string | 按钮文案 | -      |

### FormStepPro.NextWithSubmit

按步提交, 可以写在根节点内，也可以单独写在某一步骤中
| 属性名 | 类型 | 描述 | 默认值 |
| -------- | --------- | -------------------------------------------------- | ------ |
| text | string | 按钮文案 | - |
| onSubmit | (currentStepValues: any, current: number) => void | 按步提交回调，接收值为当前步骤中的所有数据 | - |

其余属性参考 <a href="https://semi.design/zh-CN/navigation/steps" target="_blank">Semi Steps 组件文档</a>

### FormStepPro.StepPane

参考 <a href="https://semi.design/zh-CN/navigation/steps" target="_blank">Semi Steps 组件文档</a> Steps.Step 属性
