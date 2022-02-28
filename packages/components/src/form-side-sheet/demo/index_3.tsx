import React from 'react';
import { FormLayout, FormSideSheet, FormItem, Input, FormButtonGroup, Submit, Reset } from '@formily/semi';
import { Field } from '@formily/react';
import { Button } from '@douyinfe/semi-ui';

export default () => (
  <Button
    onClick={() => {
      FormSideSheet('弹窗表单', resolve => (
        <FormLayout labelCol={6} wrapperCol={10}>
          <Field name="aaa" required title="输入框1" decorator={[FormItem]} component={[Input]} />
          <Field name="bbb" required title="输入框2" decorator={[FormItem]} component={[Input]} />
          <Field name="ccc" required title="输入框3" decorator={[FormItem]} component={[Input]} />
          <Field name="ddd" required title="输入框4" decorator={[FormItem]} component={[Input]} />
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
