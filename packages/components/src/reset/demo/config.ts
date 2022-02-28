const radioGroupOptions = [
  { label: 'Guest', value: 'Guest', extra: 'Semi Design', style: { width: 120 } },
  { label: 'Developer', value: 'Developer', extra: 'Semi Design', style: { width: 120 }, disabled: true },
  { label: 'Maintainer', value: 'Maintainer', extra: 'Semi Design', style: { width: 120 } },
];

const addGroupOptions = field => {
  setTimeout(() => {
    field.dataSource = radioGroupOptions;
  }, 10);
};

const config = {
  type: 'object',
  properties: {
    radio: {
      type: 'string',
      title: 'radio',
      'x-decorator': 'FormItem',
      'x-component': 'Radio',
      'x-component-props': {
        extra: 'Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统',
      },
      'x-content': 'semi design',
    },
    radioGroup: {
      type: 'string',
      title: 'radio group',
      'x-decorator': 'FormItem',
      'x-component': 'RadioGroup',
      'x-component-props': {
        // options: radioGroupOptions, // 为啥直接传不行
        mode: 'advanced',
      },
      'x-reactions': [addGroupOptions],
    },
  },
};

export default config;
