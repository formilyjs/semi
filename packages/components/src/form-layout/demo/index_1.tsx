import React from 'react'
import { Input, Select, FormItem, FormLayout } from '@formily/semi';
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{
          labelCol: 6,
          wrapperCol: 10,
          size: 'small'
        }}
      >
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{

          }}
          required
        />
        <SchemaField.String
          name="select"
          title="选择框"
          x-decorator="FormItem"
          x-component="Select"
          required
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
)
