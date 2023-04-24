import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import arrowDown from '../../../assets/images/arrowDown.png';

import './sortbutton.scss';

const items: MenuProps['items'] = [
  {
    label: (
      <div>
        Event time<div className='sortTriangle'></div>
      </div>
    ),
    key: '0',
  },
  {
    label: <div>Bet time</div>,
    key: '1',
  },
];

const SortButton: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <span className='sortButton' onClick={(e) => e.preventDefault()}>
      Event Time <img src={arrowDown} />
    </span>
  </Dropdown>
);

export default SortButton;
