import { Fragment, useMemo } from "react";
import UserInfo from "../../components/shared/userInfo";
import OverviewTab from "../../components/shared/overviewTab";
import Layout from "../../layout/HomePage";

import styles from "./account.module.scss";
import { useLocation } from "react-router-dom";
import MyBetsPage from "../../components/shared/myBetsPage";

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
          {query.get("name") === "my_bets" ? <MyBetsPage /> : ""}
        </div>
      </Layout>
    </Fragment>
  );
};

export default UserAccount;
