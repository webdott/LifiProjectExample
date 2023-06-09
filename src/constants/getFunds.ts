export interface GetFundsNavBarTypes {
  text: string;
  path: string;
}

const getFundsLinks: GetFundsNavBarTypes[] = [
  {
    text: 'Buy with crypto',
    path: '/get-funds/buy-with-crypto',
  },
  {
    text: 'Buy with card',
    path: '/get-funds/buy-with-card',
  },
];

export const getUSDTLinks: GetFundsNavBarTypes[] = [
  {
    text: 'Get USDT',
    path: '/get-funds',
  },
  ...getFundsLinks,
];

export const getXDAILinks: GetFundsNavBarTypes[] = [
  {
    text: 'Get XDAI',
    path: '/get-funds',
  },
  ...getFundsLinks,
];
