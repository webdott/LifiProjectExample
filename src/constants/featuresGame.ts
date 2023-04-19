import LeicesterCity from './../assets/images/LeicesterCity.png';
import NapoliFc from './../assets/images/Napoli.png';
import PremierLeague from './../assets/images/premierLogo.png';
import LaligaLogo from './../assets/images/laligaLogo.png';

export interface oddsBoxProps {
	leagueName: string;
	leagueLogo: string;
	team1Logo: string;
	team2Logo: string;
	score: string;
	liveLogo?: string;
	time: string;
	team1Name: string;
	team2Name: string;
	team1Percent: string;
	team2Percent: string;
	box: [
		{
			val1: string;
			val2: string;
			id: number;
		},
		{
			val1: string;
			val2: string;
			id: number;
		},
		{
			val1: string;
			val2: string;
			id: number;
		},
		{
			val1: string;
			val2: string;
			id: number;
		}
	];
}

export const OddsBoxValues: oddsBoxProps[] = [
	{
		leagueName: 'laliga',
		leagueLogo: LaligaLogo,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: '19:00 TODAY',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{
				id: 1,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 2,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 3,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 4,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
	{
		leagueName: 'premierLeague',
		leagueLogo: PremierLeague,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: 'Live Now',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{ id: 5, val1: '1x', val2: '1.91' },
			{
				id: 6,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 7,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 8,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
	{
		leagueName: 'premierLeague',
		leagueLogo: PremierLeague,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: 'Live Now',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{
				id: 9,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 10,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 11,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 12,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
	{
		leagueName: 'premierLeague',
		leagueLogo: PremierLeague,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: '20:00 Tomorrow',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{
				id: 13,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 14,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 15,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 16,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
	{
		leagueName: 'laliga',
		leagueLogo: LaligaLogo,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: '19:00 TODAY',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{
				id: 17,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 18,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 19,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 20,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
	{
		leagueName: 'premierLeague',
		leagueLogo: PremierLeague,
		team1Logo: LeicesterCity,
		team2Logo: NapoliFc,
		score: '3:4',
		time: '20:00 Tomorrow',
		team1Percent: '70%',
		team1Name: 'Napoli',
		team2Name: 'Leicester City',
		team2Percent: '37.7%',
		box: [
			{
				id: 21,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 22,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 23,
				val1: '1x',
				val2: '1.91',
			},
			{
				id: 24,
				val1: '+255',
				val2: 'bets',
			},
		],
	},
];
