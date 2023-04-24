import check from '../public/icons/check.svg';
import binoculars from '../public/image/binoculars.png';

export interface OfficialContractProps {
  bet: string;
  iconCheck: string;
  img: string;
  wallets?: {
    gnosis: {
      wallet: string;
      link: string;
    };
    poly: {
      wallet: string;
      link: string;
    };
  };
}

export interface PrivacyLinkProps {
  name: string;
  link: string;
}

export enum BetNameEnum {
  CORE = 'Core',
  AZURO_BET = 'Azuro Bet',
  AZURO_LP = 'Azuro LP',
}

export enum PrivacyTextEnum {
  GIT_BOOK = 'Gitbook',
  TERMS_CONDITIONS = 'Terms & Conditions',
  PRIVACY_POLICY = 'Privacy Policy',
  FAQ = 'FAQ',
}

export const officialContract: OfficialContractProps[] = [
  {
    bet: BetNameEnum.CORE,
    iconCheck: check,
    img: binoculars,
    wallets: {
      gnosis: {
        wallet: '0x4fE6A9e47db94a9b2a4FfeDE8db1602FD1fdd37d',
        link: 'https://gnosisscan.io/address/0x4fE6A9e47db94a9b2a4FfeDE8db1602FD1fdd37d',
      },
      poly: {
        wallet: '0x7182E00567b580733BD32C69eC5069ef00280721',
        link: 'https://polygonscan.com/address/0x7182E00567b580733BD32C69eC5069ef00280721',
      },
    },
  },
  {
    bet: BetNameEnum.AZURO_BET,
    iconCheck: check,
    img: binoculars,
    wallets: {
      gnosis: {
        wallet: '0xFd9E5A2A1bfc8B57A288A3e12E2c601b0Cc7e476',
        link: 'https://gnosisscan.io/address/0xFd9E5A2A1bfc8B57A288A3e12E2c601b0Cc7e476',
      },
      poly: {
        wallet: '0xcffDd3341787C97E39C0Ec99E71a7A2c09B8eB93',
        link: 'https://polygonscan.com/address/0xcffDd3341787C97E39C0Ec99E71a7A2c09B8eB93',
      },
    },
  },
  {
    bet: BetNameEnum.AZURO_LP,
    iconCheck: check,
    img: binoculars,
    wallets: {
      gnosis: {
        wallet: '0xac004b512c33D029cf23ABf04513f1f380B3FD0a',
        link: 'https://gnosisscan.io/address/0xac004b512c33D029cf23ABf04513f1f380B3FD0a',
      },
      poly: {
        wallet: '0x2a838AB9b037db117576db8D0DcC3B686748EF7c',
        link: 'https://polygonscan.com/address/0x2a838AB9b037db117576db8D0DcC3B686748EF7c',
      },
    },
  },
];

export const privacy: PrivacyLinkProps[] = [
  { name: PrivacyTextEnum.GIT_BOOK, link: '' },
  { name: PrivacyTextEnum.TERMS_CONDITIONS, link: '' },
  { name: PrivacyTextEnum.PRIVACY_POLICY, link: '' },
  { name: PrivacyTextEnum.FAQ, link: '' },
];
