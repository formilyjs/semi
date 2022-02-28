import React from "react";
import {
  TreeSelect,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
} from "@formily/semi";
import {
  createForm,
  Field as FieldType,
  FormPathPattern,
  onFieldReact,
} from "@formily/core";
import { FormProvider, Field } from "@formily/react";
import { action } from "@formily/reactive";

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (
    field: FieldType
  ) => Promise<{ label: string; value: any; [key: string]: any }[]>
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
                    value: "0-0-0",
                    key: "0-0-0",
                  },
                  {
                    label: "Child Node2",
                    value: "0-0-1",
                    key: "0-0-1",
                  },
                  {
                    label: "Child Node3",
                    value: "0-0-2",
                    key: "0-0-2",
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
                    value: "0-1-0",
                    key: "0-1-0",
                  },
                  {
                    label: "Child Node2",
                    value: "0-1-1",
                    key: "0-1-1",
                  },
                  {
                    label: "Child Node3",
                    value: "0-1-2",
                    key: "0-1-2",
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
                    value: "0-0-0",
                    key: "0-0-0",
                  },
                  {
                    label: "Child Node2",
                    value: "0-0-1",
                    key: "0-0-1",
                  },
                  {
                    label: "Child Node3",
                    value: "0-0-2",
                    key: "0-0-2",
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
                    value: "0-1-0",
                    key: "0-1-0",
                  },
                  {
                    label: "Child Node2",
                    value: "0-1-1",
                    key: "0-1-1",
                  },
                  {
                    label: "Child Node3",
                    value: "0-1-2",
                    key: "0-1-2",
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
    <Field
      name="linkage"
      title="联动选择框"
      dataSource={[
        { label: "发请求1", value: 1, key: "0" },
        { label: "发请求2", value: 2, key: "1" },
      ]}
      decorator={[FormItem]}
      component={[
        Select,
        {
          style: {
            width: 200,
          },
        },
      ]}
    />
    <Field
      name="select"
      title="异步选择框"
      decorator={[FormItem]}
      component={[
        TreeSelect,
        {
          style: {
            width: 200,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);
