const config = {
  type: 'object',
  properties: {
    timePicker: {
      type: 'string',
      title: '时间选择',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
    },
    timeRangePicker: {
      type: 'string',
      title: '时间范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        type: 'timeRange',
      },
    },
  },
};

export default config;
