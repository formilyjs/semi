import { connect, mapProps } from '@formily/react';
import { Radio as SemiRadio } from '@douyinfe/semi-ui';
import { RadioProps } from "@douyinfe/semi-ui/lib/es/radio";
import { RadioGroupProps } from "@douyinfe/semi-ui/lib/es/radio";
import RadioGroup from '../radio-group';

type ComposedRadio = React.FC<RadioProps> & {
  Group: React.FC<RadioGroupProps>;
};

export const Radio: ComposedRadio = (connect(
  SemiRadio,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
) as unknown) as ComposedRadio;

Radio.Group = RadioGroup;

export default Radio;
