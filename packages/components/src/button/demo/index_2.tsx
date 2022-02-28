import React from "react";
import { SchemaForm } from "@formily/semi";
import { ISchema } from "@formily/react";

const schema: ISchema = {
  type: "object",
  properties: {
    input: {
      type: "string",
      title: "Input",
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    button: {
      type: "void",
      "x-component": "Button",
      "x-component-props": {
        onClick() {
          console.log("onclick");
        },
      },
      "x-content": "Button",
      "x-reactions": {
        dependencies: [".input"],
        fulfill: {
          schema: {
            "x-component-props.onClick":
              '{{() => {console.log("onclick: ", $deps[0])}}}',
          } as any,
        },
      },
    },
  },
};
export default () => <SchemaForm schema={schema} />;
