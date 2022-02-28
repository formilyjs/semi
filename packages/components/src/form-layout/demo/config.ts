const config = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormLayout',
      'x-decorator-props': {
        direction: 'rtl'
      },
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          input: {
            type: 'string',
            title: '输入框',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            description: '在FormLayout加入direction: rtl',
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormLayout',
      title: '对象数组',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              date: {
                type: 'string',
                title: '日期',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              input: {
                type: 'string',
                title: '输入框',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-decorator-props': {
                  direction: 'rtl'
                },
                description: '在FormItem加入direction: rtl',
              },
              select: {
                type: 'string',
                title: '下拉框',
                required: true,
                enum: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
};

export default config;
