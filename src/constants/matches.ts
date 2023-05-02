import { matchesDisableIcons, matchesIcons } from './../constants/icons';
import { SportSlug } from './sports';

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

export interface Game {
  id: string;
  startsAtString: string;
  team1: string;
  team2: string;
  timeLabel: string;
  markets: any[];
}

export interface League {
  slug: string;
  name: string;
  flag: string;
  games: Game[];
}

export interface Sport {
  sport: string;
  activeIcon: string;
  disableIcon: string;
  sportSlug: SportSlug;
  sportHub: string;
  sportHubSlug: string;
  leagues: League[];
}

export enum oddsEnum {
  UK = 'UK',
  US = 'US',
  EU = 'EU',
}

export const odds: oddsEnum[] = [oddsEnum.UK, oddsEnum.US, oddsEnum.EU];
