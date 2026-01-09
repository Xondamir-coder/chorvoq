<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const store = useCharvakStore();
const { selectedPhase, selectedBuilding, selectedFloor, selectedSketch, selectedApartment } =
  storeToRefs(store);

onMounted(() => {
  if (!localStorage) return;
  selectedPhase.value = JSON.parse(localStorage.getItem('selectedPhase'));
  selectedBuilding.value = JSON.parse(localStorage.getItem('selectedBuilding'));
  selectedFloor.value = JSON.parse(localStorage.getItem('selectedFloor'));
  selectedSketch.value = JSON.parse(localStorage.getItem('selectedSketch'));
  selectedApartment.value = JSON.parse(localStorage.getItem('selectedApartment'));
});
</script>
