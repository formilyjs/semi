import { connect, mapProps } from '@formily/react';
import { Checkbox as SemiCheckbox } from '@douyinfe/semi-ui';
import { CheckboxProps } from '@douyinfe/semi-ui/checkbox';
import { CheckboxGroupProps } from '@douyinfe/semi-ui/checkbox/checkboxGroup';
import CheckboxGroup from '../checkbox-group';

type ComposedCheckbox = React.FC<CheckboxProps> & {
  Group: React.FC<CheckboxGroupProps>;
};

export const Checkbox: ComposedCheckbox = (connect(
  SemiCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
) as unknown) as ComposedCheckbox;

Checkbox.Group = CheckboxGroup;

export default Checkbox;
