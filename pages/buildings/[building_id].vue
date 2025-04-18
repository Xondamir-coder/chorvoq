<template>
	<GenplanWrapper
		:background-image="currentImg"
		:data="currentPaths"
		@change-floor="changeFloor" />
</template>

<script setup>
const { t } = useI18n();
const { params } = useRoute();
const charvakStore = useCharvakStore();

const allChildren = computed(() => charvakStore.selectedBuilding?.children);

const currentId = ref(params.building_id);
const currentPaths = ref([]);

const currentImg = computed(() => {
	const currentChild = allChildren.value?.find(c => c.id == currentId.value);
	return `${DOMAIN_URL}/${currentChild?.image}`;
});

const fetchBuildings = async () => {
	try {
		const res = await $fetch(`${API_URL}/buildings/${currentId.value}`);
		currentPaths.value = res.floors;
	} catch (error) {
		console.error(error);
	}
};
fetchBuildings();

const changeFloor = direction => {
	if (direction === 'next') {
		const index = allChildren.value.findIndex(c => c.id == currentId.value);
		const nextId =
			index >= allChildren.value.length - 1
				? allChildren.value[0].id
				: allChildren.value[index + 1].id;
		currentId.value = nextId;
	} else {
		const index = allChildren.value.findIndex(c => c.id == currentId.value) - 1;
		const prevId =
			index < 0
				? allChildren.value[allChildren.value.length - 1].id
				: allChildren.value[index].id;
		currentId.value = prevId;
	}
	fetchBuildings();
};

useHead({
	title: t('floors')
});
</script>
