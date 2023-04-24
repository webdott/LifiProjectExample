import type { AzuroGame } from '@azuro-protocol/sdk';

const shortenCompetitorName = (name: string) => {
  const words = name.split(' ');

  if (words.length === 3) {
    return words.map((word) => word.charAt(0)).join('');
  }

  if (words.length === 2) {
    const [name1, name2] = name.split(' ');

    return name1.substr(0, 3) + name2.charAt(0);
  }

  return name.substr(0, 3);
};

export const showOddsLabels = (outcomeRegistryId: any, participants: any) => {
  const oddsLabels: any = {
    1: `${shortenCompetitorName(participants[0].name)} win`,
    2: 'Draw',
    3: `${shortenCompetitorName(participants[1].name)} win`,
    4: `${shortenCompetitorName(participants[0].name)} win or draw`,
    5: `${shortenCompetitorName(participants[0].name)} win or ${shortenCompetitorName(
      participants[1].name
    )} win`,
    6: `${shortenCompetitorName(participants[1].name)} win or Draw`,
    7: 'Handiсap 1',
    8: 'Handiсap 2',
    9: 'Over',
    10: 'Under',
    11: 'Over',
    12: 'Under',
    13: 'Over',
    14: 'Under',
    180: 'Yes',
    181: 'No',
    182: 'Yes',
    183: 'No',
    184: 'Yes',
    185: 'No',
    186: 'Yes',
    187: 'No',
    424: `${shortenCompetitorName(participants[0].name)} win`,
    425: 'Draw',
    426: `${shortenCompetitorName(participants[0].name)} win`,
    731: 'Correct Score',
    10000: 'W1/W1',
    10001: 'W1/X',
    10002: 'W1/W2',
    10003: 'X/W1',
    10004: 'X/X',
    10005: 'X/W2',
    10006: 'W2/W1',
    10007: 'W2/X',
    10008: 'W2/W2',
    10009: `${shortenCompetitorName(participants[0].name)} win`,
    10010: `${shortenCompetitorName(participants[1].name)} win`,
  };

  return oddsLabels[outcomeRegistryId];
};

type Props = AzuroGame;

const fns = {
  W1: ({ participants }: Props) => `${shortenCompetitorName(participants[0].name)} win`,
  W2: ({ participants }: Props) => `${shortenCompetitorName(participants[1].name)} win`,
  Draw: (props: Props) => 'Draw',
  '1X': ({ participants }: Props) => `${shortenCompetitorName(participants[0].name)} win or draw`,
  '12': ({ participants }: Props) =>
    `${shortenCompetitorName(participants[0].name)} win or ${shortenCompetitorName(
      participants[1].name
    )} win`,
  '2X': ({ participants }: Props) => `${shortenCompetitorName(participants[1].name)} win or draw`,
};

const outcomeRegistry: Record<number, (props: Props) => string> = {
  1: fns.W1,
  2: fns.Draw,
  3: fns.W2,
  4: fns['1X'],
  5: fns['12'],
  6: fns['2X'],
  7: (props: Props) => 'Handiсap 1',
  8: (props: Props) => 'Handiсap 2',
  9: (props: Props) => 'Over',
  10: (props: Props) => 'Under',
  11: (props: Props) => 'Over',
  12: (props: Props) => 'Under',
  13: (props: Props) => 'Over',
  14: (props: Props) => 'Under',
  180: (props: Props) => 'Yes',
  181: (props: Props) => 'No',
  182: (props: Props) => 'Yes',
  183: (props: Props) => 'No',
  184: (props: Props) => 'Yes',
  185: (props: Props) => 'No',
  186: (props: Props) => 'Yes',
  187: (props: Props) => 'No',
  424: fns.W1,
  425: fns.Draw,
  426: fns.W2,
  731: (props: Props) => 'Correct Score',
  10000: (props: Props) => 'W1/W1',
  10001: (props: Props) => 'W1/X',
  10002: (props: Props) => 'W1/W2',
  10003: (props: Props) => 'X/W1',
  10004: (props: Props) => 'X/X',
  10005: (props: Props) => 'X/W2',
  10006: (props: Props) => 'W2/W1',
  10007: (props: Props) => 'W2/X',
  10008: (props: Props) => 'W2/W2',
  10009: fns.W1,
  10010: fns.W2,
};

export default outcomeRegistry;
