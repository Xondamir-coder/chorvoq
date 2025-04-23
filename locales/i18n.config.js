import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'ru',
	fallbackLocale: 'ru',
	messages: {
		en,
		ru,
		uz
	}
}));
