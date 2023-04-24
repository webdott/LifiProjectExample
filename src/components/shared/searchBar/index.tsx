import searchIcon from '../../../assets/images/searchIcon.png';

import styles from './search.module.scss';

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <img src={searchIcon} />
      <input type='search' placeholder='Search' />
    </div>
  );
}
