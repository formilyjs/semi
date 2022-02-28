import React from 'react';
import { FormButtonGroup, Submit, SchemaField, FormLayout, FormCollapse } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { Button } from '@douyinfe/semi-ui';

const form = createForm();
const formCollapse = FormCollapse.createFormCollapse();

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField>
        <SchemaField.Void
          title="折叠面板"
          x-decorator="FormItem"
          x-component="FormCollapse"
          x-component-props={{
            formCollapse,
          }}
        >
          <SchemaField.Void
            name="panel1"
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ header: 'A1', itemKey: '1' }}
          >
            <SchemaField.String name="aaa" title="AAA" x-decorator="FormItem" required x-component="Input" />
          </SchemaField.Void>
          <SchemaField.Void
            name="panel2"
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ header: 'A2', itemKey: '2' }}
          >
            <SchemaField.String name="bbb" title="BBB" x-decorator="FormItem" required x-component="Input" />
          </SchemaField.Void>
          <SchemaField.Void
            name="panel3"
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ header: 'A3', itemKey: '3' }}
          >
            <SchemaField.String name="ccc" title="CCC" x-decorator="FormItem" required x-component="Input" />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Button
          onClick={() => {
            form.query('panel3').take(field => {
              field.visible = !field.visible;
            });
          }}
        >
          显示/隐藏最后一个Tab
        </Button>
        <Button
          onClick={() => {
            formCollapse.toggleActiveKey('2');
          }}
        >
          切换第二个Tab
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
);
