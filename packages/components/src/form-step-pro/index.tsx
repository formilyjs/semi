import React, { Fragment, createContext, useContext, useMemo } from "react";
import {
  connect,
  useField,
  observer,
  useFieldSchema,
  RecursionField,
  useForm,
} from "@formily/react";
import { VoidField } from "@formily/core";
import { Steps, Button, Space } from "@douyinfe/semi-ui";
import { Schema, SchemaKey } from "@formily/json-schema";
import { FormPath } from "@formily/shared";
import type { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import type { StepsProps } from "@douyinfe/semi-ui/lib/es/steps";
import type { StepProps } from "@douyinfe/semi-ui/lib/es/steps";
import cls from "classnames";
import { usePrefixCls } from "../__builtins__";
import { FormStep, IFormStep } from "../form-step";

interface IStepProProps {
  formStep?: IFormStep;
  onSubmit?: (value?: any) => void;
}

export type IFormStepProProps = IStepProProps & StepsProps;

export interface IFormStepProContext {
  props: Pick<IFormStepProProps, "formStep" | "onSubmit">;
  field: VoidField;
  schema: Schema;
}

type ComposedFormStepPro = React.FC<IFormStepProProps> & {
  StepPane?: React.FC<StepProps>;
  Next?: React.FC<ButtonProps & { text?: string }>;
  NextWithSubmit?: React.FC<ButtonProps & { text?: string }>;
  Previous?: React.FC<ButtonProps & { text?: string }>;
  Submit?: React.FC<ButtonProps & { text?: string }>;
};

type SchemaStepProperty = {
  name: SchemaKey;
  props: any;
  schema: Schema;
};

const FormStepProContext = createContext<IFormStepProContext | null>(null);

const useFormStepPro = () => useContext(FormStepProContext);

const parseSchema = (schema: Schema) => {
  const schemaStep: {
    steps: SchemaStepProperty[];
    previous?: SchemaStepProperty;
    next?: SchemaStepProperty;
    nextWithSubmit?: SchemaStepProperty;
    submit?: SchemaStepProperty;
  } = { steps: [] };

  schema.mapProperties((propertySchema, name) => {
    if (propertySchema["x-component"]?.indexOf("StepPane") > -1) {
      schemaStep.steps.push({
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      });
    }

    if (propertySchema["x-component"]?.indexOf("Previous") > -1) {
      schemaStep.previous = {
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      };
    }

    if (/NextWithSubmit$/.test(propertySchema["x-component"])) {
      schemaStep.nextWithSubmit = {
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      };
    }

    if (/Next$/.test(propertySchema["x-component"])) {
      schemaStep.next = {
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      };
    }

    if (/\.Submit$/.test(propertySchema["x-component"])) {
      schemaStep.submit = {
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      };
    }
  });

  return schemaStep;
};

const Previous: React.FC<ButtonProps & { text?: string }> = (props) => {
  const { text, ...restProps } = props;

  const formStepCtx = useFormStepPro();

  return (
    <Button
      {...restProps}
      disabled={
        formStepCtx?.field.disabled || !formStepCtx?.props.formStep?.allowBack
      }
      onClick={() => {
        formStepCtx?.props.formStep?.back();
      }}
    >
      {text}
    </Button>
  );
};

const Next: React.FC<ButtonProps & { text?: string }> = (props) => {
  const { text, ...restProps } = props;

  const formStepCtx = useFormStepPro();

  return (
    <Button
      {...restProps}
      disabled={
        formStepCtx?.field.disabled || !formStepCtx?.props.formStep?.allowNext
      }
      onClick={() => {
        formStepCtx?.props.formStep?.next();
      }}
    >
      {text}
    </Button>
  );
};

const NextWithSubmit: React.FC<
  ButtonProps & { text?: string; onSubmit?(...params: any): any }
> = (props) => {
  const { text, onSubmit, ...restProps } = props;
  const formStepCtx = useFormStepPro();
  const { current = 0 } = formStepCtx?.props?.formStep ?? {};
  const form = useForm();
  const picks = Object.entries(form.getFormGraph())
    .filter(([, value]: any) => {
      return value.display === "visible" && value.displayName === "Field";
    })
    .map(([, value]: any) => {
      return value.path;
    });
  return (
    <Button
      {...restProps}
      onClick={() => {
        formStepCtx?.props.formStep?.submit((values) => {
          const target = {};
          picks.forEach((pickPath) => {
            const parser = FormPath.parse(pickPath);
            parser.setIn(target, parser.getIn(values));
          });
          if (onSubmit) {
            onSubmit?.(target, current);
          } else {
            formStepCtx?.props?.onSubmit?.(target);
          }
        });
        formStepCtx?.props.formStep?.next();
      }}
    >
      {text}
    </Button>
  );
};

const Submit: React.FC<ButtonProps & { text?: string }> = (props) => {
  const { text, ...restProps } = props;

  const formStepCtx = useFormStepPro();

  return (
    <Button
      {...restProps}
      disabled={
        formStepCtx?.field.disabled || formStepCtx?.props.formStep?.allowNext
      }
      onClick={() => {
        formStepCtx?.props.formStep?.submit(formStepCtx?.props?.onSubmit);
      }}
    >
      {text}
    </Button>
  );
};

export const FormStepPro: ComposedFormStepPro = connect(
  observer(
    ({
      formStep: propsFormStep,
      className,
      onSubmit,
      ...props
    }: IFormStepProProps) => {
      const field = useField<VoidField>();
      const formStep = useMemo(
        () => propsFormStep || FormStep.createFormStep?.(),
        [propsFormStep]
      );
      const prefixCls = usePrefixCls("formily-step-pro", props);
      const schema = useFieldSchema();
      const { steps, previous, next, nextWithSubmit, submit } =
        parseSchema(schema);
      const current = props.current || formStep?.current || 0;

      formStep?.connect?.(steps, field);

      return (
        <FormStepProContext.Provider
          value={{ props: { formStep, onSubmit }, field, schema }}
        >
          <div className={cls(prefixCls, className)}>
            <Steps
              {...props}
              style={{ marginBottom: 10, ...props.style }}
              current={current}
            >
              {steps.map(({ props: stepProps }, key) => (
                <Steps.Step {...stepProps} key={key} />
              ))}
            </Steps>
            {steps.map(({ name, schema: stepSchema }, key) => {
              if (key !== current) {
                return;
              }

              return (
                <RecursionField key={key} name={name} schema={stepSchema} />
              );
            })}
            <Space>
              {previous ? (
                <RecursionField
                  schema={previous.schema}
                  name={previous.name}
                  key={previous.name}
                />
              ) : null}
              {next ? (
                <RecursionField
                  schema={next.schema}
                  name={next.name}
                  key={next.name}
                />
              ) : null}
              {nextWithSubmit ? (
                <RecursionField
                  schema={nextWithSubmit.schema}
                  name={nextWithSubmit.name}
                  key={nextWithSubmit.name}
                />
              ) : null}
              {submit ? (
                <RecursionField
                  schema={submit.schema}
                  name={submit.name}
                  key={submit.name}
                />
              ) : null}
            </Space>
          </div>
        </FormStepProContext.Provider>
      );
    }
  )
);

const StepPane: React.FC<StepProps> = ({ children }) => (
  <Fragment>{children}</Fragment>
);

FormStepPro.StepPane = StepPane;
FormStepPro.Previous = Previous;
FormStepPro.Next = Next;
FormStepPro.NextWithSubmit = NextWithSubmit;
FormStepPro.Submit = Submit;

export default FormStepPro;
