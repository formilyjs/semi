import React, { createContext, useContext } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import {
  IconPlus,
  IconDelete,
  IconMenu,
  IconChevronDown,
  IconChevronUp
} from '@douyinfe/semi-icons';
import { IconProps as SemiIconProps } from "@douyinfe/semi-ui/lib/es/icons";
import { useField, useFieldSchema, Schema, JSXComponent } from '@formily/react';
import { ArrayField } from '@formily/core';
import { isValid } from '@formily/shared';
import { SortableHandle } from 'react-sortable-hoc';
import cls from 'classnames';

import './index.scss';
import { usePrefixCls } from '../__builtins__';

interface IconProps extends SemiIconProps {
  style?: React.CSSProperties;
  spin?: boolean;
}

export interface IArrayBaseAdditionProps extends ButtonProps {
  title?: string;
  method?: 'push' | 'unshift';
}

export interface IArrayBaseProps {
  disabled?: boolean;
  onAdd?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onMoveUp?: (index: number) => void;
}

export interface IArrayBaseContext {
  props: IArrayBaseProps;
  field: ArrayField;
  schema: Schema;
}

export interface IArrayBaseItemProps {
  index: number;
  style?: React.CSSProperties;
  record: any;
}

export type ArrayBaseMixins = {
  Addition?: React.FC<IArrayBaseAdditionProps>;
  Remove?: React.FC<IconProps & { index?: number }>;
  MoveUp?: React.FC<IconProps & { index?: number }>;
  MoveDown?: React.FC<IconProps & { index?: number }>;
  SortHandle?: React.FC<IconProps & { index?: number }>;
  Index?: React.FC;
  useArray?: () => IArrayBaseContext;
  useIndex?: () => number;
  useRecord?: (record?: number) => any
};

type ComposedArrayBase = React.FC<React.PropsWithChildren<IArrayBaseProps>> &
  ArrayBaseMixins & {
    Item: React.FC<IArrayBaseItemProps>;
    mixin: <T extends JSXComponent>(target: T) => T & ArrayBaseMixins;
  };

const ArrayBaseContext = createContext<IArrayBaseContext>(null);

const ItemContext = createContext<IArrayBaseItemProps>(null);

const useArray = () => useContext(ArrayBaseContext);

const useIndex = (index?: number) => {
  const ctx = useContext(ItemContext);
  return ctx ? ctx.index : index ?? 0;
};

const useRecord = (record?: number) => {
  const ctx = useContext(ItemContext)
  return ctx ? ctx.record : record
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return defaultValue;
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0]);
  if (schema?.items?.type === 'array') return [];
  if (schema?.items?.type === 'boolean') return true;
  if (schema?.items?.type === 'date') return '';
  if (schema?.items?.type === 'datetime') return '';
  if (schema?.items?.type === 'number') return 0;
  if (schema?.items?.type === 'object') return {};
  if (schema?.items?.type === 'string') return '';
  return null;
};

export const ArrayBase: ComposedArrayBase = (props) => {
  const field = useField<ArrayField>();
  const schema = useFieldSchema();
  return (
    <ArrayBaseContext.Provider value={{ field, schema, props }}>
      {props.children}
    </ArrayBaseContext.Provider>
  );
};

ArrayBase.Item = ({ children, ...props }: any) => (
  <ItemContext.Provider value={props}>{children}</ItemContext.Provider>
);

const SortHandle = SortableHandle((props: any) => {
  const prefixCls = usePrefixCls('array-base')
  return (
    <IconMenu
      {...props}
      className={cls(`${prefixCls}-sort-handle`, props.className)}
      style={{ ...props.style }}
    />
  )
}) as any

ArrayBase.SortHandle = (props) => {
  const array = useArray();
  if (!array) return null;
  if (array.field?.pattern !== 'editable') return null;
  return <SortHandle {...props} />;
};

const Index = (props) => {
  const { renderIndex } = props;
  const index = useIndex();
  const prefixCls = usePrefixCls('array-base');
  return (
    <span {...props} className={`${prefixCls}-index`}>
      {renderIndex?.(index) ?? `#${index + 1}.`}
    </span>
  );
};

ArrayBase.Index = Index;

const Addition = (props) => {
  const self = useField();
  const array = useArray();
  const prefixCls = usePrefixCls('array-base');
  if (!array) return null;
  if (
    array?.field?.pattern !== 'editable' &&
    array?.field?.pattern !== 'disabled'
  ) {
    return null;
  }
  return (
    <Button
      block
      {...props}
      disabled={array?.field?.disabled}
      className={cls(`${prefixCls}-addition`, props.className)}
      onClick={(e) => {
        if (array.props?.disabled) return;
        const defaultValue = getDefaultValue(props.defaultValue, array.schema);
        if (props.method === 'unshift') {
          array?.field?.unshift(defaultValue);
          array.props?.onAdd?.(0);
        } else {
          array?.field?.push?.(defaultValue);
          array.props?.onAdd?.(array?.field?.value?.length - 1);
        }
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      icon={<IconPlus />}
    >
      {self.title || props.title}
    </Button>
  );
};

ArrayBase.Addition = Addition;

ArrayBase.Remove = React.forwardRef((props, ref) => {
  const index = useIndex();
  const array = useArray();
  const prefixCls = usePrefixCls('array-base');
  if (!array) return null;
  if (array?.field?.pattern !== 'editable') return null;
  return (
    <IconDelete
      {...props}
      className={cls(`${prefixCls}-remove`, props.className)}
      ref={ref}
      onClick={(e: any) => {
        if (array.props?.disabled) return;
        e.stopPropagation();
        array.field?.remove?.(index);
        array.props?.onRemove?.(index);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    />
  );
});

ArrayBase.MoveDown = React.forwardRef((props, ref) => {
  const index = useIndex(props.index);
  const array = useArray();
  const prefixCls = usePrefixCls('array-base-move-down');
  if (array?.field?.pattern !== 'editable') return null;
  return (
    <IconChevronDown
      {...props}
      className={cls(prefixCls, props.className)}
      ref={ref}
      onClick={(e: any) => {
        if (array.props?.disabled) return;
        e.stopPropagation();
        array.field?.moveDown?.(index);
        array.props?.onMoveDown?.(index);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    />
  );
});

ArrayBase.MoveUp = React.forwardRef((props, ref) => {
  const index = useIndex(props.index);
  const array = useArray();
  const prefixCls = usePrefixCls('array-base-move-up');
  if (array?.field?.pattern !== 'editable') return null;
  return (
    <IconChevronUp
      {...props}
      className={cls(prefixCls, props.className)}
      ref={ref}
      onClick={(e: any) => {
        if (array.props?.disabled) return;
        e.stopPropagation();
        array?.field?.moveUp(index);
        array?.props?.onMoveUp?.(index);
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    />
  );
});

ArrayBase.useArray = useArray;
ArrayBase.useIndex = useIndex;
ArrayBase.useRecord = useRecord;
ArrayBase.mixin = (target: any) => {
  target.Index = ArrayBase.Index;
  target.SortHandle = ArrayBase.SortHandle;
  target.Addition = ArrayBase.Addition;
  target.Remove = ArrayBase.Remove;
  target.MoveDown = ArrayBase.MoveDown;
  target.MoveUp = ArrayBase.MoveUp;
  target.useArray = ArrayBase.useArray;
  target.useIndex = ArrayBase.useIndex;
  target.useRecord = ArrayBase.useRecord;
  return target;
};

export default ArrayBase;
