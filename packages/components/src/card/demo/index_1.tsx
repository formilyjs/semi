import React from 'react';
import { FormButtonGroup, Submit, SchemaField, FormLayout } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField>
        <SchemaField.Void
          title="姓名"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Card"
          x-component-props={{ style: { marginBottom: '8px' } }}
        >
          <SchemaField.String name="firstName" x-decorator="FormItem" x-component="Input" required />
          <SchemaField.String name="lastName" x-decorator="FormItem" x-component="Input" required />
        </SchemaField.Void>
        <SchemaField.Void
          title="文本串联"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Card"
          x-component-props={{ style: { marginBottom: '8px' } }}
        >
          <SchemaField.String
            name="aa"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
          <SchemaField.String
            name="bb"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
          <SchemaField.String
            name="cc"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
        </SchemaField.Void>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
