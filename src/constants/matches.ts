import { matchesDisableIcons, matchesIcons } from './../constants/icons';
import ManuLogo from './../assets/images/manu.png';
import MancityLogo from './../assets/images/mancity.png';
import RealMadridLogo from './../assets/images/realMadrid.png';
import AtleticoLogo from './../assets/images/Atletico.png';
import PremierLeagueLogo from './../assets/images/premier-league.png';
import laligaLogo from './../assets/images/laligaLogo.png';
import { AzuroLeague } from '../redux/reducers/games';

export enum MatchesEnum {
  ALL = 'All',
  TODAY = 'Today',
  TOMORROW = 'Tomorrow',
}

export interface MatchesColumnTypes {
  tab: MatchesEnum;
  icon: string;
  disableIcon: string;
}

export const matchesColumn: MatchesColumnTypes[] = [
  {
    tab: MatchesEnum.ALL,
    icon: matchesIcons.liveIcon,
    disableIcon: matchesDisableIcons.disLiveIcon,
  },
  {
    tab: MatchesEnum.TODAY,
    icon: matchesIcons.upcomingIcon,
    disableIcon: matchesDisableIcons.disUpcomingIcon,
  },
  {
    tab: MatchesEnum.TOMORROW,
    icon: matchesIcons.upcomingIcon,
    disableIcon: matchesDisableIcons.disUpcomingIcon,
  },
];

export interface MatchType {
  id: string;
  startsAt: string;
  startsAtString: string;
  team1: string;
  team2: string;
  timeLabel: string;
  markets: any[];
}

export interface LeagueType {
  slug: string;
  name: string;
  games: MatchType[];
}

export interface SportsByLeagues {
  sport: string;
  sportHub: string;
  leagues: LeagueType[];
}

export enum oddsEnum {
  UK = 'UK',
  US = 'US',
  EU = 'EU',
}

export const odds: oddsEnum[] = [oddsEnum.UK, oddsEnum.US, oddsEnum.EU];
