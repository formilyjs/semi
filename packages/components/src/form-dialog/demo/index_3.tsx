import React from "react";
import { FormDialog, FormItem, FormLayout, Input } from "@formily/semi";
import { Field } from "@formily/react";
import { Button } from "@douyinfe/semi-ui";

export default () => (
  <Button
    onClick={() => {
      FormDialog("弹窗表单", () => (
        <FormLayout labelCol={6} wrapperCol={10}>
          <Field
            name="aaa"
            required
            title="输入框1"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="bbb"
            required
            title="输入框2"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="ccc"
            required
            title="输入框3"
            decorator={[FormItem]}
            component={[Input]}
          />
          <Field
            name="ddd"
            required
            title="输入框4"
            decorator={[FormItem]}
            component={[Input]}
          />
          <FormDialog.Footer>
            <span style={{ marginLeft: 4 }}>扩展文案</span>
          </FormDialog.Footer>
        </FormLayout>
      ))
        .forOpen((form, next) => {
          setTimeout(() => {
            next({
              initialValues: {
                aaa: "123",
              },
            });
          }, 1000);
        })
        .forConfirm((form, next) => {
          setTimeout(() => {
            console.log(form);
            next(form);
          }, 1000);
        })
        .forCancel((form, next) => {
          setTimeout(() => {
            console.log(form);
            next(form);
          }, 1000);
        })
        .open()
        .then(console.log);
    }}
  >
    点我打开表单
  </Button>
);
