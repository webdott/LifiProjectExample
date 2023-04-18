import { FC, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AiFillCaretUp } from 'react-icons/ai';

import PolygonIcon from '../../shared/icons/polygonIcon';
import GnosisIcon from '../../shared/icons/gnosisIcon';
import TabPanel from './tabpanel';

import styles from './walletbalance.module.scss';
import useOutsideClick from '../../../hooks/useClickOutside';

function a11yProps(index: number) {
	return {
		id: `wallet-balance-tab-${index}`,
		'aria-controls': `wallet-balance-tabpanel-${index}`,
	};
}

const tabStyles = {
	tabs: {
		'& .MuiTabs-indicator': {
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: 'transparent',
		},
	},
	tab: {
		fontSize: '12px',
		fontWeight: '600',
		minHeight: '32px',
		borderRadius: '4px',
		color: 'white',
		opacity: '0.6',
		padding: '0px 4px',
		textTransform: 'capitalize',

		'&.Mui-selected': {
			background: '#2c2c2e',
			color: '#00ffb2',
			opacity: '1',
			borderBottom: 'none',
		},
	},
};

interface WalletBalanceProps {
    closeWalletBalance: () => void;
}

export default function WalletBalance({closeWalletBalance}: WalletBalanceProps) {
	const [value, setValue] = useState(0);
	const { ref: clickOutRef } = useOutsideClick(closeWalletBalance);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className={styles.walletBalanceContainer} ref={clickOutRef}>
			<AiFillCaretUp color='#2c2c2e' className={styles.arrowUp} size={24} />
			<Box className={styles.walletBalance}>
				<Box className={styles.tabPanelContainer}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='wallet balance tabs'
						variant='fullWidth'
						className={styles.tabs}
						sx={tabStyles.tabs}>
						<Tab
							icon={<PolygonIcon />}
							iconPosition='start'
							label='Polygon Mainnet'
							{...a11yProps(0)}
							sx={tabStyles.tab}
						/>
						<Tab
							icon={<GnosisIcon />}
							iconPosition='start'
							label='Gnosis'
							{...a11yProps(1)}
							sx={tabStyles.tab}
						/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0} />
				<TabPanel value={value} index={1} />
			</Box>
		</div>
	);
}
