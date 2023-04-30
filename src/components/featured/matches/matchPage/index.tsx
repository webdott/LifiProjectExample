import React, { useState } from 'react';

import MatchHeader from './matchHeader';
import AllMatchOdds from './allMatchOdds';
import Layout from '../../../../layout/HomePage';

const MatchPage = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Layout>
      <MatchHeader value={value} setValue={setValue} />
      {value === 0 && <AllMatchOdds />}
    </Layout>
  );
};

export default MatchPage;
