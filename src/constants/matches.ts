import { matchesDisableIcons, matchesIcons } from "./../constants/icons";
import ManuLogo from "./../assets/images/manu.png";
import MancityLogo from "./../assets/images/mancity.png";
import RealMadridLogo from "./../assets/images/realMadrid.png";
import AtleticoLogo from "./../assets/images/Atletico.png";
import PremierLeagueLogo from "./../assets/images/premier-league.png";
import laligaLogo from "./../assets/images/laligaLogo.png";

export enum MatchesEnum {
  LIVE = "Live",
  UPCOMING = "Upcoming",
  TOPBETS = "Top bets",
}

export interface MatchesColumnTypes {
  tab: MatchesEnum;
  icon: string;
  disableIcon: string;
}

export const matchesColumn: MatchesColumnTypes[] = [
  {
    tab: MatchesEnum.LIVE,
    icon: matchesIcons.liveIcon,
    disableIcon: matchesDisableIcons.disLiveIcon,
  },
  {
    tab: MatchesEnum.UPCOMING,
    icon: matchesIcons.upcomingIcon,
    disableIcon: matchesDisableIcons.disUpcomingIcon,
  },
];

export interface MatchesTypes {
  leagueName: string;
  leagueLogo: string;
  team1: string;
  team1Logo: string;
  team2: string;
  team2Logo: string;
  score: string;
  timeLabel: string;
  time: string;
  matchOdds:any;
}

export const liveMatches: MatchesTypes[] = [
  {
    leagueName: "Premier League",
    leagueLogo: PremierLeagueLogo,
    team1: "Manchester United",
    team1Logo: ManuLogo,
    team2: "Manchester City",
    team2Logo: MancityLogo,
    score: "3 - 6",
    timeLabel: "Today",
    time: "45:21",
    matchOdds:[{odds:"1.25",oddName:'1',id:1},{odds:"4.25",oddName:'1',id:2},{odds:"10.00",oddName:'1',id:3}]
  },
  {
    leagueName: "LaLiga",
    leagueLogo: laligaLogo,
    team1: "Real Madrid",
    team1Logo: RealMadridLogo,
    team2: "Atletic Bilbao",
    team2Logo: AtleticoLogo,
    score: "2 - 1",
    timeLabel: "Today",
    time: "88:21",
    matchOdds:[{odds:"1.25",oddName:'1',id:4},{odds:"4.25",oddName:'1',id:5},{odds:"10.00",oddName:'1',id:6}]
  },
];
export const upcomingMatches: MatchesTypes[] = [
  {
    leagueName: "Premier League",
    leagueLogo: PremierLeagueLogo,
    team1: "Manchester United",
    team1Logo: ManuLogo,
    team2: "Manchester City",
    team2Logo: MancityLogo,
    score: "---",
    timeLabel: "Today",
    time: "---",
    matchOdds:[{odds:"1.25",oddName:'1',id:1},{odds:"4.25",oddName:'1',id:2},{odds:"10.00",oddName:'1',id:3}]
  },
  {
    leagueName: "LaLiga",
    leagueLogo: laligaLogo,
    team1: "Real Madrid",
    team1Logo: RealMadridLogo,
    team2: "Atletic Bilbao",
    team2Logo: AtleticoLogo,
    score: "---",
    timeLabel: "Today",
    time: "---",
    matchOdds:[{odds:"1.25",oddName:'1',id:4},{odds:"4.25",oddName:'1',id:5},{odds:"10.00",oddName:'1',id:6}]
  },
];
// export const topMatches: MatchesTypes[] = [
//   {
//     leagueName: "Premier League",
//     leagueLogo: PremierLeagueLogo,
//     team1: "Manchester United",
//     team1Logo: ManuLogo,
//     team2: "Manchester City",
//     team2Logo: MancityLogo,
//     score: "3 - 6",
//     timeLabel: "Today",
//     time: "45:21",
//     matchOdds:[{odds:"1.25",oddName:'1'},{odds:"4.25",oddName:'1'},{odds:"10.00",oddName:'1'}]
//   },
//   {
//     leagueName: "LaLiga",
//     leagueLogo: laligaLogo,
//     team1: "Real Madrid",
//     team1Logo: RealMadridLogo,
//     team2: "Atletic Bilbao",
//     team2Logo: AtleticoLogo,
//     score: "2:1",
//     timeLabel: "Today",
//     time: "88:21",
//     matchOdds:[{odds:"1.25",oddName:'1'},{odds:"4.25",oddName:'1'},{odds:"10.00",oddName:'1'}]
//   },
// ];

export enum oddsEnum {
  UK = "UK",
  US = "US",
  EU = "EU",
}

export const odds: oddsEnum[] = [oddsEnum.UK, oddsEnum.US, oddsEnum.EU];
