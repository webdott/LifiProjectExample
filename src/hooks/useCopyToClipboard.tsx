import { useState } from 'react';

const useCopyToClipboard = () => {
	const [feedback, setFeedback] = useState<string>('');

	const fallbackCopyTextToClipboard = (str: string) => {
		const textArea = document.createElement('textarea');
		textArea.value = str;

		// Avoid scrolling to bottom
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand('copy');
			setFeedback('Copied successfully!!');
		} catch (err) {
			setFeedback('Error copying, try again');
		}

		document.body.removeChild(textArea);
	};

	const copyToClipboard = (str: string) => {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(str);
			return;
		}
		navigator.clipboard.writeText(str).then(
			function () {
				setFeedback('Copied successfully!!');
			},
			function (err) {
				setFeedback('Error copying, try again');
			}
		);
	};

	return {
		feedback,
		copyToClipboard,
	};
};

export default useCopyToClipboard;
