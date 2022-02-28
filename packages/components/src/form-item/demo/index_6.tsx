import React from 'react';
import { SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="Input"
        x-decorator="FormItem"
        x-component="Input"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="Select"
        title="Select"
        x-decorator="FormItem"
        x-component="Select"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="Select"
        title="Select"
        x-decorator="FormItem"
        x-component="Select"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="Cascader"
        title="Cascader"
        x-decorator="FormItem"
        x-component="Cascader"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="DatePicker"
        title="DatePicker"
        x-decorator="FormItem"
        x-component="DatePicker"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="InputNumber"
        title="InputNumber"
        x-decorator="FormItem"
        x-component="InputNumber"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="TreeSelect"
        title="TreeSelect"
        x-decorator="FormItem"
        x-component="TreeSelect"
        required
        x-decorator-props={{
          inset: true,
        }}
      />
      <SchemaField.String
        name="Switch"
        title="Switch"
        x-decorator="FormItem"
        x-component="Switch"
        required
        x-decorator-props={{
          inset: false,
        }}
      />
    </SchemaField>
  </FormProvider>
);
