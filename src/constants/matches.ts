import { Dayjs } from 'dayjs';
import { matchesDisableIcons, matchesIcons } from './../constants/icons';
import { SportHubSlug, SportSlug } from './sports';

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

export interface Country {
  name: string;
  slug: string;
}
export interface GameLeague {
  name: string;
  country: Country;
}
export interface Participant {
  name: string;
  image: string | null;
}
export interface Outcome {
  conditionId: string;
  coreAddress: string;
  id: string;
  lpAddress: string;
  odds: string;
  outcomeId: string;
  selectionName: string;
}
export interface Game {
  id: string;
  gameId: string;
  startsAtString: string;
  startsAt: Dayjs;
  participant1: Participant;
  participant2: Participant;
  league: GameLeague;
  timeLabel: string;
  markets: any[];
}

export interface League {
  slug: string;
  name: string;
  country: Country;
  games: Game[];
}

export type SportHub = {
  name: string;
  slug: SportHubSlug;
};
export interface Sport {
  sportId: string;
  name: string;
  slug: SportSlug;
  sporthub: SportHub;
  leagues: League[];
}

export enum oddsEnum {
  UK = 'UK',
  US = 'US',
  EU = 'EU',
}

export const odds: oddsEnum[] = [oddsEnum.UK, oddsEnum.US, oddsEnum.EU];
