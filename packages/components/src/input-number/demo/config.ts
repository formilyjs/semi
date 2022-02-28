const config = {
  type: 'object',
  properties: {
    inputNumber: {
      type: 'string',
      title: 'inputNumber',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        step: 2,
      },
    },
    numberPicker: {
      type: 'string',
      title: 'numberPicker',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        step: 5,
      },
    },
  },
};

export default config;
