import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, ISchema } from '@formily/react'
import { action } from '@formily/reactive'

const useAsyncDataSource = (service) => (field) => {
  field.loading = true
  service(field).then(
    action?.bound?.((data) => {
      if (data.findIndex(({ value }) => value == field.value) == -1) {
        field.value = undefined
      }
      field.dataSource = data
      field.loading = false
    })
  )
}

const loadData = (linkage: number) => {
  return async () => {
    if (!linkage) return []
    return new Promise((resolve) => {
      setTimeout(() => {
        if (linkage === 1) {
          resolve([
            {
              label: 'AAA',
              value: 'aaa',
            },
            {
              label: 'BBB',
              value: 'ccc',
            },
          ])
        } else if (linkage === 2) {
          resolve([
            {
              label: 'CCC',
              value: 'ccc',
            },
            {
              label: 'DDD',
              value: 'ddd',
            },
          ])
        }
      }, 1500)
    })
  }
}

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
  scope: {
    useAsyncDataSource,
    loadData
  }
})

const form = createForm()

const schema: any = {
  type: 'object',
  properties: {
    linkage: {
      type: 'string',
      title: '联动选择框',
      enum: [
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
    },
    select: {
      type: 'string',
      title: '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
      'x-reactions': {
        dependencies: ['linkage'],
        fulfill: {
          schema: { 'x-visible': '{{$deps[0] !== undefined}}' },
          run: 'useAsyncDataSource(loadData($deps[0]))($self)'
        }
      },
    },
  },
} as ISchema

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} scope={{ useAsyncDataSource, loadData }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
