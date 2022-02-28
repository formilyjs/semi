import React from 'react';
import { Form } from '@douyinfe/semi-ui';
import { useFieldSchema, observer, RecursionField } from '@formily/react';
import { Schema, SchemaKey } from '@formily/json-schema'

export const Section = observer(props => {
  const fieldSchema = useFieldSchema();
  const items: { name: SchemaKey; schema: Schema }[] = [];

  // 获取 properties 里子元素配置，并在下面渲染
  fieldSchema.mapProperties((schema, name) => {
    items.push({
      name,
      schema
    });
  })

  return (
    <Form.Section {...props}>
      {items.map(({ schema, name }, index) => (
        <RecursionField schema={schema} name={name} key={name.toString() + index} />
      ))}
    </Form.Section>
  )
});

export default Section;

