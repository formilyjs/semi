import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/semi'
import { FormProvider, createSchemaField } from '@formily/react'
import { createForm } from '@formily/core'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
      },
      properties: {
        aaa: {
          type: 'string',
          title: 'AAA',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          type: 'string',
          title: 'BBB',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          type: 'string',
          title: 'CCC',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          type: 'string',
          title: 'DDD',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        eee: {
          type: 'string',
          title: 'EEE',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        fff: {
          type: 'string',
          title: 'FFF',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ggg: {
          type: 'string',
          title: 'GGG',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
