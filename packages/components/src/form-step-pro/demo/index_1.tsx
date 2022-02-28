import React from "react";
import { SchemaField } from "@formily/semi";
import { createForm } from "@formily/core";
import { FormProvider } from "@formily/react";

const form = createForm();

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Void
        name="formStep"
        x-component="FormStepPro"
        x-component-props={{ onSubmit: console.log }}
      >
        <SchemaField.Void
          name="step1"
          x-component="FormStepPro.StepPane"
          x-component-props={{ title: "第一步" }}
        >
          <SchemaField.String
            name="aaa"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField.Void>
        <SchemaField.Void
          name="step2"
          x-component="FormStepPro.StepPane"
          x-component-props={{ title: "第二步" }}
        >
          <SchemaField.String
            name="bbb"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField.Void>
        <SchemaField.Void
          name="step3"
          type="void"
          x-component="FormStepPro.StepPane"
          x-component-props={{ title: "第三步" }}
        >
          <SchemaField.String
            name="ccc"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField.Void>
        <SchemaField.Void
          name="previous"
          x-component="FormStepPro.Previous"
          x-component-props={{ text: "上一步" }}
        />
        <SchemaField.Void
          name="next"
          x-component="FormStepPro.Next"
          x-component-props={{ text: "下一步" }}
        />
        <SchemaField.Void
          name="submit"
          x-component="FormStepPro.Submit"
          x-component-props={{ text: "提交" }}
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
);
