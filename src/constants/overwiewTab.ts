import { HeaderButtonText } from "./navbar";
import overviewIcon from "./../assets/images/userIcon.png";
import mybetsIcon from "./../assets/images/betSlipIconSmall.png";
import myNftIcon from "./../assets/images/nftIcon.png";
import settingIcon from "./../assets/images/settingsIcon.png";
import transactionIcon from "./../assets/images/refreshIcon.png";
import { ButtonType } from "../components/shared/button/type";

export interface OverViewProps {
  icon: string;
  name: string;
  path: string;
}

export interface FilterProps {
  text: string;
  btnType: ButtonType;
}

export interface MenuItemType {
  title: string;
}

export enum OverViewTabEnum {
  OVERVIEW = "Overview",
  MY_BETS = "My Bets",
  MY_NFTS = "My NFTs",
  TRANSACTION = "Transaction",
  SETTINGS = "Settings",
}

export enum UserMenuPath {
  OverviewTab = "/overviewTab",
  Overview = "overview",
  My_Bets = "my_bets",
  My_NFT = "my_NFTs",
  Transaction = "transaction",
  Settings = "settings",
}

export enum SortEnum {
  Dashboard = "Dashboard",
  Event_Time = "Event time",
  Bet_Time = "Bet time",
}

export const overview: OverViewProps[] = [
  {
    icon: overviewIcon,
    path: UserMenuPath.Overview,
    name: OverViewTabEnum.OVERVIEW,
  },
  {
    icon: mybetsIcon,
    path: UserMenuPath.My_Bets,
    name: OverViewTabEnum.MY_BETS,
  },
  { icon: myNftIcon, path: UserMenuPath.My_NFT, name: OverViewTabEnum.MY_NFTS },
  {
    icon: transactionIcon,
    path: UserMenuPath.Transaction,
    name: OverViewTabEnum.TRANSACTION,
  },
  {
    icon: settingIcon,
    path: UserMenuPath.Settings,
    name: OverViewTabEnum.SETTINGS,
  },
];

export const filter: FilterProps[] = [
  { text: HeaderButtonText.All, btnType: ButtonType.medium },
  { text: HeaderButtonText.Unredeemed, btnType: ButtonType.medium },
  { text: HeaderButtonText.Accepted, btnType: ButtonType.medium },
  { text: HeaderButtonText.Settled, btnType: ButtonType.medium },
];

export const menu: MenuItemType[] = [
  { title: SortEnum.Dashboard },
  { title: SortEnum.Event_Time },
  { title: SortEnum.Bet_Time },
];
