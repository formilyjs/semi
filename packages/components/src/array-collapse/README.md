---
title: ArrayCollpase
order: 0
nav:
  title: 组件
  path: /components
group:
  title: ArrayCollpase
---

# ArrayCollpase

> 卡片列表，对于每行字段数量较多，联动较多的场景比较适合使用 ArrayCards
> 注意：该组件只适用于 Schema 场景

## Markup Schema 实例
<code src="./demo/index_1.tsx" />

## JSON Schema 实例
<code src="./demo/index_2.tsx" />

## API

### ArrayCollapse.Index

> 索引渲染器

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |
| renderIndex  | (index: number) => renderIndex | index 展示 |  `#${index+1}.` eg: #1.(起始)  |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的


### ArrayItems.useIndex

> 读取当前渲染行索引的 React Hook