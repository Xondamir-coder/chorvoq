export const useConstants = () => {
	const { t } = useI18n();

	const routingLinks = computed(() => [
		{
			label: t('route-home'),
			to: '#'
		},
		{
			label: t('route-about'),
			to: '#home-about'
		},
		{
			label: t('route-projects'),
			to: '#home-avenues'
		},
		{
			label: t('route-advantage'),
			to: '#home-advantages'
		},
		{
			label: t('route-contacts'),
			to: '#home-message'
		}
	]);

	const languages = [
		{
			label: 'Eng',
			locale: 'en'
		},
		{
			label: 'Ru',
			locale: 'ru'
		},
		{
			label: 'Uz',
			locale: 'uz'
		}
	];

	return {
		routingLinks,
		languages
	};
};
