import { useNavigate } from 'react-router';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import Skeleton from 'react-loading-skeleton';
import { Box } from '@mui/material';

import Button from '../../shared/button';
import { ButtonType } from '../../shared/button/type';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './walletbalance.module.scss';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
	isLoading: boolean;
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
	const navigate = useNavigate();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const { data, isLoading: isLoadingBalance } = useBalance({
		address,
	});
	const { children, value, index, isLoading, ...other } = props;
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
						{isLoading || isLoadingBalance ? (
							<Box
								sx={{
									opacity: 0.25,
								}}>
								<Skeleton
									style={{
										width: '80px',
										height: '18px',
										borderRadius: '50px',
									}}
								/>
							</Box>
						) : (
							<p className={styles.value}>
								{data?.formatted} {data?.symbol}
							</p>
						)}
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
							onClick={() =>
								index === 0 ? navigate('/get-usdc') : navigate('/get-xdai')
							}
						/>

						<Button
							className={styles.disconnectButton}
							btnType={ButtonType.membershipButton}
							text={'Diconnect wallet'}
							onClick={() => disconnect()}
						/>
					</div>
				</>
			)}
		</div>
	);
}
