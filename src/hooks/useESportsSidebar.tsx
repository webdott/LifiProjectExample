import { useState } from 'react';

interface fnProps {
  dota2: boolean;
  csGo: boolean;
  leagueOfLegends: boolean;
}

export function useESportsSideBar() {
  const [sports, setSports] = useState<fnProps>({
    dota2: false,
    csGo: false,
    leagueOfLegends: false,
  });

  const handleDota2 = () => {
    setSports({
      dota2: !sports.dota2,
      csGo: false,
      leagueOfLegends: false,
    });
  };
  const handleCsGo = () => {
    setSports({
      dota2: false,
      csGo: !sports.csGo,
      leagueOfLegends: false,
    });
  };
  const handleLeagueOfLegends = () => {
    setSports({
      dota2: false,
      csGo: false,
      leagueOfLegends: !sports.leagueOfLegends,
    });
  };

  return {
    handleDota2,
    handleCsGo,
    handleLeagueOfLegends,
    dota2State: sports.dota2,
    csGoState: sports.csGo,
    leagueOfLegendsState: sports.leagueOfLegends,
  };
}
