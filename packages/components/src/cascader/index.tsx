import { connect, mapProps } from '@formily/react';
import { Cascader as SemiCascader } from '@douyinfe/semi-ui';

export const Cascader = connect(SemiCascader, mapProps({ dataSource: 'treeData' }));

export default Cascader;
