import mediumIcon from "../assets/images/disableMediumLogo.png";
import gitHubIcon from "../assets/images/disableGithubLogo.png";
import twitterIcon from "../assets/images/disableTwitterLogo.png";
import mailIcon from "../assets/images/disableMailLogo.png";
import discordIcon from "../assets/images/disableDiscordLogo.png";
import mediumActiveIcon from "../assets/images/activeMediumLogo.png";
import githubActiveIcon from "../assets/images/activeGithubLogo.png";
import twitterActiveIcon from "../assets/images/activeTwitterLogo.png";
import mailActiveIcon from "../assets/images/activeMailLogo.png";
import discordActiveIcon from "../assets/images/activeDiscordLogo.png";

export interface SocialProps {
  link: string;
  icon: string;
  activeIcon: string;
}

export const socialMedia: SocialProps[] = [
  {
    link: "https://medium.com/@bookmakerxyz",
    icon: mediumIcon,
    activeIcon: mediumActiveIcon,
  },
  {
    link: "https://github.com/bookmakerxyz",
    icon: gitHubIcon,
    activeIcon: githubActiveIcon,
  },
  {
    link: "https://twitter.com/bookmakerxyz",
    icon: twitterIcon,
    activeIcon: twitterActiveIcon,
  },
  { link: "#", icon: mailIcon, activeIcon: mailActiveIcon },
  { link: "#", icon: discordIcon, activeIcon: discordActiveIcon },
];
