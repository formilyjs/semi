import React from 'react'
import { Input, ArrayItems, FormItem, FormLayout, Select, DatePicker } from '@formily/semi';
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

import config from './config';

const SF = createSchemaField({
  components: {
    Input,
    FormItem,
    FormLayout,
    ArrayItems,
    Select,
    DatePicker
  },
})

const form = createForm()

export default () => (
  <>
    <FormProvider form={form}>
      <SF schema={config} />
      <br />
      <br />
      <h4>FormItem: </h4>
      <SF>
        <SF.Void
          x-component="FormLayout"
          x-component-props={{
            labelCol: 6,
            wrapperCol: 10,
            size: 'small',

          }}
        >
          <SF.String
            name="firstInput"
            title="rtl输入框"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              direction: 'rtl'
            }}
            required
          />
          <SF.String
            name="secInput"
            title="输入框"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{

            }}
            required
          />
        </SF.Void>
      </SF>
    </FormProvider>
  </>
)
