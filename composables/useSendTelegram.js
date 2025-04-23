const TELEGRAM_BOT_TOKEN = '7210323515:AAHkdkJdhW-U87o-Ln2wk9g-bKYN2SUhF-g';
const TELEGRAM_CHAT_ID = '-1002534880544';
const formatOptions = {
	minute: 'numeric',
	hour: 'numeric',
	month: 'numeric',
	day: 'numeric',
	year: 'numeric'
};

export const useSendTelegram = async content => {
	const text = `
${content.trim()}
Дата: ${Intl.DateTimeFormat('en-GB', formatOptions).format(Date.now())}
`;
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	try {
		const res = await $fetch(url, {
			method: 'POST',
			body: { chat_id: TELEGRAM_CHAT_ID, text }
		});
		return res;
	} catch (e) {
		console.error(e);
	}
};
