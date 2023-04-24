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
    link: 'https://medium.com/@gamblrxyz',
    icon: mediumIcon,
    activeIcon: mediumActiveIcon,
  },
  {
    link: 'https://gamblr-xyz.gitbook.io/gamblr.xyz/',
    icon: gitHubIcon,
    activeIcon: githubActiveIcon,
  },
  {
    link: 'https://twitter.com/gamblrxyz',
    icon: twitterIcon,
    activeIcon: twitterActiveIcon,
  },
  {
    link: 'Contact@gamblr.xyz',
    icon: mailIcon,
    activeIcon: mailActiveIcon,
    isMail: true,
  },
  { link: '#', icon: discordIcon, activeIcon: discordActiveIcon },
];
