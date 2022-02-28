import React from "react";
import { SchemaField } from "@formily/semi";
import { createForm } from "@formily/core";
import { FormProvider } from "@formily/react";
import { IconTick, IconSpin } from "@douyinfe/semi-icons";

const Title = (props) => <h3>{props.text}</h3>;
const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField components={{ Title }}>
      <SchemaField.String
        title="错误状态(feedbackStatus=error)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        x-decorator-props={{
          feedbackStatus: "error",
        }}
      />

      <SchemaField.String
        title="警告状态(feedbackStatus=warning)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        x-decorator-props={{
          feedbackStatus: "warning",
        }}
      />

      <SchemaField.String
        title="成功状态(feedbackStatus=success)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        x-decorator-props={{
          feedbackStatus: "success",
          feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
        }}
      />

      <SchemaField.String
        title="加载状态(feedbackStatus=pending)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        x-decorator-props={{
          feedbackStatus: "pending",
          feedbackIcon: <IconSpin style={{ color: "#1890ff" }} />,
        }}
      />

      <SchemaField.Void
        x-component="Title"
        x-component-props={{ text: "反馈信息的布局" }}
      />

      <SchemaField.String
        title="紧凑模式required"
        x-decorator="FormItem"
        x-component="Input"
        required
        x-decorator-props={{
          feedbackLayout: "terse",
        }}
      />

      <SchemaField.String
        title="紧凑模式有feedback(feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackStatus: "error",
          feedbackText: "error message",
          feedbackLayout: "terse",
        }}
      />

      <SchemaField.String
        title="紧凑模式无feedback(feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackLayout: "terse",
        }}
      />

      <SchemaField.String
        title="松散模式(feedbackLayout=loose)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackStatus: "error",
          feedbackText: "error message",
          feedbackLayout: "loose",
        }}
      />

      <SchemaField.String
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackStatus: "warning",
          feedbackText: "warning message",
          feedbackLayout: "popover",
        }}
      />

      <SchemaField.String
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackStatus: "error",
          feedbackText: "error message",
          feedbackLayout: "popover",
        }}
      />
      <SchemaField.String
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        x-decorator-props={{
          feedbackStatus: "success",
          feedbackText: "success message",
          feedbackLayout: "popover",
        }}
      />

      <SchemaField.Void
        x-component="Title"
        x-component-props={{ text: "组件的适配情况" }}
      />
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{ layout: "vertical" }}
      >
        <SchemaField.String
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />

        <SchemaField.String
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />
        <SchemaField.String
          title="DatePicker.TimePicker"
          x-decorator="FormItem"
          x-component="TimePicker"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />
        <SchemaField.String
          title="InputNumber"
          x-decorator="FormItem"
          x-component="InputNumber"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />

        <SchemaField.String
          title="TreeSelect"
          x-decorator="FormItem"
          x-component="TreeSelect"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />

        <SchemaField.String
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          x-decorator-props={{
            feedbackStatus: "success",
            feedbackIcon: <IconTick style={{ color: "#52c41a" }} />,
          }}
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
);
