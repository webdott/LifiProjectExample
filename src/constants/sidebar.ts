export interface checkBalanceProps {
  children: React.ReactNode
}

export interface SidebarProps {
  color: string
}

export const sidebarSlide: SidebarProps[] = [
  { color: '#e6e6e6' },
  { color: '#33ffc1' },
  { color: '#505050' },
]

export enum SidebarButtonsText {
  GXP = 'Claim 750 GXP',
  INVITE1 = 'Mint code 1',
  INVITE2 = 'Mint code 2',
  INVITE3 = 'Mint code 3',
  MINT = 'Mint now',
  UPGRADE = 'Upgrade to lvl x',
}

export interface NavBarTypes {
  text: string
  path: string
}

export interface QuestsTwoTypes {
  questName: string
  gxpCount: string
  rewardsCount: string
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
  {
    text: 'Invite',
    path: '/invite',
  },
  {
    text: 'Help',
    path: '/help',
  },
]

export const gxpValueData: string[] = [
  'Total GXP earned',
  'Available GXP',
  'GXP multiplier',
]

export const questsTwoItems: QuestsTwoTypes[] = [
  {
    gxpCount: '50',
    questName: 'Quest one',
    rewardsCount: '3/3',
  },
  {
    gxpCount: '200',
    questName: 'Quest two',
    rewardsCount: '1/1',
  },
  {
    gxpCount: '500',
    questName: 'Quest three',
    rewardsCount: '300/300',
  },
]

export const invitePageButtons: string[] = [
  SidebarButtonsText.INVITE1,
  SidebarButtonsText.INVITE2,
  SidebarButtonsText.INVITE3,
]
