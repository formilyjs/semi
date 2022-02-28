import React from 'react';
import { FormButtonGroup, Submit, SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormConsumer, FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number name="switch" title="开关" x-decorator="FormItem" x-component="Switch" />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
    <FormConsumer>{() => <div>{JSON.stringify(form.values)}</div>}</FormConsumer>
  </FormProvider>
);
