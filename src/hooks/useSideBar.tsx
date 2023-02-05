import { useState } from "react";

interface fnProps {
  footBall: boolean;
  basketBall: boolean;
  mma: boolean;
  tennis: boolean;
  icehockey: boolean;
}

export function useSideBar() {
  const [matches, setMatches] = useState<fnProps>({
    footBall: false,
    basketBall: false,
    mma: false,
    tennis: false,
    icehockey: false,
  });

  const handleFootBall = () => {
    setMatches({
      footBall: !matches.footBall,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: false,
    });
  };
  const handleBasketBall = () => {
    setMatches({
      footBall: false,
      basketBall: !matches.basketBall,
      mma: false,
      tennis: false,
      icehockey: false,
    });
  };

  const handleMma = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: !matches.mma,
      tennis: false,
      icehockey: false,
    });
  };
  const handleTennis = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: !matches.tennis,
      icehockey: false,
    });
  };
  const handleIceHockey = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: !matches.icehockey,
    });
  };

  return {
    handleFootBall,
    handleBasketBall,
    handleMma,
    handleTennis,
    handleIceHockey,
    footBallState: matches.footBall,
    basketBallState: matches.basketBall,
    mmaState: matches.mma,
    tennisState: matches.tennis,
    iceHockeyState: matches.icehockey,
  };
}
