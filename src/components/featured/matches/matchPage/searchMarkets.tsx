import React, { Dispatch, FC, SetStateAction } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import styles from './matchpage.module.scss';

interface SearchMarketsProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchMarkets: FC<SearchMarketsProps> = ({ searchValue, setSearchValue, setShowSearch }) => {
  return (
    <form className={styles.searchMarkets}>
      <div className={styles.searchIcon}>
        <FiSearch size={20} />
      </div>
      <input
        value={searchValue}
        type='text'
        placeholder='Search by market name'
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <div className={styles.actionButtons}>
        <button disabled={searchValue === ''} type='submit'>
          Search
        </button>
        <button
          className={styles.closeButton}
          type='button'
          onClick={() => {
            setSearchValue('');
            setShowSearch(false);
          }}
        >
          <IoMdClose size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchMarkets;
