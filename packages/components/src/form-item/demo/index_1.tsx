import React from 'react';
import { FormButtonGroup, Submit, SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String name="input" title="输入框" x-decorator="FormItem" x-component="Input" required />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
