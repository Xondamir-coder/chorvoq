const TELEGRAM_BOT_TOKEN = '7210323515:AAHkdkJdhW-U87o-Ln2wk9g-bKYN2SUhF-g';
const TELEGRAM_CHAT_ID = '-1002534880544';
const formatOptions = {
	minute: 'numeric',
	hour: 'numeric',
	month: 'numeric',
	day: 'numeric',
	year: 'numeric'
};
const CRM_URL = 'http://45.9.231.175:81/api/WebForm/SendWebForm';
const PROJECT_NAME = 'Chorvoq Darvozasi';
const PROJECT_ID = 42;

const sendDataToCRM = async ({ name, phone }) => {
	const trimmedPhone = phone.replaceAll(' ', '');
	try {
		const res = await $fetch(CRM_URL, {
			method: 'POST',
			body: {
				nameSurname: name,
				phone: trimmedPhone,
				projectID: PROJECT_ID,
				projectName: PROJECT_NAME,
				comfirmTems: true
			}
		});
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const useSendTelegram = async ({ name, phone }) => {
	const text = `
Имя: ${name}
Телефон: ${phone}
Дата: ${Intl.DateTimeFormat('en-GB', formatOptions).format(Date.now())}
`;
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	try {
		const res = await $fetch(url, {
			method: 'POST',
			body: { chat_id: TELEGRAM_CHAT_ID, text }
		});
		await sendDataToCRM({ name, phone });
		return res;
	} catch (e) {
		console.error(e);
	}
};
