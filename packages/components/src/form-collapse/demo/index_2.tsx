import React from "react";
import {
  FormButtonGroup,
  Submit,
  SchemaRender,
  FormLayout,
  FormCollapse,
} from "@formily/semi";
import { createForm } from "@formily/core";
import { FormProvider } from "@formily/react";
import { Button } from "@douyinfe/semi-ui";

const form = createForm();
const formCollapse = FormCollapse.createFormCollapse();

const schema = {
  type: "object",
  properties: {
    collapse: {
      type: "void",
      title: "折叠面板",
      "x-decorator": "FormItem",
      "x-component": "FormCollapse",
      "x-component-props": {
        // formCollapse: '{{formCollapse}}',
        defaultActiveKey: "1",
        // defaultActiveKey: ['1', '2'],
      },
      properties: {
        panel1: {
          type: "void",
          "x-component": "FormCollapse.CollapsePanel",
          "x-component-props": {
            header: "A1",
            itemKey: "1",
          },
          properties: {
            aaa: {
              type: "string",
              title: "AAA",
              "x-decorator": "FormItem",
              required: true,
              "x-component": "Input",
            },
          },
        },
        panel2: {
          type: "void",
          "x-component": "FormCollapse.CollapsePanel",
          "x-component-props": {
            header: "A2",
            itemKey: "2",
          },
          properties: {
            bbb: {
              type: "string",
              title: "BBB",
              "x-decorator": "FormItem",
              required: true,
              "x-component": "Input",
            },
          },
        },
        panel3: {
          type: "void",
          "x-component": "FormCollapse.CollapsePanel",
          "x-component-props": {
            header: "A3",
            itemKey: "3",
          },
          properties: {
            ccc: {
              type: "string",
              title: "CCC",
              "x-decorator": "FormItem",
              required: true,
              "x-component": "Input",
            },
          },
        },
      },
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaRender schema={schema} scope={{ formCollapse }} />
      <FormButtonGroup.FormItem>
        <Button
          onClick={() => {
            form.query("panel3").take((field) => {
              field.visible = !field.visible;
            });
          }}
        >
          显示/隐藏最后一个Tab
        </Button>
        <Button
          onClick={() => {
            formCollapse.toggleActiveKey("2");
          }}
        >
          切换第二个Tab
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
