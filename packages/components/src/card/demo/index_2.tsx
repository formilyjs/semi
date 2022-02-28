import React from 'react';
import { SchemaRender, FormLayout, FormButtonGroup, Submit } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Card',
      'x-component-props': {
        style: { marginBottom: '8px' },
      },
      properties: {
        firstName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        lastName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
      },
    },
    texts: {
      type: 'void',
      title: '文本串联',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Card',
      'x-component-props': {
        style: { marginBottom: '8px' },
      },
      properties: {
        aa: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
        bb: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
        cc: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
      },
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaRender schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
