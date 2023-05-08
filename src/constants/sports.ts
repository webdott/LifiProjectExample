import { BiTennisBall } from 'react-icons/bi';
import { LeftSideIcons } from './icons';
import { GiBoxingGlove, GiRugbyConversion } from 'react-icons/gi';
import { FaHockeyPuck } from 'react-icons/fa';
import { IoMdAmericanFootball } from 'react-icons/io';
import { MdSportsRugby } from 'react-icons/md';
import Dota2 from './../assets/images/dota2Icon.png';
import CSGO from './../assets/images/csgoIcon.png';
import LOL from './../assets/images/LOL.png';

export enum SportSlug {
  dota2 = 'dota-2',
  csgo = 'csgo',
  lol = 'lol',
  baseball = 'baseball',
  boxing = 'boxing',
  basketball = 'basketball',
  iceHockey = 'ice-hockey',
  football = 'football',
  mma = 'mma',
  americanFootball = 'american-football',
  tennis = 'tennis',
  rugbyLeague = 'rugby-league',
  rugbyUnion = 'rugby-union',
}
export enum SportHubSlug {
  sports = 'sports',
  esports = 'esports',
}

export const SPORT_HUB_NAMES: { [key in SportHubSlug]: string } = {
  [SportHubSlug.sports]: 'Sports',
  [SportHubSlug.esports]: 'Esports',
};

export const SPORTS_HUB_MAP: { [k in SportHubSlug]: SportSlug[] } = {
  [SportHubSlug.sports]: [
    SportSlug.football,
    SportSlug.basketball,
    SportSlug.tennis,
    SportSlug.mma,
    SportSlug.boxing,
    SportSlug.iceHockey,
    SportSlug.americanFootball,
    SportSlug.baseball,
    SportSlug.rugbyUnion,
    SportSlug.rugbyLeague,
  ],
  [SportHubSlug.esports]: [SportSlug.dota2, SportSlug.csgo, SportSlug.lol],
};

export const SPORTS_NAMES: {
  [key in SportSlug]: string;
} = {
  [SportSlug.football]: 'Football',
  [SportSlug.basketball]: 'Basketball',
  [SportSlug.tennis]: 'Tennis',
  [SportSlug.mma]: 'MMA',
  [SportSlug.boxing]: 'Boxing',
  [SportSlug.iceHockey]: 'Ice Hockey',
  [SportSlug.americanFootball]: 'American Football',
  [SportSlug.baseball]: 'Baseball',
  [SportSlug.rugbyUnion]: 'Rugby Union',
  [SportSlug.rugbyLeague]: 'Rugby League',
  [SportSlug.dota2]: 'Dota 2',
  [SportSlug.csgo]: 'CS:GO',
  [SportSlug.lol]: 'League of Legends',
};

export const SPORTS_ICONS: {
  [key in SportSlug]: {
    activeIcon: any;
    disableIcon: any;
  };
} = {
  [SportSlug.football]: {
    activeIcon: LeftSideIcons.activeFootball,
    disableIcon: LeftSideIcons.disableFootbal,
  },
  [SportSlug.basketball]: {
    activeIcon: LeftSideIcons.activeBasketball,
    disableIcon: LeftSideIcons.disableBasketball,
  },
  [SportSlug.tennis]: {
    activeIcon: BiTennisBall,
    disableIcon: BiTennisBall,
  },
  [SportSlug.mma]: {
    activeIcon: LeftSideIcons.activeMma,
    disableIcon: LeftSideIcons.disableMMA,
  },
  [SportSlug.boxing]: {
    activeIcon: GiBoxingGlove,
    disableIcon: GiBoxingGlove,
  },
  [SportSlug.iceHockey]: {
    activeIcon: FaHockeyPuck,
    disableIcon: FaHockeyPuck,
  },
  [SportSlug.americanFootball]: {
    activeIcon: IoMdAmericanFootball,
    disableIcon: IoMdAmericanFootball,
  },
  [SportSlug.baseball]: {
    activeIcon: IoMdAmericanFootball,
    disableIcon: IoMdAmericanFootball,
  },
  [SportSlug.rugbyUnion]: {
    activeIcon: MdSportsRugby,
    disableIcon: MdSportsRugby,
  },
  [SportSlug.rugbyLeague]: {
    activeIcon: MdSportsRugby,
    disableIcon: MdSportsRugby,
  },
  [SportSlug.dota2]: {
    activeIcon: Dota2,
    disableIcon: Dota2,
  },
  [SportSlug.csgo]: {
    activeIcon: CSGO,
    disableIcon: CSGO,
  },
  [SportSlug.lol]: {
    activeIcon: LOL,
    disableIcon: LOL,
  },
};
