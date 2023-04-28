export enum Sports {
  dota2 = 'dota-2',
  csGo = 'csgo',
  leagueOfLegends = 'lol',
  baseball = 'baseball',
  boxing = 'boxing',
  basketball = 'basketball',
  iceHockey = 'ice-hockey',
  football = 'football',
  mma = 'mma',
  americalFootball = 'american-football',
  tennis = 'tennis',
  rugbyLeague = 'rugby-league',
  rugbyUnion = 'rugby-union',
}

export enum SportHubs {
  esports = 'esports',
  sports = 'sports',
}

export const SPORTS_HUB_MAP: { [k in SportHubs]: Sports[] } = {
  [SportHubs.sports]: [
    Sports.football,
    Sports.basketball,
    Sports.tennis,
    Sports.mma,
    Sports.boxing,
    Sports.iceHockey,
    Sports.americalFootball,
    Sports.baseball,
    Sports.rugbyUnion,
    Sports.rugbyLeague,
  ],
  [SportHubs.esports]: [Sports.dota2, Sports.csGo, Sports.leagueOfLegends],
};
