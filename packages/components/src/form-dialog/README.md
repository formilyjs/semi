---
title: FormDialog
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormDialog
---

# FormDialog

> 弹窗表单，主要用在简单的事件打开表单场景

以下例子演示了 FormDialog 的几个能力：

- 快速打开，关闭能力
- 中间件能力，自动出现加载态
- 渲染函数内可以响应式能力
- 上下文共享能力

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## 纯 JSX 案例

<code src="./demo/index_3.tsx" />

## API

### FormDialog

```typescript
import { IFormProps, Form } from "@formily/core";

type FormDialogRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement);

type ModalTitle = string | number | React.ReactElement;

interface IFormDialog {
  forOpen(
    middleware: (
      props: IFormProps,
      next: (props?: IFormProps) => Promise<any>
    ) => any
  ): any; //中间件拦截器，可以拦截Dialog打开
  forConfirm(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any; //中间件拦截器，可以拦截Dialog确认
  forCancel(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any; //中间件拦截器，可以拦截Dialog取消
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any>; //返回表单数据
  //关闭弹窗
  close(): void;
}

interface IModalProps extends ModalProps {
  onOk?: (event: React.MouseEvent<HTMLElement>) => void | boolean; // return false can prevent onOk
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void | boolean; // return false can prevent onCancel
  loadingText?: React.ReactNode;
}

interface FormDialog {
  (title: IModalProps, id: string, renderer: FormDialogRenderer): IFormDialog;
  (title: IModalProps, renderer: FormDialogRenderer): IFormDialog;
  (title: ModalTitle, id: string, renderer: FormDialogRenderer): IFormDialog;
  (title: ModalTitle, renderer: FormDialogRenderer): IFormDialog;
}
```

`ModalProps`类型定义参考 semi design [Modal API](https://semi.design/zh-CN/show/modal)

### FormDialog.Footer

无属性，只接收子节点

### FormDialog.Portal

接收可选的 id 属性，默认值为`form-dialog`，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
