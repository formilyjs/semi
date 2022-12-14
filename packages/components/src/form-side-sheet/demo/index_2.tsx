import React from "react";
import {
  FormSideSheet,
  FormLayout,
  Submit,
  Reset,
  FormButtonGroup,
  SchemaRender,
} from "@formily/semi";
import { Button } from "@douyinfe/semi-ui";
import { Form } from "@formily/core";

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
  <Button
    onClick={() => {
      FormSideSheet("弹窗表单", (form: Form) => (
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaRender schema={schema} />
          <FormSideSheet.Footer>
            <FormButtonGroup align="right">
              <Submit onClick={form.submit}>提交</Submit>
              <Reset>重置</Reset>
            </FormButtonGroup>
          </FormSideSheet.Footer>
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
        .open()
        .then(console.log);
    }}
  >
    点我打开表单
  </Button>
);
