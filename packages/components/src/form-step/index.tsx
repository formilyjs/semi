import React, { Fragment } from "react";
import { action, model, markRaw } from "@formily/reactive";
import { Steps } from "@douyinfe/semi-ui";
import cls from "classnames";
import { BasicStepsProps } from "@douyinfe/semi-ui/steps";
import { StepProps } from "@douyinfe/semi-ui/steps/step";
import { Form, VoidField } from "@formily/core";
import {
  connect,
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from "@formily/react";
import { Schema, SchemaKey } from "@formily/json-schema";
import { usePrefixCls } from "../__builtins__";

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField) => void;
  current: number;
  allowNext: boolean;
  allowBack: boolean;
  steps: any[];
  submit: Form["submit"];
  setCurrent(key: number): void;
  next(): void;
  back(): void;
}

export interface IFormStepProps extends BasicStepsProps {
  formStep?: IFormStep;
}

type ComposedFormTab = React.FC<IFormStepProps> & {
  StepPane?: React.FC<StepProps>;
  createFormStep?: (defaultCurrent?: number) => IFormStep;
};

type SchemaStep = {
  name: SchemaKey;
  props: any;
  schema: Schema;
};

type FormStepEnv = {
  form: Form | null;
  field: VoidField | null;
  steps: SchemaStep[];
};

const parseSteps = (schema: Schema) => {
  const steps: SchemaStep[] = [];
  schema.mapProperties((propertySchema, name) => {
    if (propertySchema["x-component"]?.indexOf("StepPane") > -1) {
      steps.push({
        name,
        props: propertySchema["x-component-props"],
        schema: propertySchema,
      });
    }
  });
  return steps;
};

const createFormStep = (defaultCurrent = 0): IFormStep => {
  const env: FormStepEnv = {
    form: null,
    field: null,
    steps: [],
  };

  const setDisplay = action.bound?.((target: number) => {
    const currentStep = env.steps[target];
    env.steps.forEach(({ name }) => {
      env.form?.query(`${env.field?.address}.${name}`).take((field) => {
        if (name === currentStep.name) {
          field.setDisplay("visible");
        } else {
          field.setDisplay("hidden");
        }
      });
    });
  });

  const next = action.bound?.(() => {
    if (formStep.allowNext) {
      setDisplay?.(formStep.current + 1);
      formStep.setCurrent(formStep.current + 1);
    }
  });

  const back = action.bound?.(() => {
    if (formStep.allowBack) {
      setDisplay?.(formStep.current - 1);
      formStep.setCurrent(formStep.current - 1);
    }
  });

  const formStep: IFormStep | any = model({
    connect(steps, field) {
      env.steps = steps;
      env.form = field?.form;
      env.field = field;
    },
    current: defaultCurrent,
    setCurrent(key: number) {
      formStep.current = key;
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1;
    },
    get allowBack() {
      return formStep.current > 0;
    },
    get steps() {
      return env.steps;
    },
    async next() {
      try {
        await env.form?.validate();
        next?.();
      } catch {}
    },
    async back() {
      back?.();
    },
    async submit(onSubmit) {
      return env.form?.submit?.(onSubmit);
    },
  });
  return markRaw(formStep);
};

export const FormStep: ComposedFormTab = connect(
  observer(({ formStep, className, ...props }: IFormStepProps) => {
    const field = useField<VoidField>();
    const prefixCls = usePrefixCls("formily-step", props);
    const schema = useFieldSchema();
    const steps = parseSteps(schema);
    const current = props.current || formStep?.current || 0;
    formStep?.connect?.(steps, field);
    return (
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
          return <RecursionField key={key} name={name} schema={stepSchema} />;
        })}
      </div>
    );
  })
);

const StepPane: React.FC<StepProps> = ({ children }) => (
  <Fragment>{children}</Fragment>
);

FormStep.StepPane = StepPane;
FormStep.createFormStep = createFormStep;

export default FormStep;
