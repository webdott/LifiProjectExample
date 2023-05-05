import { ethers } from 'ethers';
import { privacy } from '../constants/footer';
const EthDater = require('ethereum-block-by-date');
const provider = new ethers.providers.CloudflareProvider();

const dater = new EthDater(provider);

export const getBlockNumber = async () => {
  let block = await dater.getDate(new Date(), true, false);
  return block.block;
};

export const formatDate = (startDate: number) => {
  let date = new Date(startDate),
    dataFormatter =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
      ' ' +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  return dataFormatter.split(' ')[1];
};

export const pickFeaturedGame = () => {
  return Math.floor(Math.random() * 10);
};

export const getTruncatedAddress = (account: string | undefined) =>
  account
    ? account.length > 8
      ? account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)
      : account
    : '';

export const getResultingChainUrl = (selectedChain: 'polygon' | 'gnosis', fullPath: string) => {
  localStorage.setItem('gamblr-selected-chain', selectedChain);

  const urlWithoutChainKeys: string[] = [
    'help',
    'privacy-policy',
    'about',
    'terms-conditions',
    'faq',
  ];

  let restPathJoined = urlWithoutChainKeys.find((url) => fullPath.includes(url));

  if (restPathJoined) return `/${restPathJoined}`;

  const restPath = fullPath.split('/').slice(2);
  restPathJoined = restPath.join('/');
  const bareRestPathJoined = restPathJoined.replaceAll('/', '');
  if (bareRestPathJoined.length === 0) return `/${selectedChain}`;

  return `/${selectedChain}/${restPath.join('/')}`;
};

export const checkIfBase = (url: string): boolean => {
  return (
    url.endsWith('/gnosis') ||
    url.endsWith('/polygon') ||
    url.endsWith('/gnosis/') ||
    url.endsWith('/polygon/')
  );
};

export const checkIfSPorts = (url: string): boolean => {
  return url.endsWith('sports') || url.endsWith('sports/');
};

export const getSelectedChainFromBase = (url: string) => {
  const selectedChain = url.split('/')?.[1];

  if (selectedChain === 'polygon' || selectedChain === 'gnosis') {
    localStorage.setItem('gamblr-selected-chain', selectedChain);
    return selectedChain;
  } else {
    return localStorage.getItem('gamblr-selected-chain') ?? 'gnosis';
  }
};

export const formatBalanceString = (balance: string, places?: number): string => {
  const balanceArr: string[] = balance.split('.');
  return balanceArr[0] + '.' + (balanceArr[1]?.slice(0, places ?? 2) ?? '');
};
