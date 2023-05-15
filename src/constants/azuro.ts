import { gnosis, polygon } from 'wagmi/chains';

export const GRAPHQL_URLS: { [key: number]: string } = {
  [gnosis.id]: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-gnosis',
  [polygon.id]: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon',
};

export const USDT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
export const USDT_DECIMALS = 6;

export const XDAI_DECIMALS = 18;

export const LIQUIDITY_POOLS: { [key: number]: string } = {
  [polygon.id]: '0x7043e4e1c4045424858ecbced80989feafc11b36',
  [gnosis.id]: '0x204e7371ade792c5c006fb52711c50a7efc843ed',
};

export const CHAIN_IDS: { [key: number]: number } = {
  [polygon.id]: 137,
  [gnosis.id]: 100,
};

export const CURRENCY_SYMBOLS = {
  [polygon.id]: 'USDT',
  [gnosis.id]: 'xDAI',
};

export const ABI_PAYLOAD = [
  {
    inputs: [
      { internalType: 'address', name: 'core', type: 'address' },
      { internalType: 'uint128', name: 'amount', type: 'uint128' },
      { internalType: 'uint64', name: 'expiresAt', type: 'uint64' },
      {
        components: [
          { internalType: 'address', name: 'affiliate', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IBet.BetData',
        name: 'betData',
        type: 'tuple',
      },
    ],
    name: 'bet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'core', type: 'address' },
      { internalType: 'uint64', name: 'expiresAt', type: 'uint64' },
      {
        components: [
          { internalType: 'address', name: 'affiliate', type: 'address' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
        internalType: 'struct IBet.BetData',
        name: 'betData',
        type: 'tuple',
      },
    ],
    name: 'betNative',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
];
