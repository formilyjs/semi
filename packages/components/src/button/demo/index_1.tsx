import React from "react";
import {
  FormButtonGroup,
  Submit,
  SchemaField,
  FormLayout,
} from "@formily/semi";
import { createForm } from "@formily/core";
import { FormProvider } from "@formily/react";

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField>
        <SchemaField.String
          title="姓名"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ style: { marginBottom: "8px" } }}
        />
        <SchemaField.Void
          x-component="Button"
          x-component-props={{
            style: { marginBottom: "8px" },
            onClick() {
              console.log("onclick");
            },
          }}
          x-content="Button"
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
