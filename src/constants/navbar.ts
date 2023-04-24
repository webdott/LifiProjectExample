import { ButtonType } from '../components/shared/button/type';

export interface NavbarProps {
  name: string;
  btnType: ButtonType;
  path?: string;
}

export interface HeaderRightSectionProps {
  btnType: ButtonType;
  text: string;
  link: string;
}

export enum HeaderButtonText {
  Close = 'Close',
  Home = 'Home',
  Sport = 'Sports',
  EsPorts = 'Esports',
  Membership = 'Membership',
  Balance_Checker = 'Balance checker',
  My_Account_Tab = 'My account',
  Balance_Available = 'Balance Available',
  In_Bets = 'In Bets',
  To_Payout = 'To payout',
  Wallet = 'Wallet',
  My_Bets = 'My Bets',
  Disconnect = 'Disconnect',
  Connect_Wallet = 'Connect Wallet',
  Wallet_Connect = 'Wallet Connect',
  Metamask_Wallet = 'Metamask Wallet',
  Bet_Slip = 'Bet slip',
  How_To_Play = 'How to play?',
  How_To_Make_a_Bet = 'How to make a bet?',
  Link_Discord = 'Link to Discord',
  User_Name = 'username',
  View_On = 'View on explorer',
  All = 'All',
  Unredeemed = 'Unredeemed',
  Accepted = 'Accepted',
  Settled = 'Settled',
  Sort = 'Sort by',
  Save = 'Save',
}

export const navbar: NavbarProps[] = [
  { name: HeaderButtonText.Home, btnType: ButtonType.small, path: '/' },
  { name: HeaderButtonText.Sport, btnType: ButtonType.small, path: '/sports' },
  {
    name: HeaderButtonText.EsPorts,
    btnType: ButtonType.small,
    path: '/esports',
  },
  {
    name: HeaderButtonText.Membership,
    btnType: ButtonType.small,
    path: '/membership',
  },
];
