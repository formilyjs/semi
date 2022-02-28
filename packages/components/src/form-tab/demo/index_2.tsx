import React from 'react'
import {
  FormTab,
  FormItem,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@douyinfe/semi-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
  },
})

const form = createForm()
const formTab = FormTab.createFormTab('tab3')

const schema = {
  type: 'object',
  properties: {
    tabletest: {
      type: 'string',
      title: '其他的',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    collapse: {
      type: 'void',
      'x-component': 'FormTab',
      'x-component-props': {
        // formTab: '{{formTab}}',
        // activeKey: 'tab3'
      },
      properties: {
        tab1: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'tab1',
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
        tab2: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'tab2',
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'BBB',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
        tab3: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'tab3',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'CCC',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={{ formTab }} />
      <FormButtonGroup.FormItem>
        <Button
          onClick={() => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }}
        >
          显示/隐藏最后一个Tab
        </Button>
        <Button
          onClick={() => {
            formTab?.setActiveKey('tab2')
          }}
        >
          切换第二个Tab
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
