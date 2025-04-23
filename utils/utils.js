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

/**
 * Generates a PDF file from the server based on the given endpoint and query.
 * Creates a Blob from the response, creates an anchor element, sets the href
 * attribute to the blob URL, sets the download attribute to the given file name
 * with the .pdf extension, appends the anchor element to the document body,
 * simulates a click on the anchor element, and then removes the anchor element.
 * If an error occurs during the process, logs the error to the console.
 *
 * @param {string} endpoint - API endpoint to query
 * @param {string} fileName - File name to use for the generated PDF
 * @param {object} query - Query object to pass in the request body
 */
export const generatePDF = async (endpoint, fileName, query) => {
	try {
		const res = await $fetch(`${API_URL}${endpoint}`, { query: query });
		const blob = new Blob([res]);
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.setAttribute('download', `${fileName}.pdf`);
		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (error) {
		console.error(error);
	}
};
