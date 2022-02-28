const config = {
  type: 'object',
  properties: {
    checkbox: {
      type: 'object',
      'x-component': 'Section',
      'x-decorator': 'FormItem',
      'x-component-props': {
        text: 'checkbox area',
      },
      properties: {
        checkbox: {
          type: 'string',
          title: 'checkbox',
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox',
          'x-content': 'apple',
        },
      },
    },
    radio: {
      type: 'object',
      'x-component': 'Section',
      'x-decorator': 'FormItem',
      'x-component-props': {
        text: 'radio area',
      },
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
      },
    },
  },
};

export default config;
