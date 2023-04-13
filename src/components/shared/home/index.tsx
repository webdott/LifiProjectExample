import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { allSportsAndGames } from '../../../constants/matches';
import MatchesContainer from './matchesContainer';

function Home(): JSX.Element {
	const { data, error, loading } = useTypedSelector((state) => state.games);

	return (
		<Layout>
			<Cards games={data} />
			{!error && !loading ? (
				<MatchesContainer
					games={allSportsAndGames}
				/>
			) : (
				<Loader />
			)}
		</Layout>
	);
}

export default Home;
