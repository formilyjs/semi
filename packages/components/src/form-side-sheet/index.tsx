import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { createForm, Form as FormType, IFormProps } from "@formily/core";
import { FormProvider } from "@formily/react";
import { isNum, isStr, isBool, isFn } from "@formily/shared";
import { SideSheet } from "@douyinfe/semi-ui";
import { usePrefixCls } from "../__builtins__";
import { SideSheetReactProps as SideSheetProps } from "@douyinfe/semi-ui/lib/es/sideSheet";

type FormSideSheetContent =
  | React.ReactElement
  | ((resolve: () => any, reject: () => any) => React.ReactElement);

type SideSheetTitle = string | number | React.ReactElement;

const isSideSheetTitle = (props: any): props is SideSheetTitle =>
  isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props);

const getSideSheetProps = (props: any): SideSheetProps => {
  if (isSideSheetTitle(props)) {
    return {
      title: props,
    };
  } else {
    return props;
  }
};

export interface IFormSideSheet {
  open(props?: IFormProps): Promise<any>;
  close(): void;
}

export interface IFormSideSheetComponentProps {
  content: FormSideSheetContent;
  resolve: () => any;
  reject: () => any;
}

export function FormSideSheet(
  title: SideSheetProps,
  content: FormSideSheetContent
): IFormSideSheet;
export function FormSideSheet(
  title: SideSheetTitle,
  content: FormSideSheetContent
): IFormSideSheet;
export function FormSideSheet(title: any, content: any): IFormSideSheet {
  const env: {
    root: HTMLDivElement;
    form?: FormType;
    promise?: Promise<any>;
  } = {
    root: document.createElement("div"),
  };
  const props = getSideSheetProps(title);
  const sideSheet = {
    width: "40%",
    ...props,
    onCancel: (e: any) => {
      props?.onCancel?.(e);
      formSideSheet.close();
    },
    afterVisibleChange: (visible: boolean) => {
      props?.afterVisibleChange?.(visible);
      if (visible) {
        return;
      }
      ReactDOM.unmountComponentAtNode(env.root);
      env.root?.parentNode?.removeChild(env.root);
      env.root = undefined as unknown as HTMLDivElement;
    },
  };
  const component = (props: IFormSideSheetComponentProps) => (
    <Fragment>
      {isFn(props.content)
        ? props.content(props.resolve, props.reject)
        : props.content}
    </Fragment>
  );
  const render = (visible = true, resolve?: () => any, reject?: () => any) => {
    ReactDOM.render(
      <SideSheet {...sideSheet} visible={visible}>
        <FormProvider form={env.form as FormType}>
          {React.createElement(component, {
            content,
            resolve: resolve ? resolve : () => undefined,
            reject: reject ? reject : () => undefined,
          })}
        </FormProvider>
      </SideSheet>,
      env.root
    );
  };
  document.body.appendChild(env.root);
  const formSideSheet = {
    open: (props: IFormProps) => {
      if (env.promise) {
        return env.promise;
      }
      env.form = env.form || createForm(props);
      env.promise = new Promise((resolve) => {
        render(
          false,
          () => {
            env?.form?.submit((values: any) => {
              resolve(values);
              formSideSheet.close();
            });
          },
          () => {
            formSideSheet.close();
          }
        );
        setTimeout(() => {
          render(
            true,
            () => {
              env?.form?.submit((values: any) => {
                resolve(values);
                formSideSheet.close();
              });
            },
            () => {
              formSideSheet.close();
            }
          );
        });
      });
      return env.promise;
    },
    close: () => {
      if (!env.root) {
        return;
      }
      render(false);
    },
  };
  return formSideSheet;
}

const SidSheetFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>();
  const [footer, setFooter] = useState<HTMLDivElement>();
  const footerRef = useRef<HTMLDivElement>();
  const prefixCls = usePrefixCls("drawer");
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}-wrapper-body`);
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(
          `.${prefixCls}-footer`
        ) as HTMLDivElement;
        if (!footerRef.current) {
          footerRef.current = document.createElement("div");
          footerRef.current.classList.add(`${prefixCls}-footer`);
          content.appendChild(footerRef.current);
        }
      }
      setFooter(footerRef.current);
    }
  });

  footerRef.current = footer;

  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      style={{ display: "none" }}
    >
      {footer && createPortal(props.children, footer)}
    </div>
  );
};

FormSideSheet.Footer = SidSheetFooter;

export default FormSideSheet;
