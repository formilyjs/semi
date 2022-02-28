import React from 'react';
import { SchemaField } from '@formily/semi';
import { createForm, Field, onFieldChange } from '@formily/core';
import { FormProvider } from '@formily/react';

const Div = props => <div>{props.children}</div>

const form = createForm({
  values: {
    size: 'default',
  },
  effects: () => {
    onFieldChange('size', ['value'], (field: Field, form) => {
      form.setFieldState('sizeWrap.*', state => {
        if (state.decorator[1]) {
          state.decorator[1].size = field.value;
        }
      });
    });
  },
});

export default () => (
  <FormProvider form={form}>
    <SchemaField components={{ Div }}>
      <SchemaField.String
        name="size"
        title="Radio.Group"
        x-decorator="FormItem"
        x-component="Radio.Group"
        enum={[
          { value: 'small', label: 'Small' },
          { value: 'default', label: 'Default' },
          { value: 'large', label: 'Large' },
        ]}
      />
      <SchemaField.Void name="sizeWrap" x-component="Div">
        <SchemaField.String name="input" title="Input" x-decorator="FormItem" x-component="Input" required />
        <SchemaField.String
          name="select1"
          title="Multiple Select"
          x-decorator="FormItem"
          x-component="Select"
          enum={[
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ]}
          x-component-props={{
            mode: 'multiple',
            placeholder: '请选择',
          }}
          required
        />
        <SchemaField.String
          name="select2"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          enum={[
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ]}
          x-component-props={{
            placeholder: '请选择',
          }}
          required
        />
        <SchemaField.String name="Cascader" title="Cascader" x-decorator="FormItem" x-component="Cascader" required />
        <SchemaField.String
          name="DatePicker"
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          required
        />
        <SchemaField.String
          name="InputNumber"
          title="InputNumber"
          x-decorator="FormItem"
          x-component="InputNumber"
          required
        />
        <SchemaField.String
          name="TreeSelect"
          title="TreeSelect"
          x-decorator="FormItem"
          x-component="TreeSelect"
          required
        />
        <SchemaField.String name="Switch" title="Switch" x-decorator="FormItem" x-component="Switch" required />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
);
