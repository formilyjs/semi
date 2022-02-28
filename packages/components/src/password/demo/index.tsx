import React from 'react'
import {
  Password,
  FormItem,
  FormLayout,
  Submit,
} from '@formily/semi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Password,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Password"
          required
          x-component-props={{
            checkStrength: true,
          }}
        />
      </SchemaField>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormLayout>
  </FormProvider>
)
