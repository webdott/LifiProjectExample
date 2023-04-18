import Button from '../../shared/button';
import { ButtonType } from '../../shared/button/type';

import styles from './walletbalance.module.scss';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const walletbalanceDetails: {
	poly: {
		balance: string;
		inBets: string;
		toPayouts: string;
	};
	gnosis: {
		balance: string;
		inBets: string;
		toPayouts: string;
	};
} = {
	poly: {
		balance: '0 USDC',
		inBets: '0 USDC',
		toPayouts: '0 USDC',
	},
	gnosis: {
		balance: '0 XDAI',
		inBets: '0 XDAI',
		toPayouts: '0 XDAI',
	},
};

export default function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
	const balanceDetail: 'poly' | 'gnosis' = value === 0 ? 'poly' : 'gnosis';

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			className={styles.tabPanel}
			{...other}>
			{value === index && (
				<>
					<div className={styles.block}>
						<p className={styles.title}>Balance</p>
						<p className={styles.value}>
							{walletbalanceDetails[balanceDetail].balance}
						</p>
					</div>

					<div className={styles.block}>
						<p className={styles.title}>In Bets</p>
						<p className={styles.value}>
							{walletbalanceDetails[balanceDetail].inBets}
						</p>
					</div>

					<div className={styles.payoutsBlock}>
						<div className={styles.payouts}>
							<p className={styles.title}>Available GXP</p>
							<p className={styles.value}>
								{walletbalanceDetails[balanceDetail].toPayouts}
							</p>
						</div>

						{value === 0 && (
							<Button
								className={styles.ctaButton}
								btnType={ButtonType.membershipButton}
								text={'See All'}
							/>
						)}
					</div>

					<div className={styles.cta}>
						<Button
							className={styles.ctaButton}
							btnType={ButtonType.membershipButton}
							text={index === 0 ? 'Get USDC' : 'Get XDAI'}
						/>
					</div>
				</>
			)}
		</div>
	);
}
