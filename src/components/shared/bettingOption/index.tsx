import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import plusIcon from "../../../assets/images/plusIcon.png";

import "./bettingoption.scss";

const items: MenuProps["items"] = [
  {
    label: (
      <div className="oddsItems">
        Full Time Result <div className="optionsTriangle triangle"></div>
      </div>
    ),
    key: "0",
  },
  {
    label: <div className="oddsItems">Double Chance</div>,
    key: "1",
  },
  {
    label: <div className="oddsItems">Both Teams To Score</div>,
    key: "2",
  },
  {
    label: <div className="oddsItems">Handicap</div>,
    key: "3",
  },
  {
    label: <div className="oddsItems">Total Goals</div>,
    key: "4",
  },
  {
    label: <div className="oddsItems">Team 1 Total Goals</div>,
    key: "5",
  },
  {
    label: <div className="oddsItems">Team 2 Total Goals</div>,
    key: "6",
  },
];

const BettingOption: React.FC = () => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a className="optionBtn" onClick={(e) => e.preventDefault()}>
      <img width={25} height={25} className="optionIcon" src={plusIcon} />
    </a>
  </Dropdown>
);

export default BettingOption;
