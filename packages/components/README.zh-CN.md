# @formily/semi

> Formily 组件库桥接层

# 文档地址

https://semi.formilyjs.org/

# 快速使用

**formily 有一定学习成本，想要深度使用请优先学习 [formily 官方文档](https://v2.formilyjs.org/)**

## 安装

```bash
npm install @formily/semi --save
```

安装组件库的 peerDependencies：

```bash
$ npm i -S @formily/core @formily/react @douyinfe/semi-ui
```

## 开始

```typescript
import React, { useCallback } from "react";
import { SchemaForm } from "@formily/semi";
import { ISchema } from "@formily/json-schema";
import { useRef } from "react";
import { Button } from "@douyinfe/semi-ui";

const schema = {
  type: "object",
  properties: {
    select: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-reactions": "{{useAsyncDataSource(loadData)}}",
    },
  },
} as ISchema;

const scope = {
  async loadData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            label: "CCC",
            value: "ccc",
          },
          {
            label: "DDD",
            value: "ddd",
          },
        ]);
      }, 1000);
    });
  },
};

export default () => {
  const formRef = useRef<any>();
  const handleClick = useCallback(() => {
    console.log(formRef?.current?.getForm()?.values);
  }, []);
  return (
    <div className="wrap">
      <SchemaForm ref={formRef} schema={schema} scope={scope} />
      <Button onClick={handleClick}>点击测试</Button>
    </div>
  );
};
```

# 简介

本组件库逻辑层使用 [formily/v2](https://v2.formilyjs.org/)
UI 层接入 [semi-design](https://semi.design/)

UI 层接入参考 [@formily/ant](https://github.com/alibaba/formily/tree/formily_next/packages/antd)

# ISSUE

bug 提交到: [issue](https://github.com/formilyjs/semi/issues)
