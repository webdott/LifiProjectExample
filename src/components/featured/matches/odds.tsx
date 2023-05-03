import { useCallback } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

import './odds.scss';
import { OddsFormat } from '../../../redux/reducers/app';

export const items: MenuProps['items'] = [
  {
    label: (
      <div className='oddsItems' onClick={() => console.log('11111111')}>
        UK Odds <div className='triangle'></div>
      </div>
    ),
    key: OddsFormat.uk,
  },
  {
    label: <div className='oddsItems'>US Odds</div>,
    key: OddsFormat.us,
  },
  {
    label: <div className='oddsItems'>EU Odds</div>,
    key: OddsFormat.eu,
  },
];

interface Props {
  value: OddsFormat;
  onChange: (value: OddsFormat) => void;
}

const Odds = ({ value, onChange }: Props) => {
  const handleChange = useCallback(({ key }: { key: string }) => {
    onChange(key as OddsFormat);
  }, []);

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [value],
        onClick: handleChange,
      }}
      trigger={['click']}
      placement='bottom'
    >
      <a className='oddsButton' onClick={(e) => e.preventDefault()}>
        <div className='hoverEffect'></div>
      </a>
    </Dropdown>
  );
};

export default Odds;
