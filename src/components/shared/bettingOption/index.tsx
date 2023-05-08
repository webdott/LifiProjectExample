import React, { useCallback } from 'react';
import { Dropdown } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

import './bettingoption.scss';

interface Props {
  options: { key: string; label: string }[];
  selected: string | null;
  onChange: (key: string) => void;
}
const BettingOption = ({ options, selected, onChange }: Props) => {
  const handleChange = useCallback(
    ({ key }: { key: string }) => {
      onChange(key);
    },
    [onChange]
  );

  return (
    <Dropdown
      menu={{
        items: options,
        selectable: true,
        ...(selected && { defaultSelectedKeys: [selected] }),
        onClick: handleChange,
      }}
      // trigger={['click']}
      placement='bottomRight'
      arrow={{ pointAtCenter: true }}
    >
      <a className='optionBtn' onClick={(e) => e.preventDefault()}>
        <AiOutlinePlus size={20} />
        <div className='hoverEffect'></div>
      </a>
    </Dropdown>
  );
};

export default BettingOption;
