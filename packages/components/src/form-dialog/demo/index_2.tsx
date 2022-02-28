import React from "react";
import { FormDialog, FormItem, FormLayout, Input } from "@formily/semi";
import { createSchemaField } from "@formily/react";
import { Button } from "@douyinfe/semi-ui";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: "object",
  properties: {
    aaa: {
      type: "string",
      title: "输入框1",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    bbb: {
      type: "string",
      title: "输入框2",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    ccc: {
      type: "string",
      title: "输入框3",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    ddd: {
      type: "string",
      title: "输入框4",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
  },
};

export default () => (
  <FormDialog.Portal>
    <Button
      onClick={() => {
        FormDialog("弹窗表单", () => (
          <FormLayout labelCol={6} wrapperCol={10}>
            <SchemaField schema={schema} />
            <FormDialog.Footer>
              <span style={{ marginLeft: 4 }}>扩展文案</span>
            </FormDialog.Footer>
          </FormLayout>
        ))
          .forOpen((form, next) => {
            setTimeout(() => {
              next({
                initialValues: {
                  aaa: "123",
                },
              });
            }, 1000);
          })
          .forConfirm((form, next) => {
            setTimeout(() => {
              console.log(form);
              next(form);
            }, 1000);
          })
          .forCancel((form, next) => {
            setTimeout(() => {
              console.log(form);
              next(form);
            }, 1000);
          })
          .open()
          .then(console.log);
      }}
    >
      点我打开表单
    </Button>
  </FormDialog.Portal>
);
