import check from "../public/icons/check.svg";
import binoculars from "../public/image/binoculars.png";

export interface OfficialContractProps {
  bet: string;
  iconCheck: string;
  img: string;
  wallet: string;
}

export interface PrivacyLinkProps {
  name: string;
  link: string;
}

export enum BetNameEnum {
  CORE = "Core",
  AZURO_BET = "Azuro Bet",
  AZURO_LP = "Azuro LP",
}

export enum PrivacyTextEnum {
  GIT_BOOK = "Gitbook",
  TERMS_CONDITIONS = "Terms & Conditions",
  PRIVACY_POLICY = "Privacy Policy",
  FAQ = "FAQ",
}

export const officialContract: OfficialContractProps[] = [
  {
    bet: BetNameEnum.CORE,
    iconCheck: check,
    wallet: "0x4fE...d37d",
    img: binoculars,
  },
  {
    bet: BetNameEnum.AZURO_BET,
    iconCheck: check,
    wallet: "0xFd9...e476",
    img: binoculars,
  },
  {
    bet: BetNameEnum.AZURO_LP,
    iconCheck: check,
    wallet: "0xac0...FD0a",
    img: binoculars,
  },
];

export const privacy: PrivacyLinkProps[] = [
  { name: PrivacyTextEnum.GIT_BOOK, link: "" },
  { name: PrivacyTextEnum.TERMS_CONDITIONS, link: "" },
  { name: PrivacyTextEnum.PRIVACY_POLICY, link: "" },
  { name: PrivacyTextEnum.FAQ, link: "" },
];
