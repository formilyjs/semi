import React, { createContext, useContext } from "react";
import { FormDialog, FormItem, FormLayout, Input } from "@formily/semi";
import { createSchemaField } from "@formily/react";
import { Button } from "@douyinfe/semi-ui";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const Context = createContext(null);

const PortalId = "可以传，也可以不传的ID，默认是form-dialog";

export default () => (
  <Context.Provider value="自定义上下文可以直接传到弹窗内部，只需要ID一致即可">
    <FormDialog.Portal id={PortalId}>
      <Button
        onClick={() => {
          FormDialog("弹窗表单", PortalId, (form) => {
            console.log(useContext(Context));
            return (
              <FormLayout labelCol={6} wrapperCol={10}>
                <SchemaField>
                  <SchemaField.String
                    name="aaa"
                    required
                    title="输入框1"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemaField.String
                    name="bbb"
                    required
                    title="输入框2"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemaField.String
                    name="ccc"
                    required
                    title="输入框3"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemaField.String
                    name="ddd"
                    required
                    title="输入框4"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaField>
                <FormDialog.Footer>
                  <span style={{ marginLeft: 4 }}>
                    扩展文案：{form.values.aaa}
                  </span>
                </FormDialog.Footer>
              </FormLayout>
            );
          })
            .forOpen((formInst, next) => {
              setTimeout(() => {
                next({
                  initialValues: {
                    aaa: "123",
                  },
                });
              }, 1000);
            })
            .forConfirm((formInst, next) => {
              setTimeout(() => {
                console.log(formInst);
                next(formInst);
              }, 1000);
            })
            .forCancel((formInst, next) => {
              setTimeout(() => {
                console.log(formInst);
                next(formInst);
              }, 1000);
            })
            .open()
            .then(console.log)
            .catch(console.error);
        }}
      >
        点我打开表单
      </Button>
    </FormDialog.Portal>
  </Context.Provider>
);
