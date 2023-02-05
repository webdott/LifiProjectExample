import { Fragment } from "react";
import Header from "../components/featured/header";
import Footer from "../components/featured/footer";
import SearchBar from "../components/shared/searchBar";
import BetInfo from "../components/shared/betInfo";
import { LayoutProps } from "../constants/layout";
import { useNavigate } from "react-router";
import FAQS from "../components/featured/FQA";
import EsportSideBar from "./EsportsSideBar";

import styles from "./homelayout.module.scss";

export default function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.leftSidebar}>
          <div className={styles.container}>
            <SearchBar />
            <div className={styles.leagues}>
              <EsportSideBar />
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {children}
          <div></div>
          <Footer />
        </div>
        <BetInfo />
      </div>
    </Fragment>
  );
}
