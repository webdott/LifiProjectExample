/* eslint-disable react-hooks/rules-of-hooks */
import { BiTennisBall } from 'react-icons/bi';
import { GiBoxingGlove } from 'react-icons/gi';
import { IoMdAmericanFootball } from 'react-icons/io';
import { FaHockeyPuck } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

import { LeftSideIcons } from './../constants/icons';
import Dota2 from './../assets/images/dota2Icon.png';
import CSGO from './../assets/images/csgoIcon.png';
import LOL from './../assets/images/LOL.png';

export interface LeftSidebarTypes {
  sport?: string;
  sportsGames?: number;
  leagues?: LeaguesTypes[];
  sportTypeId?: number;
  disableIcon: string | IconType;
  activeIcon: string | IconType;
}

export interface LeaguesTypes {
  leagueName: string;
  leagueFlag: string;
  leagueNumber?: number;
}

export interface NavDataProps {
  name: string;
  sportTypeId?: number;
}
export const navData: NavDataProps[] = [
  {
    name: 'Home',
    sportTypeId: 33,
  },
  {
    name: 'Live',
    sportTypeId: 31,
  },
];
