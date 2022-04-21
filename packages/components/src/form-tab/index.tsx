import React, { Fragment, useMemo, useRef } from "react";
import { Tabs, TabPane as TabPaneSemi, Badge } from "@douyinfe/semi-ui";
import { model } from "@formily/reactive";
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from "@formily/react";
import { Schema, SchemaKey } from "@formily/json-schema";
import cls from "classnames";
import { usePrefixCls } from "../__builtins__";
import { TabPaneProps, TabsProps } from "@douyinfe/semi-ui/lib/es/tabs";

export interface IFormTab {
  activeKey?: string;
  setActiveKey(key: string): void;
}

export interface IFormTabProps extends TabsProps {
  formTab?: IFormTab;
}

export interface IFormTabPaneProps extends TabPaneProps {
  key: string | number;
}

type ComposedFormTab = React.FC<IFormTabProps> & {
  TabPane?: React.FC<IFormTabPaneProps>;
  createFormTab?: (defaultActiveKey?: string) => IFormTab;
};

const useTabs = () => {
  const tabsField = useField();
  const schema = useFieldSchema();
  const tabs: { name: SchemaKey; props: any; schema: Schema }[] = [];
  schema.mapProperties((schema, name) => {
    const field = tabsField.query(tabsField.address.concat(name)).take();
    if (field?.display === "none" || field?.display === "hidden") return;
    if (schema["x-component"]?.indexOf("TabPane") > -1) {
      tabs.push({
        name,
        props: {
          itemKey: schema?.["x-component-props"]?.itemKey || name,
          ...schema?.["x-component-props"],
        },
        schema,
      });
    }
  });
  return tabs;
};

const createFormTab = (defaultActiveKey?: string, activeKey?: string) => {
  const formTab: any = model({
    defaultActiveKey,
    activeKey,
    setActiveKey(key: string) {
      formTab.activeKey = key;
    },
  });
  return formTab;
};

export const FormTab: ComposedFormTab = observer(({ formTab, ...props }) => {
  const field = useField();
  const tabs = useTabs();
  const tabsRef = useRef(tabs);
  const propsRef = useRef(props);
  const _formTab = useMemo(() => {
    return (
      formTab ??
      createFormTab(
        propsRef.current.defaultActiveKey ??
          tabsRef.current?.[0]?.props?.itemKey,
        propsRef.current.activeKey
      )
    );
  }, [formTab]);
  const prefixCls = usePrefixCls("formily-tab");
  const badgedTab = (key: SchemaKey, props: any) => {
    const errors = field.form.queryFeedbacks({
      type: "error",
      address: `${field.address.concat(key)}.*`,
    });
    if (errors.length) {
      return (
        <Badge className="errors-badge" count={errors.length}>
          {props.tab}
        </Badge>
      );
    }
    return props.tab;
  };

  return (
    <Tabs
      {...props}
      className={cls(prefixCls, props.className)}
      defaultActiveKey={_formTab?.defaultActiveKey}
      activeKey={_formTab?.activeKey ?? _formTab?.defaultActiveKey}
      onChange={(key) => {
        props.onChange?.(key);
        _formTab?.setActiveKey?.(key);
      }}
    >
      {tabs.map(({ props, schema, name }, key) => (
        <TabPaneSemi key={key} {...props} tab={badgedTab(name, props)}>
          <RecursionField schema={schema} name={name} />
        </TabPaneSemi>
      ))}
    </Tabs>
  );
});

const TabPane: React.FC<IFormTabPaneProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

FormTab.TabPane = TabPane;
FormTab.createFormTab = createFormTab;

export default FormTab;
