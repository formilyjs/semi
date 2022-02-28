---
title: FormSideSheet
order: 0
nav:
  title: 组件
  path: /components
group:
  title: FormSideSheet
---

# FormSideSheet

> 抽屉表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

<code src="./demo/index_1.tsx" />

## JSON Schema 案例

<code src="./demo/index_2.tsx" />

## 纯 JSX 案例

<code src="./demo/index_3.tsx" />

## API

### FormSideSheet

```typescript
type FormSideSheetHandler = {
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any>; //返回表单数据
  //关闭弹窗
  close(): void;
};

interface IFormSideSheet {
  (
    title: React.ReactNode, //如果是ReactNode，则作为弹窗title传入
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormSideSheetHandler;
  (
    title: ModalProps, //如果是对象，则作为DrawerProps传入
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormSideSheetHandler;
}
```

### FormSideSheet.Footer

无属性，只接收子节点
