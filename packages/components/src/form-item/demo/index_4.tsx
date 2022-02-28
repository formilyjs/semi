import React from 'react';
import { SchemaField } from '@formily/semi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const Title = props => <h3>{props.text}</h3>;

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField components={{ Title }}>
      <SchemaField.Void x-component="Title" x-component-props={{ text: 'label为空时的展示' }} />
      <SchemaField.String
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
        }}
      />
      <SchemaField.String
        title=""
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
        }}
      />
      <SchemaField.Void x-component="Title" x-component-props={{ text: '冒号' }} />
      <SchemaField.String title="默认" x-decorator="FormItem" x-component="Input" />
      <SchemaField.String
        title="有冒号(colon=true)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          colon: true,
        }}
      />

      <SchemaField.Void x-component="Title" x-component-props={{ text: '固定宽度设置' }} />
      <SchemaField.String
        title="固定label宽度(labelWidth)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
        }}
      />
      <SchemaField.String
        title="固定label宽度(labelWidth)溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出"
        description="描述描述"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          tooltip: '提示提示',
          tooltipLayout: 'text',
        }}
      />
      <SchemaField.String
        title="固定label宽度(labelWidth)换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行"
        description="描述描述"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          labelWrap: true,
          tooltip: '提示提示',
        }}
      />
      <SchemaField.String
        title="固定内容宽度(wraperWidth)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          wrapperWidth: 300,
        }}
      />

      <SchemaField.Void x-component="Title" x-component-props={{ text: '对齐方式设置' }} />
      <SchemaField.String
        title="label左对齐(labelAlign=left)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          labelAlign: 'left',
        }}
      />
      <SchemaField.String
        title="label右对齐(labelAlign=right默认)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          labelAlign: 'right',
        }}
      />

      <SchemaField.String
        title="内容左对齐(wrapperAlign=left默认)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'left',
        }}
      />
      <SchemaField.String
        title="内容右对齐(wrapperAlign=right)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'right',
        }}
      />

      <SchemaField.String
        title="tooltip"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          tooltip: 'tooltip',
        }}
      />

      <SchemaField.Void x-component="Title" x-component-props={{ text: '是否撑满' }} />

      <SchemaField.String title="默认不撑满(fullness=false)" x-decorator="FormItem" x-component="Select" />
      <SchemaField.String
        title="撑满(fullness=true)"
        x-decorator="FormItem"
        x-component="Select"
        x-decorator-props={{
          fullness: true,
        }}
      />

      <SchemaField.Void x-component="Title" x-component-props={{ text: '辅助信息' }} />

      <SchemaField.String
        title="必填星号"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          asterisk: true,
          labelCol: 6,
          wrapperCol: 10,
        }}
      />

      <SchemaField.String
        title="前缀"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          addonBefore: 'addonBefore',
          labelCol: 6,
          wrapperCol: 10,
        }}
      />
      <SchemaField.String
        title="后缀"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          addonAfter: 'addonAfter',
          labelCol: 6,
          wrapperCol: 10,
        }}
      />

      <SchemaField.String
        title="帮助信息feedbackText"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackText: 'feedbackText',
          labelCol: 6,
          wrapperCol: 10,
        }}
      />

      <SchemaField.String
        title="额外信息extra"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackText: 'feedbackText',
          extra: 'extra',
          labelCol: 6,
          wrapperCol: 10,
        }}
      />
    </SchemaField>
  </FormProvider>
);
