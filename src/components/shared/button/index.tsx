import ButtonProps, { ButtonType } from "./type";

import styles from "./button.module.scss";

export default function Button({ btnType, text, icon, onClick }: ButtonProps) {
  const getStyles = (buttonType?: ButtonType) => {
    switch (buttonType) {
      case ButtonType.xsmall:
        return styles.xsmallButton;
      case ButtonType.small:
        return styles.smallButton;
      case ButtonType.medium:
        return styles.mediumButton;
      case ButtonType.sidebarButton:
        return styles.sidebarButton;
      case ButtonType.claim:
        return styles.clainGXPButton;
      case ButtonType.mediumActive:
        return styles.mediumButtonActive;
      case ButtonType.betInfoButton:
        return styles.betInfoBtn;
      case ButtonType.betInfoButtonActive:
        return styles.betInfoBtnActive;
      case ButtonType.betInfoLargeButton:
        return styles.betInfoLargeBtn;
      case ButtonType.walletButton:
        return styles.walletBtn;
    }
  };

  return (
    <div className={`${styles.btn} ${getStyles(btnType)}`} onClick={onClick}>
      <img className={styles.btnIcon} src={icon} alt={icon} />
      <span className={styles.btnTextLabel}>{text}</span>
      <div className={styles.hoverEffect}></div>
    </div>
  );
}
