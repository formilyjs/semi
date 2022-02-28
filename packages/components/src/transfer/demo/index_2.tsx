import React from 'react';
import { FormButtonGroup, Submit, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: '穿梭框',
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
      enum: [
        { title: '选项1', key: 1 },
        { title: '选项2', key: 2 },
      ],
      'x-component-props': {
        render: '{{renderTitle}}',
      },
    },
  },
};

const renderTitle = item => item.title;

export default () => (
  <FormProvider form={form}>
    <SchemaRender schema={schema} scope={{ renderTitle }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
