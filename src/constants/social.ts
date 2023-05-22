import mediumIcon from '../assets/images/disableMediumLogo.png';
import gitHubIcon from '../assets/images/disableGithubLogo.png';
import twitterIcon from '../assets/images/disableTwitterLogo.png';
import mailIcon from '../assets/images/disableMailLogo.png';
import discordIcon from '../assets/images/disableDiscordLogo.png';
import mediumActiveIcon from '../assets/images/activeMediumLogo.png';
import githubActiveIcon from '../assets/images/activeGithubLogo.png';
import twitterActiveIcon from '../assets/images/activeTwitterLogo.png';
import mailActiveIcon from '../assets/images/activeMailLogo.png';
import discordActiveIcon from '../assets/images/activeDiscordLogo.png';

export interface SocialProps {
  link: string;
  icon: string;
  activeIcon: string;
  isMail?: boolean;
}

export const socialMedia: SocialProps[] = [
  {
    link: '#',
    icon: mediumIcon,
    activeIcon: mediumActiveIcon,
  },
  {
    link: '#',
    icon: gitHubIcon,
    activeIcon: githubActiveIcon,
  },
  {
    link: '#',
    icon: twitterIcon,
    activeIcon: twitterActiveIcon,
  },
  {
    link: '#',
    icon: mailIcon,
    activeIcon: mailActiveIcon,
    isMail: true,
  },
  { link: '#', icon: discordIcon, activeIcon: discordActiveIcon },
];
