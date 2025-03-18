export const useConstants = () => {
	const { t } = useI18n();

	const routingLinks = computed(() => [
		{
			label: t('route-home'),
			to: '/'
		},
		{
			label: t('route-about'),
			to: '/'
		},
		{
			label: t('route-projects'),
			to: '/'
		},
		{
			label: t('route-advantage'),
			to: '/'
		},
		{
			label: t('route-contacts'),
			to: '/'
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
