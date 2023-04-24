/* eslint-disable react-hooks/rules-of-hooks */
import { BiTennisBall } from 'react-icons/bi';
import { GiBoxingGlove } from 'react-icons/gi';
import { IoMdAmericanFootball } from 'react-icons/io';
import { FaHockeyPuck } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

import { LeftSideIcons } from './../constants/icons';
import spainFlag from '../public/images/leaguesFlags/spain.png';
import franceFlag from '../public/images/leaguesFlags/france.png';
import englandFlag from '../public/images/leaguesFlags/england.webp';
import italyFlag from '../public/images/leaguesFlags/italy.jpg';
import germanyFlag from '../public/images/leaguesFlags/germany.webp';
import Dota2 from './../assets/images/dota2Icon.png';
import CSGO from './../assets/images/csgoIcon.png';
import LOL from './../assets/images/LOL.png';

export const leaguesFlags = {
  LaLiga: spainFlag,
  PremierLeague: englandFlag,
  Ligue1: franceFlag,
  SerieA: italyFlag,
  Bundesliga: germanyFlag,
};

export interface LeftSidebarTypes {
  sport?: string;
  sportsGames?: number;
  leagues?: LeaguesTypes[];
  icon: string | IconType;
  sportTypeId?: number;
  disableIcon?: string;
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

export const leaguesData: LeftSidebarTypes[] = [
  {
    sport: 'Football',
    icon: LeftSideIcons.disableFootbal,
    disableIcon: LeftSideIcons.disableFootbal,
    activeIcon: LeftSideIcons.activeFootball,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'Basketball',
    icon: LeftSideIcons.disableBasketball,
    disableIcon: LeftSideIcons.disableBasketball,
    activeIcon: LeftSideIcons.activeBasketball,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'MMA',
    icon: LeftSideIcons.disableMMA,
    disableIcon: LeftSideIcons.disableMMA,
    activeIcon: LeftSideIcons.activeMma,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'Boxing',
    icon: GiBoxingGlove,
    activeIcon: GiBoxingGlove,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'Tennis',
    icon: BiTennisBall,
    activeIcon: BiTennisBall,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'Icehockey',
    icon: FaHockeyPuck,
    activeIcon: FaHockeyPuck,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
  {
    sport: 'American Football',
    icon: IoMdAmericanFootball,
    activeIcon: IoMdAmericanFootball,
    sportsGames: 10,
    leagues: [
      { leagueName: 'La Liga', leagueFlag: spainFlag, leagueNumber: 10 },
      {
        leagueName: 'Premier League',
        leagueFlag: englandFlag,
        leagueNumber: 10,
      },
      { leagueName: 'Ligue 1', leagueFlag: franceFlag, leagueNumber: 10 },
      { leagueName: 'Serie A', leagueFlag: italyFlag, leagueNumber: 10 },
      { leagueName: 'Bundesliga', leagueFlag: germanyFlag, leagueNumber: 10 },
    ],
  },
];

export interface EsportsTypes {
  sport?: string;
  tournaments?: tournamentsTypes[];
  icon?: string;
  sportTypeId?: number;
}

export interface tournamentsTypes {
  tournamentName: string;
  tournamentFlag: string;
}

export const Esports: EsportsTypes[] = [
  {
    sport: 'Dota 2',
    icon: Dota2,
    tournaments: [
      {
        tournamentName: 'dota',
        tournamentFlag: Dota2,
      },
    ],
  },
  {
    sport: 'CS:GO',
    icon: CSGO,
    tournaments: [
      {
        tournamentName: 'CS:GO',
        tournamentFlag: CSGO,
      },
    ],
  },
  {
    sport: 'League of Legends',
    icon: LOL,
    tournaments: [
      {
        tournamentName: 'League of Legends',
        tournamentFlag: LOL,
      },
    ],
  },
];
