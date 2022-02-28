import React from 'react'
import {
  PreviewText,
  FormItem,
  FormLayout,
  FormButtonGroup,
} from '@formily/semi'
import { createForm } from '@formily/core'
import {
  FormProvider,
  mapReadPretty,
  connect,
  createSchemaField,
} from '@formily/react'
import { Button, Input as SemiInput } from '@douyinfe/semi-ui'

const Input = connect(SemiInput, mapReadPretty(PreviewText.Input))

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <PreviewText.Placeholder value="暂无数据">
      <FormLayout labelCol={6} wrapperCol={10}>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="文本预览"
              required
              x-component="Input"
              default={'Hello world'}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="选择项预览"
              x-component="PreviewText.Select"
              x-component-props={{
                multiple: true
              }}
              default={['123', '222']}
              enum={[
                { label: 'A111', value: '123' },
                { label: 'A222', value: '222' },
              ]}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="日期预览"
              x-component="PreviewText.DatePicker"
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="Cascader预览"
              x-component="PreviewText.Cascader"
              default={['hangzhou', 'yuhang']}
              enum={[
                {
                  label: '杭州',
                  value: 'hangzhou',
                },
                {
                  label: '余杭',
                  value: 'yuhang',
                },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Button
              onClick={() => {
                form.setState((state) => {
                  state.editable = !state.editable
                })
              }}
            >
              切换阅读态
            </Button>
          </FormButtonGroup.FormItem>
        </FormProvider>
      </FormLayout>
    </PreviewText.Placeholder>
  )
}
