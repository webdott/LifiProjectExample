import Cards from '../cards';
import Layout from '../../../layout/HomePage';
import Loader from '../Loader/Loader';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { allSportsAndGames } from '../../../constants/matches';
import MatchesContainer from './matchesContainer';

function Sport(): JSX.Element {
	const { data, error, loading } = useTypedSelector((state) => state.games);

	return (
		<Layout>
			<Cards games={data} />
			{!error && !loading ? (
				<MatchesContainer
					games={allSportsAndGames.filter((game) => game.type === 'sports')}
				/>
			) : (
				<Loader />
			)}
		</Layout>
	);
}

export default Sport;
