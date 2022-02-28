import React from 'react';
import { FormButtonGroup, Submit, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { action } from '@formily/reactive';

const loadData = async field => {
  const linkage = field.query('linkage').get('value');
  if (!linkage) {
    return [];
  }
  return new Promise(resolve => {
    setTimeout(() => {
      if (linkage === 1) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
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
            label: 'BBB',
            value: 'ccc',
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
        ]);
      } else if (linkage === 2) {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
            key: '3',
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
            label: 'DDD',
            value: 'ddd',
            key: '4',
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
        ]);
      }
    }, 1500);
  });
};

const useAsyncDataSource = service => field => {
  field.loading = true;
  service(field).then(
    action.bound?.(data => {
      field.dataSource = data;
      field.loading = false;
    })
  );
};

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    linkage: {
      type: 'string',
      title: '联动选择框',
      enum: [
        { label: '发请求1', value: 1, key: '0' },
        { label: '发请求2', value: 2, key: '1' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 200,
        },
      },
    },
    select: {
      type: 'string',
      title: '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      'x-component-props': {
        style: {
          width: 200,
        },
      },
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <SchemaRender schema={schema} scope={{ useAsyncDataSource, loadData }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
