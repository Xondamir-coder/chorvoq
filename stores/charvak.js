import { defineStore } from 'pinia';

export const useCharvakStore = defineStore('charvak', () => {
	const selectedPhase = ref();
	const selectedBuilding = ref();
	const selectedFloor = ref();
	const selectedSketch = ref();
	const selectedApartment = ref();

	onMounted(() => {
		selectedPhase.value = JSON.parse(localStorage.getItem('selectedPhase'));
		selectedBuilding.value = JSON.parse(localStorage.getItem('selectedBuilding'));
		selectedFloor.value = JSON.parse(localStorage.getItem('selectedFloor'));
		selectedSketch.value = JSON.parse(localStorage.getItem('selectedSketch'));
		selectedApartment.value = JSON.parse(localStorage.getItem('selectedApartment'));
	});

	const setPhase = phase => {
		selectedPhase.value = phase;
		localStorage.setItem('selectedPhase', JSON.stringify(phase));
	};

	const setBuilding = building => {
		selectedBuilding.value = building;
		localStorage.setItem('selectedBuilding', JSON.stringify(building));
	};

	const setFloor = floor => {
		selectedFloor.value = floor;
		localStorage.setItem('selectedFloor', JSON.stringify(floor));
	};

	const setSketch = sketch => {
		selectedSketch.value = sketch;
		localStorage.setItem('selectedSketch', JSON.stringify(sketch));
	};

	const setApartment = apartment => {
		selectedApartment.value = apartment;
		localStorage.setItem('selectedApartment', JSON.stringify(apartment));
	};

	return {
		selectedPhase,
		selectedBuilding,
		selectedFloor,
		selectedSketch,
		selectedApartment,
		setPhase,
		setBuilding,
		setFloor,
		setSketch,
		setApartment
	};
});
