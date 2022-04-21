import React, { Fragment, useState, useEffect } from "react";
import { Card, Collapse, Empty } from "@douyinfe/semi-ui";
import { CollapsePanelProps } from "@douyinfe/semi-ui/lib/es/collapse";
import { CollapseReactProps } from "@douyinfe/semi-ui/lib/es/collapse";
import { ArrayField } from "@formily/core";
import {
  RecursionField,
  useField,
  useFieldSchema,
  observer,
  ISchema,
} from "@formily/react";
import { toArr } from "@formily/shared";
import cls from "classnames";
import ArrayBase, { ArrayBaseMixins, IArrayBaseProps } from "../array-base";
import { usePrefixCls } from "../__builtins__";
import "./index.scss";

export interface IArrayCollapseProps extends CollapseReactProps {
  defaultOpenPanelCount?: number;
  prefixCls?: string;
  arrayBaseProps?: IArrayBaseProps;
}
type ComposedArrayCollapse = React.FC<IArrayCollapseProps> &
  ArrayBaseMixins & {
    CollapsePanel?: React.FC<CollapsePanelProps>;
  };

const isAdditionComponent = (schema: ISchema) => {
  return schema["x-component"]?.indexOf("Addition") > -1;
};

const isIndexComponent = (schema: ISchema) => {
  return schema["x-component"]?.indexOf("Index") > -1;
};

const isRemoveComponent = (schema: ISchema) => {
  return schema["x-component"]?.indexOf("Remove") > -1;
};

const isMoveUpComponent = (schema: ISchema) => {
  return schema["x-component"]?.indexOf("MoveUp") > -1;
};

const isMoveDownComponent = (schema: ISchema) => {
  return schema["x-component"]?.indexOf("MoveDown") > -1;
};

const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  );
};

const range = (count: number) => Array.from({ length: count }).map((_, i) => i);

const takeDefaultActiveKeys = (
  dataSourceLength: number,
  defaultOpenPanelCount = Infinity
) => {
  if (dataSourceLength < defaultOpenPanelCount) return range(dataSourceLength);
  return range(defaultOpenPanelCount);
};

const insertActiveKeys = (activeKeys: number[], index: number) => {
  if (activeKeys.length <= index) return activeKeys.concat(index);
  return activeKeys.reduce((buf: number[], key) => {
    if (key < index) return buf.concat(key);
    if (key === index) return buf.concat([key, key + 1]);
    return buf.concat(key + 1);
  }, []);
};

export const ArrayCollapse: ComposedArrayCollapse = observer(
  (props: IArrayCollapseProps) => {
    const { arrayBaseProps, ...respProps } = props;
    const field = useField<ArrayField>();
    const dataSource = Array.isArray(field.value) ? field.value : [];
    const [activeKeys, setActiveKeys] = useState<number[]>(
      takeDefaultActiveKeys(dataSource.length, respProps.defaultOpenPanelCount)
    );
    const schema = useFieldSchema();
    const prefixCls = usePrefixCls("array-collapse", respProps);
    useEffect(() => {
      if (!field.modified && dataSource.length) {
        setActiveKeys(
          takeDefaultActiveKeys(
            dataSource.length,
            respProps.defaultOpenPanelCount
          )
        );
      }
    }, [dataSource.length, field]);
    if (!schema) throw new Error("can not found schema object");

    const renderAddition = () => {
      return schema.reduceProperties((addition, schema, key) => {
        if (isAdditionComponent(schema)) {
          return <RecursionField schema={schema} name={key} />;
        }
        return addition;
      }, null);
    };
    const renderEmpty = () => {
      if (dataSource.length) return;
      return (
        <Card className={cls(`${prefixCls}-item`, respProps.className)}>
          <Empty />
        </Card>
      );
    };

    const renderItems = () => {
      return (
        <Collapse
          {...respProps}
          activeKey={activeKeys as any}
          onChange={(keys: string[]) => setActiveKeys(toArr(keys).map(Number))}
          className={cls(`${prefixCls}-item`, respProps.className)}
        >
          {dataSource.map((item, index) => {
            const items = Array.isArray(schema.items)
              ? schema.items[index] || schema.items[0]
              : schema.items;

            const panelProps = field
              .query(`${field.address}.${index}`)
              .get("componentProps");
            const props: CollapsePanelProps = items?.["x-component-props"];
            const extra = (
              <ArrayBase.Item index={index} record={item}>
                <RecursionField
                  schema={items as any}
                  name={index}
                  filterProperties={(schema) => {
                    if (!isOperationComponent(schema)) return false;
                    return true;
                  }}
                  onlyRenderProperties
                />
                {props?.extra}
              </ArrayBase.Item>
            );

            const content = (
              <RecursionField
                schema={items as any}
                name={index}
                filterProperties={(schema) => {
                  if (isIndexComponent(schema)) return false;
                  if (isOperationComponent(schema)) return false;
                  return true;
                }}
              />
            );
            return (
              <Collapse.Panel
                {...props}
                {...panelProps}
                key={index}
                itemKey={index as any}
                //  header={header()}
                // header 仅为 string 时，extra 才可用
                extra={extra}
              >
                <ArrayBase.Item index={index} key={index} record={item}>
                  {content}
                </ArrayBase.Item>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      );
    };
    return (
      <ArrayBase
        {...arrayBaseProps}
        onAdd={(index) => {
          setActiveKeys(insertActiveKeys(activeKeys, index));
          arrayBaseProps?.onAdd?.(index);
        }}
      >
        {renderEmpty()}
        {renderItems()}
        {renderAddition()}
      </ArrayBase>
    );
  }
);

const CollapsePanel: React.FC<CollapsePanelProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

CollapsePanel.displayName = "CollapsePanel";

ArrayCollapse.defaultProps = {
  defaultOpenPanelCount: 5,
};
ArrayCollapse.displayName = "ArrayCollapse";
ArrayCollapse.CollapsePanel = CollapsePanel;

ArrayBase.mixin(ArrayCollapse);

export default ArrayCollapse;
