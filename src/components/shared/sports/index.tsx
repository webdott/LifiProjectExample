import Cards from "../cards";
import Matches from "../../featured/matches";
import Layout from "../../../layout/HomePage";
import Loader from "../Loader/Loader";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import {
  liveMatches,
  // topMatches,
  upcomingMatches,
} from "../../../constants/matches";

function Sport(): JSX.Element {
  const { data, error, loading } = useTypedSelector((state) => state.games);

  return (
    <Layout>
      <Cards games={data} />
      {!error && !loading ? (
        <Matches
          liveMatches={liveMatches}
          // topMatches={topMatches}
          upcomingMatches={upcomingMatches}
        />
      ) : (
        <>
          <Loader />
        </>
      )}
    </Layout>
  );
}

export default Sport;
