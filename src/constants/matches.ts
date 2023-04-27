import { matchesDisableIcons, matchesIcons } from './../constants/icons';
import ManuLogo from './../assets/images/manu.png';
import MancityLogo from './../assets/images/mancity.png';
import RealMadridLogo from './../assets/images/realMadrid.png';
import AtleticoLogo from './../assets/images/Atletico.png';
import PremierLeagueLogo from './../assets/images/premier-league.png';
import laligaLogo from './../assets/images/laligaLogo.png';

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
  team1: string;
  team2: string;
  timeLabel: string;
  time: string;
  matchOdds: {
    id: number;
    odds: string;
    oddName: string;
  }[];
}

export interface LeagueType {
  leagueName: string;
  matches: MatchType[];
}

export interface SportsAndGamesType {
  sportName: string;
  type: string;
  leagues: LeagueType[];
}

export const allSportsAndGames: SportsAndGamesType[] = [
  {
    sportName: 'football',
    type: 'sports',
    leagues: [
      {
        leagueName: 'Premier League',
        matches: [
          {
            id: '1',
            team1: 'Manchester United',
            team2: 'Manchester City',
            timeLabel: 'Today',
            time: '14:00',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
      {
        leagueName: 'LaLiga',
        matches: [
          {
            id: '2',
            team1: 'Real Madrid',
            team2: 'Atletic Bilbao',
            timeLabel: 'Tomorrow',
            time: '19:50',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 4 },
              { odds: '4.25', oddName: '1', id: 5 },
              { odds: '10.00', oddName: '1', id: 6 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'basketball',
    type: 'sports',
    leagues: [
      {
        leagueName: 'NBA',
        matches: [
          {
            id: '3',
            team1: 'Golden State Warriors',
            team2: 'Los Angeles Lakers',
            timeLabel: 'Today',
            time: '11:20',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
      {
        leagueName: 'WNBA',
        matches: [
          {
            id: '4',
            team1: 'Los Angeles Sparks',
            team2: 'Chicago Sky',
            timeLabel: 'Today',
            time: '21:30',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 4 },
              { odds: '4.25', oddName: '1', id: 5 },
              { odds: '10.00', oddName: '1', id: 6 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'mma',
    type: 'sports',
    leagues: [
      {
        leagueName: 'UFC',
        matches: [
          {
            id: '5',
            team1: 'Azamat Murzakanov',
            team2: 'Dustin Jacoby',
            timeLabel: 'Today',
            time: '16:45',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
          {
            id: '6',
            team1: 'Ion Cutelaba',
            team2: 'Tanner Boser',
            timeLabel: 'Tomorrow',
            time: '20:40',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'tennis',
    type: 'sports',
    leagues: [
      {
        leagueName: 'ATP Monte-Carlo - R16',
        matches: [
          {
            id: '7',
            team1: 'Novak Djokovic',
            team2: 'Lorenzo Musetti',
            timeLabel: 'Today',
            time: '16:45',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
          {
            id: '8',
            team1: 'Daniil Medvedev',
            team2: 'Alexander Zverev',
            timeLabel: 'Tomorrow',
            time: '20:40',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'icehockey',
    type: 'sports',
    leagues: [
      {
        leagueName: 'NHL',
        matches: [
          {
            id: '9',
            team1: 'Vegas Golden Knights',
            team2: 'Seattle Kraken',
            timeLabel: 'Today',
            time: '03:45',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
          {
            id: '10',
            team1: 'Vancouver Canucks',
            team2: 'Arizona Coyotes',
            timeLabel: 'Tomorrow',
            time: '01:08',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'boxing',
    type: 'sports',
    leagues: [
      {
        leagueName: 'Boxing Matches',
        matches: [
          {
            id: '11',
            team1: 'Zhilei Zhang',
            team2: 'Joe Joyce',
            timeLabel: 'Today',
            time: '22:40',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
          {
            id: '12',
            team1: 'Christina Linardatou',
            team2: 'Mikaela Mayer',
            timeLabel: 'Tomorrow',
            time: '21:00',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'american football',
    type: 'sports',
    leagues: [],
  },
  {
    sportName: 'dota2',
    type: 'esports',
    leagues: [
      {
        leagueName: 'DreamLeague',
        matches: [
          {
            id: '13',
            team1: 'Aster',
            team2: 'TSM',
            timeLabel: 'Today',
            time: '22:40',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'cs:go',
    type: 'esports',
    leagues: [
      {
        leagueName: 'ESL Challenger League Europe',
        matches: [
          {
            id: '14',
            team1: 'DomiNation',
            team2: 'LDLC',
            timeLabel: 'Today',
            time: '18:15',
            matchOdds: [
              { odds: '1.25', oddName: '1', id: 1 },
              { odds: '4.25', oddName: '1', id: 2 },
              { odds: '10.00', oddName: '1', id: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    sportName: 'league of legends',
    type: 'esports',
    leagues: [],
  },
];

export enum oddsEnum {
  UK = 'UK',
  US = 'US',
  EU = 'EU',
}

export const odds: oddsEnum[] = [oddsEnum.UK, oddsEnum.US, oddsEnum.EU];
