import React from 'react';
import { FormButtonGroup, Submit, SchemaField, FormLayout, Reset } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField>
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
        <SchemaField.String title="输入框" x-decorator="FormItem" required x-component="Input" />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
