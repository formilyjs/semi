import React from 'react';
import { FormButtonGroup, Submit, SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array
        name="transfer"
        title="穿梭框"
        x-decorator="FormItem"
        x-component="Transfer"
        enum={[
          { label: '选项1', key: 1, value: 1 },
          { label: '选项2', key: 2, value: 2 },
        ]}
        x-component-props={{
          render: item => item.label,
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
