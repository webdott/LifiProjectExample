import CheckerLayout from '../../../layout/GxpPage';
import { gxpTokens } from '../../../constants/upgradeGxp';
import Token from './token';

import styles from './upgrade.module.scss';

export default function Upgrade() {
	return (
		<CheckerLayout>
			<div className={styles.upgrade}>
				<div className={styles.upgradeTitle}>Upgrade your Bowtie</div>
				<div className={styles.upgradeDescription}>
					<p className={styles.title}>Available GXP</p>
					<p className={styles.value}>2668</p>
				</div>
				<div className={styles.gxpTokens}>
					{gxpTokens.map((token) => (
						<Token token={token} key={token.id} />
					))}
				</div>
			</div>
		</CheckerLayout>
	);
}
