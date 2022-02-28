---
title: FormCollapse
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormCollapse
---

# FormStep

> 折叠面板，通常用在布局空间要求较高的表单场景
> (注意：该组件只能用在 Schema 场景)

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## API

### FormCollapse

| 属性名       | 类型          | 描述                                                       | 默认值 |
| ------------ | ------------- | ---------------------------------------------------------- | ------ |
| FormCollapse | IFormCollapse | 传入通过 createFormCollapse/useFormCollapse 创建出来的模型 | -      |

其余属性参考 <a href="https://semi.design/zh-CN/show/collapse" target="_blank">Semi Collapse 组件文档</a>

### FormCollapse.CollapsePanel

参考 <a href="https://semi.design/zh-CN/show/collapse" target="_blank">Semi Collapse 组件文档</a>

### FormCollapse.createFormCollapse

```typescript
type ActiveKey = string | number;
type ActiveKeys = string | number | Array<string | number>;

interface createFormCollapse {
  (defaultActiveKeys?: ActiveKeys): IFormCollpase;
}

interface IFormCollapse {
  //激活主键列表
  activeKeys: ActiveKeys;
  //是否存在该激活主键
  hasActiveKey(key: ActiveKey): boolean;
  //设置激活主键列表
  setActiveKeys(keys: ActiveKeys): void;
  //添加激活主键
  addActiveKey(key: ActiveKey): void;
  //删除激活主键
  removeActiveKey(key: ActiveKey): void;
  //开关切换激活主键
  toggleActiveKey(key: ActiveKey): void;
}
```
