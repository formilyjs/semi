import React from 'react';
import { FormButtonGroup, Submit, SchemaField, FormLayout } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <FormLayout layout="vertical">
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
        <SchemaField.String
          name="input2"
          title="输入框"
          default="123"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormLayout>
    <FormLayout>
      <SchemaField>
        <SchemaField.String
          name="input3"
          title="输入框"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
        <SchemaField.String
          name="input4"
          title="输入框"
          default="123"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormLayout>
    <FormLayout>
      <SchemaField>
        <SchemaField.String
          name="input5"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
        <SchemaField.String
          name="input6"
          default="123"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入',
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
);
