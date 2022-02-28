import React from 'react';
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider, Field } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <Field
      name="transfer"
      title="穿梭框"
      dataSource={[
        { title: '选项1', key: 1 },
        { title: '选项2', key: 2 },
      ]}
      decorator={[FormItem]}
      component={[
        Transfer,
        {
          render: item => item.title,
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
