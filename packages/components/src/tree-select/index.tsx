import React from "react";
import { connect, mapReadPretty, mapProps } from "@formily/react";
import { TreeSelect as SemiTreeSelect } from "@douyinfe/semi-ui";
import { PreviewText } from "../preview-text";
import { IconSpin } from "@douyinfe/semi-icons";

export const TreeSelect = connect(
  SemiTreeSelect,
  mapProps(
    {
      dataSource: "treeData",
    },
    (props, field) => ({
      ...props,
      suffixIcon:
        field?.["loading"] || field?.["validating"] ? (
          <IconSpin />
        ) : (
          props?.["arrowIcon"]
        ),
    })
  ),
  mapReadPretty(PreviewText.TreeSelect)
);

export default TreeSelect;
