import { Fragment } from "react";

import Header from "./../header";
import Button from "../../shared/button";
import { ButtonType } from "../../shared/button/type";
import SearchBar from "../../shared/searchBar";
import BetInfo from "../../shared/betInfo";
import { navData } from "../../../constants/leftSidebar";
import styles from "./wallet.module.scss";
import { useNavigate } from "react-router";
import Cards from "../../shared/cards";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export default function Layout() {
  const navigate = useNavigate();

  const { data } = useTypedSelector((state) => state.games);

  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToLive = () => {
    navigate("/live");
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.leftSidebar}>
          <div className={styles.container}>
            <SearchBar />
            <div className={styles.nav}>
              <Button
                btnType={ButtonType.medium}
                text={navData[0].name}
                onClick={navigateToHome}
              />
              <Button
                btnType={ButtonType.medium}
                text={navData[1].name}
                onClick={navigateToLive}
              />
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          <Cards games={data} />
        </div>
        <BetInfo />
      </div>
    </Fragment>
  );
}
