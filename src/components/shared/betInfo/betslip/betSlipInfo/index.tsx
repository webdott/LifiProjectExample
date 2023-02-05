import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import React from "react";
import infoIcon from "../../../../../public/images/infoIcon.png";

import styles from "./betslipinfo.module.scss";

const items: MenuProps["items"] = [
  {
    label: (
      <div className={styles.infoText}>
        Winners receive a part of total pool volume that is proportional to
        their wager
      </div>
    ),
    key: "0",
  },
];

const BetSlipInfo: React.FC = () => (
  <Dropdown menu={{ items }}>
    <div className={styles.infoIcon}>
      <img src={infoIcon} />
    </div>
  </Dropdown>
);

export default BetSlipInfo;
