import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="input"
      title="输入框"
      required
      decorator={[FormItem]}
      component={[
        Input,
        {
          style: {
            width: 240,
          },
        },
      ]}
    />
    <Field
      name="textarea"
      title="文本框"
      required
      decorator={[FormItem]}
      component={[
        Input.TextArea,
        {
          style: {
            width: 400,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
