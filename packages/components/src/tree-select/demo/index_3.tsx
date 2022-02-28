import React from 'react';
import { FormButtonGroup, Submit, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      title: '选择框',
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      enum: [
        {
          label: '选项1',
          value: 1,
          key: '0',
          children: [
            {
              label: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
            {
              label: 'Child Node2',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              label: 'Child Node3',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          label: '选项2',
          value: 2,
          key: '1',
          children: [
            {
              label: 'Child Node1',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              label: 'Child Node2',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              label: 'Child Node3',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      'x-component-props': {
        style: {
          width: 200,
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
