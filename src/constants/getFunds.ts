export interface GetFundsNavBarTypes {
	text: string;
	path: string;
}

const getFundsLinks: GetFundsNavBarTypes[] = [
	{
		text: 'Buy with crypto',
		path: '/buy-with-crypto',
	},
	{
		text: 'Buy with card',
		path: '/buy-with-card',
	},
];

export const getUSDCLinks: GetFundsNavBarTypes[] = [
	{
		text: 'Get USDC',
		path: '/get-usdc',
	},
	...getFundsLinks,
];

export const getXDAILinks: GetFundsNavBarTypes[] = [
	{
		text: 'Get XDAI',
		path: '/get-xdai',
	},
	...getFundsLinks,
];
