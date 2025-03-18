import en from './en.json';
import ru from './ru.json';
import uz from './uz.json';

export default defineI18nConfig(() => ({
	legacy: false,
	// TODO: Automatic locale based on browsers default
	locale: 'ru',
	messages: {
		en,
		ru,
		uz
	}
}));
