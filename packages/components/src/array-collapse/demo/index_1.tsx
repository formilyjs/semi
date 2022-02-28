import React from 'react'
import {
  FormItem,
  Input,
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/semi';
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@douyinfe/semi-ui';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCollapse"
          x-component-props={{
            accordion: true,
            defaultOpenPanelCount: 3,
          }}
        >
          <SchemaField.Void
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              header: '字符串数组',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCollapse"
        >
          <SchemaField.Object
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              header: '对象数组',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="string_array_unshift"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCollapse"
          x-component-props={{
            defaultOpenPanelCount: 8,
          }}
        >
          <SchemaField.Void
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              header: '字符串数组',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="添加条目（unshift）"
            x-component-props={{
              method: 'unshift',
            }}
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Button
          onClick={() => {
            form.setInitialValues({
              array: Array.from({ length: 10 }).map(() => ({
                input: 'default value',
              })),
              string_array: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
              string_array_unshift: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
            })
          }}
        >
          加载默认数据
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
