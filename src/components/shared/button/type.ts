export default interface ButtonProps {
  btnType?: ButtonType;
  icon?: string;
  onClick?: (() => Promise<void>) | (() => void) | undefined;
  text?: string;
  className?: string;
}

export enum ButtonType {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  membershipButton = 'membershipButton',
  claim = 'clainGXPButton',
  mediumActive = 'mediumActive',
  betInfoButton = 'betInfoButton',
  betInfoButtonActive = 'betInfoButtonActive',
  betInfoLargeButton = 'betInfoLargeButton',
  walletButton = 'walletButton',
  GXP = 'GXP',
}
