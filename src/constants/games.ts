import { SportHubSlug, SportSlug } from './sports';

export const GAMES_ORDER = {
  [SportHubSlug.sports]: [
    SportSlug.football,
    SportSlug.basketball,
    SportSlug.mma,
    SportSlug.baseball,
    SportSlug.boxing,
    SportSlug.tennis,
    SportSlug.iceHockey,
    SportSlug.americanFootball,
    SportSlug.rugbyLeague,
    SportSlug.rugbyUnion,
  ],
  [SportHubSlug.esports]: [SportSlug.dota2, SportSlug.csgo, SportSlug.lol],
};
