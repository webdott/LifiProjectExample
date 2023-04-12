import Tooltip from '@mui/material/Tooltip';
import Upload from '../uploadPhoto/Upload';
import { WalletProps } from './../../../constants/wallet';
import walletIcon from '../../../assets/images/buttonWalletIcon.png';
import copyIcon from '../../../assets/images/copyIcon.png';
import { useMetaMask } from 'metamask-react';
import viewIcon from '../../../assets/images/viewIcon.png';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';

import styles from './userInfo.module.scss';

export default function UserInfo(props: WalletProps): JSX.Element {
	const { account } = useMetaMask();
	const { copyToClipboard, feedback } = useCopyToClipboard();
	return (
		<div className={styles.container}>
			<div className={styles.userSection}>
				<Upload />
				<div className={styles.user}>
					<div className={styles.username}>Username</div>
					<div className={styles.bottomSection}>
						<div className={styles.walletAddress}>
							<img src={walletIcon} />
							<span>
								{account
									? account.length > 8
										? account.substring(0, 4) +
										  '...' +
										  account.substring(account.length - 4, account.length)
										: account
									: ''}
							</span>{' '}
							<Tooltip
								title={feedback.length > 0 ? feedback : 'Copy address'}
								placement='top'>
								<img
									src={copyIcon}
									alt='copy address'
									onClick={() => copyToClipboard(account ?? '')}
								/>
							</Tooltip>
						</div>
						<a
							href={`https://gnosisscan.io/address/${account}`}
							target='_blank'
							rel='noreferrer'
							className={styles.viewBtn}>
							<img src={viewIcon} />
							<span>View on Explorer</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
