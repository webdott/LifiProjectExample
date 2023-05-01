import { gnosis, polygon } from 'wagmi/chains';

export const GRAPHQL_URLS: { [key: number]: string } = {
  [gnosis.id]: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-gnosis',
  [polygon.id]: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon',
};

export const LIQUIDITY_POOLS: { [key: number]: string } = {
  [polygon.id]: '0x7043e4e1c4045424858ecbced80989feafc11b36',
  [gnosis.id]: '0x204e7371ade792c5c006fb52711c50a7efc843ed',
};
