import React from 'react';
import { Form, SchemaRender } from '@formily/semi';
import { createForm } from '@formily/core';
import { action } from '@formily/reactive';
import { FormConsumer } from '@formily/react';

const form = createForm({
  initialValues: {
    input: 'asd',
    textarea: 'fjdljfklgdsafjds',
  },
});

export const SchemaInput = {
  type: 'object',
  properties: {
    input: {
      // will be mapped to field name in semi-form-items
      type: 'string',
      title: 'Input2',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '123',
        tooltipProps: {
          position: 'bottom'
        }
      },
      'x-component': 'Input',
      'x-component-props': {
        value: 345,
      },
    },
    textarea: {
      type: 'string',
      title: 'textarea',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {},
      'x-reactions': {
        dependencies: ['input'],
        fulfill: {
          schema: {
            visible: '{{$deps[0] && $deps[0] !== "asd"}}'
          },
          run: 'test()'
        }
      }
    },
    select: {
      type: 'string',
      title: '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {},
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
    submit: {
      type: 'string',
      title: '提交',
      'x-decorator': 'FormItem',
      'x-component': 'Submit',
      'x-content': '哈哈哈',
      'x-component-props': {
        onSubmit: e => console.log('====', e),
      },
    },
  },
};

const loadData = async field => {
  const input = field.query('input').get('value');
  if (!input) {
    return [];
  }
  return new Promise(resolve => {
    setTimeout(() => {
      if (input === 'asd') {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
          },
          {
            label: 'BBB',
            value: 'ccc',
          },
        ]);
      } else {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
          },
          {
            label: 'DDD',
            value: 'ddd',
          },
        ]);
      }
    }, 1500);
  });
};

const useAsyncDataSource = service => field => {
  field.loading = true;
  service(field).then(
    action.bound?.(data => {
      field.dataSource = data;
      field.loading = false;
    })
  );
};

const test = () => {
  console.log('=======test');
}

const FormEg = props => {
  const { schema, ...rest } = props;
  return (
    <Form form={form} {...rest}>
      <SchemaRender schema={schema} scope={{ test, useAsyncDataSource, loadData }} />
      <FormConsumer>{() => <div>{JSON.stringify(form.values)}</div>}</FormConsumer>
    </Form>
  );
};

export default () => <FormEg schema={SchemaInput} />;
