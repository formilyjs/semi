import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Table, Pagination, Space, Select, Badge } from "@douyinfe/semi-ui";
import { PaginationProps } from "@douyinfe/semi-ui/lib/es/pagination";
import { TableProps, ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { SelectProps } from "@douyinfe/semi-ui/lib/es/select";
import cls from "classnames";
import { GeneralField, FieldDisplayTypes, ArrayField } from "@formily/core";
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from "@formily/react";
import { isArr, isBool, isFn, uid } from "@formily/shared";
import { Schema } from "@formily/json-schema";

import "./index.scss";
import {
  usePrefixCls,
  SortableContainer,
  SortableElement,
} from "../__builtins__";
import { ArrayBase, ArrayBaseMixins, IArrayBaseProps } from "../array-base";

interface ObservableColumnSource {
  field: GeneralField;
  columnProps: ColumnProps<any>;
  schema: Schema;
  display: FieldDisplayTypes;
  name: string;
}
interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[];
  showPagination?: boolean;
  children?: (
    dataSource: any[],
    pagination: React.ReactNode,
    options: {
      startIndex: number;
    }
  ) => React.ReactElement;
}

interface IStatusSelectProps extends SelectProps {
  pageSize?: number;
}

type ComposedArrayTable = React.FC<
  TableProps<any> &
    IArrayBaseProps & {
      arrayBaseProps: IArrayBaseProps;
    }
> &
  ArrayBaseMixins & {
    Column?: React.FC<ColumnProps<any>>;
  };

interface PaginationAction {
  totalPage?: number;
  pageSize?: number;
  showPagination?: boolean;
  changePage?: (page: number) => void;
}

const SortableRow = SortableElement((props: any) => <tr {...props} />);
const SortableBody = SortableContainer((props: any) => <tbody {...props} />);

const isColumnComponent = (schema: Schema) => {
  return schema["x-component"]?.indexOf("Column") > -1;
};

const isOperationsComponent = (schema: Schema) => {
  return schema["x-component"]?.indexOf("Operations") > -1;
};

const isAdditionComponent = (schema: Schema) => {
  return schema["x-component"]?.indexOf("Addition") > -1;
};

const useArrayTableSources = () => {
  const arrayField = useField();
  const schema = useFieldSchema();
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema["x-component-props"]?.["dataIndex"] && !schema["name"])
        return [];
      const name = schema["x-component-props"]?.["dataIndex"] || schema["name"];
      const field = arrayField.query(arrayField.address.concat(name)).take();
      const columnProps =
        field?.component?.[1] || schema["x-component-props"] || {};
      const display = field?.display || schema["x-display"];
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ];
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema));
      }, []);
    }
    return [];
  };

  const parseArrayItems = (schema: Schema["items"]) => {
    if (!schema) return [];
    const sources: ObservableColumnSource[] = [];
    const items = isArr(schema) ? schema : [schema];
    return items.reduce((columns, schema) => {
      const item = parseSources(schema as Schema);
      if (item) {
        return columns.concat(item);
      }
      return columns;
    }, sources);
  };

  if (!schema) throw new Error("can not found schema object");

  return parseArrayItems(schema.items);
};

const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>["columns"] => {
  return sources.reduce(
    (buf: any, { name, columnProps, schema, display }, key) => {
      if (display !== "visible") return buf;
      if (!isColumnComponent(schema)) return buf;
      return buf.concat({
        ...columnProps,
        key,
        dataIndex: name,
        render: (_: any, record: any) => {
          const index = dataSource.indexOf(record);
          const children = (
            <ArrayBase.Item index={index} record={() => record}>
              <RecursionField
                schema={schema}
                name={index}
                onlyRenderProperties
              />
            </ArrayBase.Item>
          );
          return index > -1 ? children : null;
        },
      });
    },
    []
  );
};

const useAddition = () => {
  const schema = useFieldSchema();
  return schema.reduceProperties((addition, schema, key) => {
    if (isAdditionComponent(schema)) {
      return <RecursionField schema={schema} name={key} />;
    }
    return addition;
  }, null);
};

const schedulerRequest = {
  request: null,
};
const StatusSelect: React.FC<IStatusSelectProps> = observer(
  (props) => {
    const field = useField<ArrayField>();
    const prefixCls = usePrefixCls("array-table");
    const errors = field.errors;
    const parseIndex = (address: string) => {
      return Number(
        address
          .slice(address.indexOf(field.address.toString()) + 1)
          .match(/(\d+)/)?.[1]
      );
    };
    const options = props.optionList?.map(({ label, value }: any) => {
      const hasError = errors.some(({ address }) => {
        const currentIndex = parseIndex(address);
        const startIndex = (value - 1) * props.pageSize;
        const endIndex = value * props.pageSize;
        return currentIndex >= startIndex && currentIndex <= endIndex;
      });
      return {
        label: hasError ? <Badge dot>{label}</Badge> : label,
        value,
      };
    });

    const width = String(options?.length).length * 15;

    return (
      <Select
        value={props.value}
        onChange={props.onChange}
        optionList={options}
        style={{
          width: width < 60 ? 60 : width,
        }}
        className={cls(`${prefixCls}-status-select`, {
          "has-error": errors?.length,
        })}
      />
    );
  },
  {
    scheduler: (update) => {
      clearTimeout(schedulerRequest.request);
      schedulerRequest.request = setTimeout(() => {
        update();
      }, 100);
    },
  }
);

const PaginationContext = createContext<PaginationAction>({});
const usePagination = () => {
  return useContext(PaginationContext);
};

const ArrayTablePagination: React.FC<IArrayTablePaginationProps> = (props) => {
  const [current, setCurrent] = useState(1);
  const prefixCls = usePrefixCls("array-table");
  const showPagination = props.showPagination ?? true;
  const pageSize = props.pageSize || 10;
  const size = props.size || "default";
  const dataSource = props.dataSource || [];
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;
  const total = dataSource?.length || 0;
  const totalPage = Math.ceil(total / pageSize);
  const pages = Array.from(new Array(totalPage)).map((_, index) => {
    const page = index + 1;
    return {
      label: page,
      value: page,
    };
  });
  const handleChange = (current: number) => {
    setCurrent(current);
  };
  useEffect(() => {
    if (totalPage > 0 && totalPage < current) {
      handleChange(totalPage);
    }
  }, [totalPage, current]);

  const renderPagination = () => {
    if (totalPage <= 1 || !showPagination) return;
    return (
      <div className={`${prefixCls}-pagination`}>
        <Space>
          <StatusSelect
            value={current}
            pageSize={pageSize}
            onChange={handleChange}
            optionList={pages}
            emptyContent={false}
          />
          <Pagination
            {...props}
            pageSize={pageSize}
            currentPage={current}
            total={dataSource.length}
            size={size}
            showSizeChanger={false}
            onChange={handleChange}
          />
        </Space>
      </div>
    );
  };

  return (
    <Fragment>
      <PaginationContext.Provider
        value={{
          totalPage,
          pageSize,
          changePage: handleChange,
          showPagination,
        }}
      >
        {props.children?.(
          showPagination
            ? dataSource?.slice(startIndex, endIndex + 1)
            : dataSource,
          renderPagination(),
          { startIndex }
        )}
      </PaginationContext.Provider>
    </Fragment>
  );
};
// components.wrapper所需要参数
const ArrayTableComponentsContext = React.createContext<{
  ref?: React.RefObject<HTMLDivElement | null>;
  field?: ArrayField;
}>({});

const getWrapperComp: (dataSource: any[], start: number) => React.FC<any> =
  (dataSource, start) => (props) => {
    const { ref, field } = useContext(ArrayTableComponentsContext);
    const prefixCls = usePrefixCls("formily-array-table");

    const addTdStyles = (id: number) => {
      const node = ref.current?.querySelector(`.${prefixCls}-row-${id}`);
      const helper = document.body.querySelector(`.${prefixCls}-sort-helper`);
      if (!helper) return;
      const tds = node.querySelectorAll("td");
      if (!tds) return;
      requestAnimationFrame(() => {
        helper.querySelectorAll("td").forEach((td, index) => {
          if (tds[index]) {
            td.style.width = getComputedStyle(tds[index]).width;
          }
        });
      });
    };

    return (
      <SortableBody
        {...props}
        start={start}
        list={dataSource.slice()}
        accessibility={{
          container: ref?.current?.querySelector("tbody") || undefined,
        }}
        onSortStart={(event) => {
          addTdStyles(event.active.id);
        }}
        onSortEnd={({ oldIndex, newIndex }) => {
          field?.move(oldIndex, newIndex);
        }}
        className={cls(`${prefixCls}-sort-helper`, props.className)}
      />
    );
  };

/**
 * 这里将Table.components写在函数外，使得components避免不必要的更新
 *
 * 原因：如果每次render时Table每次都拿到一个新的对象。Table内部是lodash.merge深拷贝了一份这个对象，导致components.body.row & wrapper每次都会变。
 * 当在array-table中用如文件上传组件时，会将原先的input销毁，导致没法监听到组件的onChange事件
 */
const getArrayTableComponents = (dataSource: any[], startIndex: number) => ({
  body: {
    wrapper: getWrapperComp(dataSource, startIndex),
    row: (props: any) => {
      const prefixCls = usePrefixCls("formily-array-table");
      const index = props.index || props["data-row-key"] || 0;
      return (
        <SortableRow
          lockAxis="y"
          {...props}
          index={index}
          className={cls(props.className, `${prefixCls}-row-${index + 1}`)}
        />
      );
    },
  },
});

export const ArrayTable: ComposedArrayTable = observer((props) => {
  const ref: any = useRef<HTMLDivElement>();
  const field = useField<ArrayField>();
  const prefixCls = usePrefixCls("array-table");
  const dataSource = Array.isArray(field.value) ? field.value.slice() : [];
  const sources = useArrayTableSources();
  const columns = useArrayTableColumns(dataSource, sources);
  const pagination = isBool(props.pagination) ? {} : props.pagination;
  const addition = useAddition();
  const defaultRowKey = () => uid().toString();

  return (
    <ArrayTablePagination {...pagination} dataSource={dataSource}>
      {(innerDataSource, pager, { startIndex }) => (
        <div ref={ref} className={prefixCls}>
          <ArrayBase {...props?.arrayBaseProps}>
            <ArrayTableComponentsContext.Provider value={{ ref, field }}>
              <Table
                size="small"
                bordered
                rowKey={defaultRowKey}
                {...props}
                onChange={() => {}}
                pagination={false}
                columns={columns}
                dataSource={innerDataSource}
                components={getArrayTableComponents(dataSource, startIndex)}
                onRow={(record) => ({
                  index: dataSource.indexOf(record),
                })}
              />
            </ArrayTableComponentsContext.Provider>
            <div style={{ marginTop: 5, marginBottom: 5 }}>{pager}</div>
            {sources.map((column, key) => {
              // 承接对Column的状态管理
              if (!isColumnComponent(column.schema)) return;
              return React.createElement(RecursionField, {
                name: column.name,
                schema: column.schema,
                onlyRenderSelf: true,
                key,
              });
            })}
            {addition}
          </ArrayBase>
        </div>
      )}
    </ArrayTablePagination>
  );
});

ArrayTable.displayName = "ArrayTable";

ArrayTable.Column = () => {
  return <Fragment />;
};

ArrayBase.mixin(ArrayTable);

const Addition: ArrayBaseMixins["Addition"] = (props) => {
  const array = ArrayBase.useArray();
  const {
    totalPage = 0,
    pageSize = 10,
    changePage,
    showPagination,
  } = usePagination();
  return (
    <ArrayBase.Addition
      {...props}
      onClick={(e) => {
        // 如果添加数据后将超过当前页，则自动切换到下一页
        const total = array?.field?.value.length || 0;
        if (
          showPagination &&
          total === totalPage * pageSize + 1 &&
          isFn(changePage)
        ) {
          changePage(totalPage + 1);
        }
        props.onClick?.(e);
      }}
    />
  );
};
ArrayTable.Addition = Addition;

export default ArrayTable;
