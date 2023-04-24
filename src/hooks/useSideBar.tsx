import { useState } from 'react';

interface fnProps {
  footBall: boolean;
  basketBall: boolean;
  mma: boolean;
  tennis: boolean;
  boxing: boolean;
  icehockey: boolean;
  americanFootball: boolean;
}

export function useSideBar() {
  const [matches, setMatches] = useState<fnProps>({
    footBall: false,
    basketBall: false,
    mma: false,
    tennis: false,
    icehockey: false,
    boxing: false,
    americanFootball: false,
  });

  const handleFootBall = () => {
    setMatches({
      footBall: !matches.footBall,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: false,
      boxing: false,
      americanFootball: false,
    });
  };
  const handleBasketBall = () => {
    setMatches({
      footBall: false,
      basketBall: !matches.basketBall,
      mma: false,
      tennis: false,
      icehockey: false,
      boxing: false,
      americanFootball: false,
    });
  };

  const handleMma = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: !matches.mma,
      tennis: false,
      icehockey: false,
      boxing: false,
      americanFootball: false,
    });
  };
  const handleTennis = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: !matches.tennis,
      icehockey: false,
      boxing: false,
      americanFootball: false,
    });
  };
  const handleIceHockey = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: !matches.icehockey,
      boxing: false,
      americanFootball: false,
    });
  };
  const handleBoxing = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: false,
      boxing: !matches.boxing,
      americanFootball: false,
    });
  };
  const handleAmericanFootball = () => {
    setMatches({
      footBall: false,
      basketBall: false,
      mma: false,
      tennis: false,
      icehockey: false,
      boxing: false,
      americanFootball: !matches.americanFootball,
    });
  };

  return {
    handleFootBall,
    handleBasketBall,
    handleMma,
    handleTennis,
    handleIceHockey,
    handleBoxing,
    handleAmericanFootball,
    footBallState: matches.footBall,
    basketBallState: matches.basketBall,
    mmaState: matches.mma,
    tennisState: matches.tennis,
    iceHockeyState: matches.icehockey,
    boxingState: matches.boxing,
    americanFootballState: matches.americanFootball,
  };
}
