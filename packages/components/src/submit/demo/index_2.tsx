import React from 'react';
import { FormButtonGroup, Submit, SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String name="input" title="输入框" required x-decorator="FormItem" x-component="Input" />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit
        onSubmit={values =>
          new Promise(resolve => {
            setTimeout(() => {
              console.log(values);
              resolve(true);
            }, 2000);
          })
        }
      >
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
);
