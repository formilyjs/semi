import React from 'react';
import { FormButtonGroup, Submit, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    switch: {
      type: 'number',
      title: '开关',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <SchemaRender schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
