import Loader from "./../../../assets/images/Skateboarding.gif";
import styles from "./loader.module.scss";

function Loading(): JSX.Element {
  return <img className={styles.loader} src={Loader} alt='loader' />;
}

export default Loading;
