import React from 'react';
import { TreeSelect, FormItem, FormButtonGroup, Submit } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider, Field } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <Field
      name="select"
      title="选择框"
      dataSource={[
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
              label: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              label: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              label: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ]}
      decorator={[FormItem]}
      component={[TreeSelect]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
