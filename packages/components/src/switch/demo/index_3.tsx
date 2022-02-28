import React from 'react';
import { Switch, FormItem, FormButtonGroup, Submit } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider, Field } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <Field name="switch" title="开关" decorator={[FormItem]} component={[Switch]} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
