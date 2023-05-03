import { useCallback } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

import './odds.scss';
import { OddsFormat } from '../../../redux/reducers/app';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { updateOddsFormat } from '../../../redux/action-creators';
import { RiSettings5Fill } from 'react-icons/ri';

export const items: MenuProps['items'] = [
  {
    label: (
      <div className='oddsItems'>
        UK Odds (1/2)<div className='triangle'></div>
      </div>
    ),
    key: OddsFormat.uk,
  },
  {
    label: <div className='oddsItems'>EU Odds (1.5)</div>,
    key: OddsFormat.eu,
  },
  {
    label: <div className='oddsItems'>US Odds (-200)</div>,
    key: OddsFormat.us,
  },
];
interface Props {
  showSettingsIcon?: boolean;
}

const Odds = ({ showSettingsIcon = false }: Props) => {
  const oddsFormat = useTypedSelector((state) => state.app.oddsFormat);
  const dispatch = useDispatch();
  const handleChange = useCallback(
    ({ key }: { key: string }) => {
      updateOddsFormat(key as OddsFormat)(dispatch);
    },
    [dispatch]
  );

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [oddsFormat],
        onClick: handleChange,
      }}
      trigger={['click']}
      placement='bottom'
    >
      {showSettingsIcon ? (
        <button>
          <RiSettings5Fill size={24} />
        </button>
      ) : (
        <a className='oddsButton' onClick={(e) => e.preventDefault()}>
          <div className='hoverEffect'></div>
        </a>
      )}
    </Dropdown>
  );
};

export default Odds;
