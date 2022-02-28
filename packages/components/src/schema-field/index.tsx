import React from 'react';
import { createSchemaField } from '@formily/react';
import { JSXElementConstructor } from 'react';
import * as components from '../components';

type JSXComponent = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export const SchemaField = createSchemaField({
  components: (components as unknown) as Record<string, JSXComponent>,
});

// 为了解决 d.js 类型校验错误的问题
export const SchemaRender = (args: any) => <SchemaField {...args} />
export default SchemaRender;
