<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
const { setLocale } = useI18n();
if (import.meta.client) {
	const locale = localStorage.getItem('locale') || navigator.language.split('-')[0];
	setLocale(locale);
}
</script>
