import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/semi';
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
        x-component-props={{
          style: {
            width: 240,
          },
        }}
      />
      <SchemaField.String
        name="textarea"
        title="文本框"
        x-decorator="FormItem"
        required
        x-component="Input.TextArea"
        x-component-props={{
          style: {
            width: 400,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
