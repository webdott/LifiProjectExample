import { Fragment, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import UserInfo from '../../components/shared/userInfo';
import OverviewTab from '../../components/shared/overviewTab';
import Layout from '../../layout/HomePage';
import MyBetsPage from '../../components/shared/myBetsPage';

import styles from './account.module.scss';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
const UserAccount = () => {
  let query = useQuery();

  return (
    <Fragment>
      <Layout>
        <div className={styles.userAccount}>
          <UserInfo />
          <OverviewTab />
          {query.get('name') === 'my_bets' || query.get('name') === null ? <MyBetsPage /> : ''}
        </div>
      </Layout>
    </Fragment>
  );
};

export default UserAccount;
