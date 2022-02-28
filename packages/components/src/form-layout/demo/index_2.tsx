import React from 'react'
import { Input, Select, FormItem, FormLayout, ArrayItems } from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
    ArrayItems
  },
})

const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 6,
        wrapperCol: 10,
      },
      properties: {
        input: {
          type: 'string',
          title: '输入框',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        select: {
          type: 'string',
          title: '选择框',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
      },
    },
  },
}

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
  </FormProvider>
)
