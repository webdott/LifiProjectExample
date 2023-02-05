import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import "./odds.scss";

const items: MenuProps["items"] = [
  {
    label: (
      <div className="oddsItems">
        UK Odds <div className="triangle"></div>
      </div>
    ),
    key: "0",
  },
  {
    label: <div className="oddsItems">US Odds</div>,
    key: "1",
  },
  {
    label: <div className="oddsItems">EU Odds</div>,
    key: "2",
  },
];

const Odds: React.FC = () => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a className="oddsButton" onClick={(e) => e.preventDefault()}>
      <div className="hoverEffect"></div>
    </a>
  </Dropdown>
);

export default Odds;
