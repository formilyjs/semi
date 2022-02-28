import React from 'react';
import { FormButtonGroup, Submit, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '输入框',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
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
