// URLs
export const DOMAIN_URL = 'https://api.chorvoqdarvozasi.uz';
export const API_URL = `${DOMAIN_URL}/api`;

// Constants
export const TELEGRAM_BOT_TOKEN = '7210323515:AAHkdkJdhW-U87o-Ln2wk9g-bKYN2SUhF-g';
export const TELEGRAM_CHAT_ID = '-1002534880544';
const formatOptions = {
	minute: 'numeric',
	hour: 'numeric',
	month: 'numeric',
	day: 'numeric',
	year: 'numeric'
};

// Functions
export const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
export const sendDataTelegram = async content => {
	const text = `
${content.trim()}
Дата: ${Intl.DateTimeFormat('en-GB', formatOptions).format(Date.now())}
`;
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	try {
		await $fetch(url, {
			method: 'POST',
			body: { chat_id: TELEGRAM_CHAT_ID, text }
		});
	} catch (e) {
		console.error(e);
	}
};
