import React, { Fragment, useState } from "react";
import { Tabs, Badge, TabPane, Button } from "@douyinfe/semi-ui";
import { ArrayField } from "@formily/core";
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
  ReactFC,
} from "@formily/react";
import cls from "classnames";
import { TabsProps } from "@douyinfe/semi-ui/lib/es/tabs";
import { IconPlus } from "@douyinfe/semi-icons";

import "./index.scss";
import { usePrefixCls } from "../__builtins__";
import ArrayBase from "../array-base";

interface IFeedbackBadgeProps {
  index: number;
}
const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer((props) => {
  const field = useField<ArrayField>();
  const tab = `${field.title || "Untitled"} ${props.index + 1}`;
  const errors = field.errors.filter((error) =>
    error.address.includes(`${field.address}.${props.index}`)
  );
  if (errors.length) {
    return (
      <Badge className="errors-badge" count={errors.length} type="danger">
        {tab}
      </Badge>
    );
  }
  return <Fragment>{tab}</Fragment>;
});

export const ArrayTabs: React.FC<TabsProps> = observer((props) => {
  const field = useField<ArrayField>();
  const schema = useFieldSchema();
  const prefix = usePrefixCls("tabs");
  const [activeKey, setActiveKey] = useState("tab-0");
  const value = Array.isArray(field.value) ? field.value : [];
  const dataSource = value?.length ? value : [{}];
  const onEdit = (targetKey: any, type: "add" | "remove") => {
    if (type == "add") {
      const id = dataSource.length;
      if (field?.value?.length) {
        field.push(null);
      } else {
        field.push(null, null);
      }
      setActiveKey(`tab-${id}`);
    } else if (type == "remove") {
      const index = Number(targetKey.match(/-(\d+)/)?.[1]);
      if (index - 1 > -1) {
        setActiveKey(`tab-${index - 1}`);
      }
      field.remove(index);
    }
  };
  return (
    <Tabs
      {...props}
      className={cls(prefix, props.className)}
      activeKey={activeKey}
      onChange={(key) => {
        // 获取当前tab的index eg:tab-1=>1
        const index = Number(key.match(/-(\d+)/)?.[1]);
        if (dataSource.length !== index) {
          setActiveKey(key);
        }
      }}
      type="card"
      tabBarExtraContent={
        field.pattern === "editable" && (
          <Button
            icon={<IconPlus />}
            className={cls(`${prefix}-addition`)}
            onClick={onEdit.bind(null, null, "add")}
          />
        )
      }
      onTabClose={(key) => onEdit(key, "remove")}
    >
      {dataSource?.map((data, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index]
          : (schema.items as any);
        const key = `tab-${index}`;
        return (
          <TabPane
            key={key}
            itemKey={key}
            closable={index !== 0 && field.pattern === "editable"}
            tab={
              <ArrayBase.Item key={`${key}-item`} index={index} record={data}>
                <FeedbackBadge index={index} />
              </ArrayBase.Item>
            }
          >
            <ArrayBase.Item key={index} index={index} record={data}>
              <RecursionField schema={items} name={index} />
            </ArrayBase.Item>
          </TabPane>
        );
      })}
    </Tabs>
  );
});

export default ArrayTabs;
