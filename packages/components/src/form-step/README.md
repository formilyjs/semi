---
title: FormStep
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormStep
---

# FormStep

> 分步表单组件
> (注意：该组件只能用在 Schema 场景)

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## API

### FormStep

| 属性名   | 类型      | 描述                                               | 默认值 |
| -------- | --------- | -------------------------------------------------- | ------ |
| formStep | IFormStep | 传入通过 createFormStep/useFormStep 创建出来的模型 | -      |

其余属性参考 <a href="https://semi.design/zh-CN/navigation/steps" target="_blank">Semi Steps 组件文档</a>

### FormStep.StepPane

参考 <a href="https://semi.design/zh-CN/navigation/steps" target="_blank">Semi Steps 组件文档</a> Steps.Step 属性

### FormStep.createFormStep

```typescript
interface createFormStep {
  (current?: number): IFormStep;
}

interface IFormTab {
  //当前索引
  current: number;
  //是否允许向后
  allowNext: boolean;
  //是否允许向前
  allowBack: boolean;
  //设置当前索引
  setCurrent(key: number): void;
  //提交表单
  submit: Form["submit"];
  //向后
  next(): void;
  //向前
  back(): void;
}
```
