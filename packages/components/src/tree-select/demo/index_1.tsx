import React from 'react';
import { FormButtonGroup, Submit, SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="TreeSelect"
        enum={[
          {
            label: '亚洲',
            value: 'Asia',
            key: '0',
            children: [
              {
                label: '中国',
                value: 'China',
                key: '0-0',
                children: [
                  {
                    label: '北京',
                    value: 'Beijing',
                    key: '0-0-0',
                  },
                  {
                    label: '上海',
                    value: 'Shanghai',
                    key: '0-0-1',
                  },
                ],
              },
            ],
          },
          {
            label: '北美洲',
            value: 'North America',
            key: '1',
          },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
