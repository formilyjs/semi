import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  createForm,
  IFormProps,
  Form,
  onFormSubmitSuccess,
} from "@formily/core";
import { toJS } from "@formily/reactive";
import { FormProvider, observer } from "@formily/react";
import {
  isNum,
  isStr,
  isBool,
  isFn,
  IMiddleware,
  applyMiddleware,
} from "@formily/shared";
import { SideSheet } from "@douyinfe/semi-ui";
import { SideSheetReactProps } from "@douyinfe/semi-ui/lib/es/sideSheet";
import {
  usePrefixCls,
  createPortalProvider,
  createPortalRoot,
  loading,
} from "../__builtins__";

type FormSideSheetRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement);

type SideSheetTitle = string | number | React.ReactElement;

const isSideSheetTitle = (props: any): props is SideSheetTitle =>
  isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props);

const getSideSheetProps = (props: any): ISideSheetProps => {
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
  forOpen(middleware: IMiddleware<IFormProps>): IFormSideSheet;
  close(): void;
}
export interface ISideSheetProps extends Omit<SideSheetReactProps, "onCancel"> {
  loadingText?: React.ReactNode;
  onCancel?: (e: any) => void | Promise<any> | boolean;
}
export function FormSideSheet(
  title: ISideSheetProps,
  id: string,
  renderer: FormSideSheetRenderer
): IFormSideSheet;
export function FormSideSheet(
  title: ISideSheetProps,
  id: FormSideSheetRenderer
): IFormSideSheet;
export function FormSideSheet(
  title: SideSheetTitle,
  id: string,
  renderer: FormSideSheetRenderer
): IFormSideSheet;
export function FormSideSheet(
  title: SideSheetTitle,
  id: FormSideSheetRenderer
): IFormSideSheet;
export function FormSideSheet(
  title: any,
  id: any,
  renderer?: any
): IFormSideSheet {
  if (isFn(id) || React.isValidElement(id)) {
    renderer = id;
    id = "form-side-sheet";
  }
  const env: {
    host: HTMLElement;
    form: Form | null;
    promise: Promise<any> | null;
    openMiddlewares: IMiddleware<IFormProps>[];
  } = {
    host: document.createElement("div"),
    form: null,
    promise: null,
    openMiddlewares: [],
  };
  const root = createPortalRoot(env.host, id);
  const props = getSideSheetProps(title);
  const sideSheet = {
    width: "40%",
    ...props,
    onCancel: (e: any) => {
      if (props?.onCancel?.(e) !== false) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        formSideSheet.close();
      }
    },
    afterVisibleChange: (visible: boolean) => {
      props?.afterVisibleChange?.(visible);
      if (visible) {
        return;
      }
      root.unmount();
    },
  };

  const SideSheetContent = observer(() => (
    <Fragment>{isFn(renderer) ? renderer(env.form) : renderer}</Fragment>
  ));

  const renderSideSheet = (visible = true) => (
    <SideSheet {...sideSheet} visible={visible}>
      {env.form ? (
        <FormProvider form={env.form}>
          <SideSheetContent />
        </FormProvider>
      ) : null}
    </SideSheet>
  );

  document.body.appendChild(env.host);
  const formSideSheet = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware);
      }
      return formSideSheet;
    },
    open: async (sideSheetProps: IFormProps) => {
      if (env.promise) {
        return env.promise;
      }
      env.promise = new Promise(async (resolve, reject) => {
        try {
          sideSheetProps = await loading(sideSheet.loadingText, () =>
            applyMiddleware(sideSheetProps, env.openMiddlewares)
          );
          env.form =
            env.form ||
            createForm({
              ...sideSheetProps,
              effects(form) {
                onFormSubmitSuccess(() => {
                  resolve(toJS(form.values));
                  formSideSheet.close();
                });
                sideSheetProps?.effects?.(form);
              },
            });
        } catch (e) {
          reject(e);
        }
        root.render(() => renderSideSheet(false));
        setTimeout(() => {
          root.render(() => renderSideSheet(true));
        }, 16);
      });
      return env.promise;
    },
    close: () => {
      if (!env.host) {
        return;
      }
      root.render(() => renderSideSheet(false));
    },
  };
  return formSideSheet;
}

const SidSheetFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [footer, setFooter] = useState<HTMLDivElement>();
  const footerRef = useRef<HTMLDivElement>();
  const prefixCls = usePrefixCls("", {
    prefixCls: "semi-sidesheet",
  });
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}-content`);
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
    <div ref={ref} style={{ display: "none" }}>
      {footer && createPortal(props.children, footer)}
    </div>
  );
};

FormSideSheet.Footer = SidSheetFooter;

FormSideSheet.Portal = createPortalProvider("form-side-sheet");

export default FormSideSheet;
