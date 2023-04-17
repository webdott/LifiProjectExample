const MintVideo = require('../public/video/MintVideo.mp4');

export interface GxpTokenType {
	id: string;
	urlSrc: string;
	level: number;
	gxpToUpgrade: number;
}

export const gxpTokens: GxpTokenType[] = [
	{
		id: '#452',
		urlSrc: MintVideo,
		level: 24,
		gxpToUpgrade: 5420,
	},
	{
		id: '#658',
		urlSrc: MintVideo,
		level: 24,
		gxpToUpgrade: 5420,
	},
];
