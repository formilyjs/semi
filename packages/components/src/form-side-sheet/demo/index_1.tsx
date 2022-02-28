import React from 'react';
import { FormButtonGroup, Submit, SchemaField, FormSideSheet, FormLayout, Reset } from '@formily/semi';
import { Button } from '@douyinfe/semi-ui';

export default () => (
  <Button
    onClick={() => {
      FormSideSheet('抽屉表单', resolve => (
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaField>
            <SchemaField.String name="aaa" required title="输入框1" x-decorator="FormItem" x-component="Input" />
            <SchemaField.String name="bbb" required title="输入框2" x-decorator="FormItem" x-component="Input" />
            <SchemaField.String name="ccc" required title="输入框3" x-decorator="FormItem" x-component="Input" />
            <SchemaField.String name="ddd" required title="输入框4" x-decorator="FormItem" x-component="Input" />
          </SchemaField>
          <FormSideSheet.Footer>
            <FormButtonGroup align="right">
              <Submit onClick={resolve}>提交</Submit>
              <Reset>重置</Reset>
            </FormButtonGroup>
          </FormSideSheet.Footer>
        </FormLayout>
      ))
        .open({
          initialValues: {
            aaa: '123',
          },
        })
        .then(console.log);
    }}
  >
    点我打开表单
  </Button>
);
