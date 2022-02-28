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
import { Button } from '@douyinfe/semi-ui';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
  },
})

const form = createForm()
const formTab = FormTab.createFormTab?.('tab1')

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormTab"
          x-component-props={{ formTab }}
        >
          <SchemaField.Void
            name="tab1"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A1' }}
          >
            <SchemaField.String
              name="aaa"
              x-decorator="FormItem"
              title="AAA"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            name="tab2"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A2' }}
          >
            <SchemaField.String
              name="bbb"
              x-decorator="FormItem"
              title="BBB"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            name="tab3"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A3' }}
          >
            <SchemaField.String
              name="ccc"
              x-decorator="FormItem"
              title="CCC"
              required
              x-component="Input"
            />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
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
