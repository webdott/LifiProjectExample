import type { AzuroGame } from "@azuro-protocol/sdk";

export interface GamesState {
  loading: boolean;
  error: string | null;
  games: AzuroGame[];
}

export type cardProps = {
  games: AzuroGame[];
};
