import React from 'react';
import { Form, Reset, Upload, FormItem } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormConsumer, Field } from '@formily/react';
import { Button } from '@douyinfe/semi-ui';

const form = createForm({
  initialValues: {
    // upload: [{
    //   url: 'https://secure.gravatar.com/avatar/b0de023b7c0d631fe1c283d0389cd72c?s=800&d=identicon'
    // }]
  },
});

const NormalUpload = props => {
  console.log('normal upload: ', props.fileList, props);
  return (
    <Upload {...props}>
      <Button icon="upload" theme="light">
        点击上传
      </Button>
    </Upload>
  );
};

const Demo = () => (
  <Form form={form}>
    <Field
      name="upload"
      title="上传"
      required
      decorator={[FormItem]}
      component={[
        NormalUpload,
        {
          onChange: (...p) => console.log('upload onChange: ', ...p),
          action: 'https://semi.design/api/upload',
        },
      ]}
    />
    <Reset>Reset</Reset>
    <FormConsumer>{() => <div>{JSON.stringify(form.values)}</div>}</FormConsumer>
  </Form>
);

export default Demo;
