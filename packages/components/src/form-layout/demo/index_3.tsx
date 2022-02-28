import React from 'react'
import {
  Input,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
  FormLayout,
} from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <Field
        name="input"
        required
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="select"
        required
        title="选择框"
        decorator={[FormItem]}
        component={[Select]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
