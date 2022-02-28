---
title: FormTab
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormTab
---

# FormTab

> 选项卡表单
> (注意：该组件只能用在 Schema 场景)

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

# API
## FormTab
属性名 | 类型 |	描述 | 默认值
-- | -- | -- | -- |
formTab | IFormTab | 传入通过 createFormTab/useFormTab 创建出来的模型	

其余参考 https://semi.design/zh-CN/navigation/tabs#Tab

### FormTab.TabPane
参考 https://semi.design/zh-CN/navigation/tabs#TabPane

### FormTab.createFormTab

```typescript

type ActiveKey = string | number

interface createFormTab {
  (defaultActiveKey?: ActiveKey): IFormTab
}

interface IFormTab {
  //激活主键
  activeKey: ActiveKey
  //设置激活主键
  setActiveKey(key: ActiveKey): void
}
```
