---
title: ArrayTable
order: 0
nav:
  title: 组件
  path: /components
group:
  title: ArrayTable
---

# ArrayTable

> 自增列表，对于简单的自增编辑场景比较适合，或者对于空间要求高的场景比较适合
> 注意：该组件只适用于 Schema 场景

<code src="./demo/index.tsx" />

## API

### ArrayTable

> 表格组件

参考 https://semi.design/zh-CN/show/table#table

### ArrayTable.Column

> 表格列

参考 https://semi.design/zh-CN/show/table#column

### ArrayTable.SortHandle

> 拖拽手柄

无属性

### ArrayTable.Index

> 索引渲染器

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |
| renderIndex  | (index: number) => renderIndex | index 展示 |  `#${index+1}.` eg: #1.(起始)  |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的


### ArrayItems.useIndex

> 读取当前渲染行索引的 React Hook
