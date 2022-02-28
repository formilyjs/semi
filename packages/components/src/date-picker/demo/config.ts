const config = {
  type: 'object',
  properties: {
    datePicker: {
      type: 'string',
      title: '日期选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        onChange: (...p) => {
          console.log('datepicker onChange: ', ...p);
        },
      },
    },
    dateTimePicker: {
      type: 'string',
      title: '时间日期选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'dateTime',
      },
    },
    dateRangePicker: {
      type: 'string',
      title: '日期范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'dateRange',
      },
    },
    dateTimeRangePicker: {
      type: 'string',
      title: '时间日期范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'dateTimeRange',
      },
    },
  },
};

export default config;
