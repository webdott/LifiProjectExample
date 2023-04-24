export interface checkBalanceProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  color: string;
}

export const sidebarSlide: SidebarProps[] = [
  { color: '#e6e6e6' },
  { color: '#33ffc1' },
  { color: '#505050' },
];

export enum SidebarButtonsText {
  GXP = 'Claim 750 GXP',
  INVITE1 = 'Mint code 1',
  INVITE2 = 'Mint code 2',
  INVITE3 = 'Mint code 3',
  MINT = 'Mint now',
  UPGRADE = 'Upgrade to lvl x',
}

export interface NavBarTypes {
  text: string;
  path: string;
}

export interface QuestsTypes {
  questName: string;
  gxpCount: string;
  rewardsCount: string;
}

export const navBarLinks: NavBarTypes[] = [
  {
    text: 'GXP',
    path: '/membership',
  },
  {
    text: 'Mint',
    path: '/mint',
  },
  {
    text: 'Upgrade',
    path: '/upgrade',
  },
  // remove invite page
  // {
  //   text: 'Invite',
  //   path: '/invite',
  // },
  {
    text: 'Help',
    path: '/help',
  },
];

export const gxpValueData: { title: string; value: string }[] = [
  {
    title: 'Total GXP earned',
    value: '42069',
  },
  {
    title: 'Available GXP',
    value: '420',
  },
  {
    title: 'GXP multiplier',
    value: '2x',
  },
];

export const questsItems: QuestsTypes[] = [
  {
    gxpCount: '50',
    questName: 'Quest One',
    rewardsCount: '3/3',
  },
  {
    gxpCount: '200',
    questName: 'Quest Two',
    rewardsCount: '1/1',
  },
  {
    gxpCount: '500',
    questName: 'Quest Three',
    rewardsCount: '300/300',
  },
];

export const invitePageButtons: string[] = [
  SidebarButtonsText.INVITE1,
  SidebarButtonsText.INVITE2,
  SidebarButtonsText.INVITE3,
];
