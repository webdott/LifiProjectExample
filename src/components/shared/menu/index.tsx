import { MenuItemType } from '../../../constants/overwiewTab';
import { MenuType } from './types';

import styles from './menu.module.scss';

export default function Menu({ menu, changeVisible }: MenuType): JSX.Element {
  return (
    <>
      {!changeVisible && (
        <div className={styles.dropdown}>
          {menu.map((item: MenuItemType, index: number) => (
            <div className={styles.dropdownItem} key={index}>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
