import React from "react";
import {
  FormItem,
  Input,
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from "@formily/semi";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
});

const form = createForm();

const schema = {
  type: "object",
  properties: {
    string_array: {
      type: "array",
      "x-component": "ArrayCollapse",
      "x-component-props": {
        arrayBaseProps: {
          onRemove: console.log,
        },
      },
      maxItems: 3,
      "x-decorator": "FormItem",
      items: {
        type: "object",
        "x-component": "ArrayCollapse.CollapsePanel",
        "x-component-props": {
          header: "字符串数组",
        },
        properties: {
          index: {
            type: "void",
            "x-component": "ArrayCollapse.Index",
          },
          input: {
            type: "string",
            "x-decorator": "FormItem",
            title: "Input",
            required: true,
            "x-component": "Input",
          },
          remove: {
            type: "void",
            "x-component": "ArrayCollapse.Remove",
          },
          moveUp: {
            type: "void",
            "x-component": "ArrayCollapse.MoveUp",
          },
          moveDown: {
            type: "void",
            "x-component": "ArrayCollapse.MoveDown",
          },
        },
      },
      properties: {
        addition: {
          type: "void",
          title: "添加条目",
          "x-component": "ArrayCollapse.Addition",
        },
      },
    },
    array: {
      type: "array",
      "x-component": "ArrayCollapse",
      maxItems: 3,
      "x-decorator": "FormItem",
      items: {
        type: "object",
        "x-component": "ArrayCollapse.CollapsePanel",
        "x-component-props": {
          header: "对象数组",
        },
        properties: {
          index: {
            type: "void",
            "x-component": "ArrayCollapse.Index",
          },
          input: {
            type: "string",
            "x-decorator": "FormItem",
            title: "Input",
            required: true,
            "x-component": "Input",
          },
          remove: {
            type: "void",
            "x-component": "ArrayCollapse.Remove",
          },
          moveUp: {
            type: "void",
            "x-component": "ArrayCollapse.MoveUp",
          },
          moveDown: {
            type: "void",
            "x-component": "ArrayCollapse.MoveDown",
          },
        },
      },
      properties: {
        addition: {
          type: "void",
          title: "添加条目",
          "x-component": "ArrayCollapse.Addition",
        },
      },
    },
    array_unshift: {
      type: "array",
      "x-component": "ArrayCollapse",
      maxItems: 3,
      "x-decorator": "FormItem",
      items: {
        type: "object",
        "x-component": "ArrayCollapse.CollapsePanel",
        "x-component-props": {
          header: "对象数组",
        },
        properties: {
          index: {
            type: "void",
            "x-component": "ArrayCollapse.Index",
          },
          input: {
            type: "string",
            "x-decorator": "FormItem",
            title: "Input",
            required: true,
            "x-component": "Input",
          },
          remove: {
            type: "void",
            "x-component": "ArrayCollapse.Remove",
          },
          moveUp: {
            type: "void",
            "x-component": "ArrayCollapse.MoveUp",
          },
          moveDown: {
            type: "void",
            "x-component": "ArrayCollapse.MoveDown",
          },
        },
      },
      properties: {
        addition: {
          type: "void",
          title: "添加条目(unshift)",
          "x-component": "ArrayCollapse.Addition",
          "x-component-props": {
            method: "unshift",
          },
        },
      },
    },
  },
};

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};
