import React from "react";
import { FormButtonGroup, Submit, SchemaField } from "@formily/semi";
import {
  createForm,
  Field,
  FormPathPattern,
  onFieldReact,
} from "@formily/core";
import { FormProvider } from "@formily/react";
import { action } from "@formily/reactive";

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (
    field: Field
  ) => Promise<{ label: string; value: any; key?: string; children?: any[] }[]>
) => {
  onFieldReact(pattern, (field: any) => {
    field.loading = true;
    service(field).then(
      action.bound?.((data) => {
        field.dataSource = data;
        field.loading = false;
      })
    );
  });
};

const form = createForm({
  effects: () => {
    useAsyncDataSource("select", async (field) => {
      const linkage = field.query("linkage").get("value");
      if (!linkage) {
        return [];
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: "AAA",
                value: "aaa",
                key: "0",
                children: [
                  {
                    label: "Child Node1",
                    value: "Child Node1",
                    key: "0-0",
                  },
                  {
                    label: "Child Node2",
                    value: "Child Node2",
                    key: "0-1",
                  },
                  {
                    label: "Child Node3",
                    value: "Child Node3",
                    key: "0-2",
                  },
                ],
              },
              {
                label: "BBB",
                value: "ccc",
                key: "1",
                children: [
                  {
                    label: "Child Node1",
                    value: "1-0",
                    key: "1-0",
                  },
                  {
                    label: "Child Node2",
                    value: "1-1",
                    key: "1-1",
                  },
                  {
                    label: "Child Node3",
                    value: "1-2",
                    key: "1-2",
                  },
                ],
              },
            ]);
          } else if (linkage === 2) {
            resolve([
              {
                label: "CCC",
                value: "ccc",
                key: "2",
                children: [
                  {
                    label: "Child Node1",
                    value: "2-0",
                    key: "2-0",
                  },
                  {
                    label: "Child Node2",
                    value: "2-1",
                    key: "2-2",
                  },
                  {
                    label: "Child Node3",
                    value: "2-2",
                    key: "2-2",
                  },
                ],
              },
              {
                label: "DDD",
                value: "ddd",
                key: "3",
                children: [
                  {
                    label: "Child Node1",
                    value: "3-0",
                    key: "3-0",
                  },
                  {
                    label: "Child Node2",
                    value: "3-1",
                    key: "3-2",
                  },
                  {
                    label: "Child Node3",
                    value: "4-2",
                    key: "4-2",
                  },
                ],
              },
            ]);
          }
        }, 1500);
      });
    });
  },
});

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="linkage"
        title="联动选择框"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: "发请求1", value: 1, key: "0" },
          { label: "发请求2", value: 2, key: "1" },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
      <SchemaField.String
        name="select"
        title="异步选择框"
        x-decorator="FormItem"
        x-component="TreeSelect"
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
