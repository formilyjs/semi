import { connect, mapProps } from '@formily/react';
import { Upload as SemiUpload } from '@douyinfe/semi-ui';

export const Upload = connect(
  SemiUpload,
  mapProps(
    {
      value: 'fileList',
    },
    props => {
      const { onChange } = props;
      return {
        ...props,
        onChange: prop => {
          if (onChange) {
            onChange(prop.fileList as any);
          }
        },
      };
    }
  )
);

export default Upload;
