<template>
	<main class="plan">
		<div class="plan__main" ref="mainRef">
			<Transition name="fade">
				<img
					:src="backgroundImage"
					alt="genplan banner"
					class="plan__image"
					:key="backgroundImage" />
			</Transition>
			<Transition name="fade">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1920 1080"
					preserveAspectRatio="xMidYMid slice"
					:key="data">
					<NuxtLink
						v-for="el in data"
						:key="el.id"
						@mouseover="hoveredEl = el"
						@click="navigatePath(el)">
						<path :d="el.path"></path>
					</NuxtLink>
				</svg>
			</Transition>
		</div>
		<div class="plan__bottom">
			<ButtonCall />
			<div class="plan__buttons" v-if="$route.name.includes('buildings')">
				<button class="plan__button" @click="emits('changeFloor', 'prev')">
					<IconsShortArrowLeft class="plan__arrow" />
				</button>
				<button class="plan__button" @click="emits('changeFloor', 'next')">
					<IconsShortArrowRight class="plan__arrow" />
				</button>
			</div>
			<div class="plan__social">
				<a href="https://t.me/dreamcityuz" class="plan__social-item">
					<IconsTelegram class="plan__social-icon" />
				</a>
				<a
					href="https://www.facebook.com/dreamcity.uz?mibextid=wwXIfr&mibextid=wwXIfr"
					class="plan__social-item">
					<IconsFacebookCircular class="plan__social-icon" />
				</a>
				<a
					href="https://www.instagram.com/dreamcity.uz?igsh=cWd6ZjdsMXhzeDR1&utm_source=qr"
					class="plan__social-item">
					<IconsInstagram class="plan__social-icon" />
				</a>
			</div>
		</div>
	</main>
	<!-- <div style="color: purple">{{ hoveredEl }}</div> -->
	<MapTooltip :data="hoveredEl" class="map-tooltip" />
	<Transition name="slide-in">
		<MapModal :data="selectedCommercial" v-if="showModal" @next="showNextCommercial" />
	</Transition>
	<MapInfo />
	<Transition name="popup-fade">
		<InactivePopup v-if="showInactivePopup" @close="showInactivePopup = false" />
	</Transition>
</template>

<script setup>
const props = defineProps({
	backgroundImage: String,
	data: Array
});

const { $gsap } = useNuxtApp();
const charvakStore = useCharvakStore();
const router = useRouter();
const route = useRoute();

const showModal = ref(false);
const showInactivePopup = ref(false);

const hoveredEl = ref();
const selectedCommercial = ref();

const mainRef = ref();

const st = 32;

const handleMouseMove = e => {
	const ySt = e.clientY - window.innerHeight / 3 < 0 ? 100 : st;

	const x = (e.clientX / window.innerWidth) * (2 * st) - st;
	const y = (e.clientY / window.innerHeight) * (2 * st) - ySt;

	$gsap.to(mainRef.value, {
		x: -x,
		y: -y,
		duration: 0.5
	});
};
const navigatePath = el => {
	// If its commercial path
	if (el.commercial) {
		showModal.value = true;
		selectedCommercial.value = el.commercial;
	} else {
		if (el.status == false) {
			showInactivePopup.value = true;
			return;
		}

		// Update storage & get ID
		let pathname;
		const { name } = route;

		if (name.includes('genplan')) {
			charvakStore.setPhase(el);
			pathname = `/phases/${el.id}`;
		} else if (name.includes('phases')) {
			charvakStore.setBuilding(el);
			pathname = `/buildings/${el.building_id}`;
		} else if (name.includes('buildings')) {
			charvakStore.setFloor(el);
			pathname = `/floors/${el.floor_number}?block_id=${el.block_id}`;
		}
		router.push(pathname);
	}
};
const handleGlobalClick = e => {
	if (!e.target.closest('path')) {
		showModal.value = false;
		selectedCommercial.value = {};
	}
};
const showNextCommercial = () => {
	// const newCommercial = props.paths.find(
	// 	p =>
	// 		p.commercial &&
	// 		Object.keys(p.commercial).length !== 0 &&
	// 		p.path !== commercialPath.value.path
	// );
	// if (!newCommercial) return;
	// commercialPath.value = newCommercial;
};
const emits = defineEmits(['changeFloor']);

onMounted(() => {
	mainRef.value.addEventListener('click', handleGlobalClick);
	if (window.innerWidth > 992) {
		document.addEventListener('mousemove', handleMouseMove);
	}
});

onUnmounted(() => {
	if (window.innerWidth > 992) {
		document.removeEventListener('mousemove', handleMouseMove);
	}
});
</script>

<style lang="scss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
	transition: all 0.3s ease;
}
.slide-in-enter-from,
.slide-in-leave-to {
	translate: 0 20px;
	opacity: 0;
}
.popup-fade {
	&-enter-active,
	&-leave-active {
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		transform: scale(1.1);
	}
}

.plan {
	display: grid;

	@media only screen and (min-width: $bp-lg) {
		overflow: hidden;
	}

	&:not(:has(path:hover)) ~ .map-tooltip {
		transform: translateX(20px);
		opacity: 0;
	}
	& > * {
		grid-area: 1/1/2/2;
	}
	&__image {
		object-fit: cover;
	}
	&__container {
		overflow: hidden;
	}
	&__main {
		position: relative;

		@media only screen and (min-width: $bp-lg) {
			height: 100vh;
			width: 100vw;
		}
		@media only screen and (max-width: $bp-lg) {
			display: grid;
			overflow-x: scroll;
		}

		& > * {
			object-fit: cover;
			@media only screen and (min-width: $bp-lg) {
				width: 109%;
				height: 109%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			@media only screen and (max-width: $bp-md) {
				width: 1920px;
				height: 1080px;
				grid-area: 1/1/2/2;
			}
		}
		path {
			cursor: pointer;
			transition: transform 0.3s, fill 0.3s;
			&:hover {
				fill: rgba($clr-primary, 0.55);
			}
			&:not(:hover) {
				fill: rgba(255, 255, 255, 0.2);
			}
		}
	}
	&__circle {
		width: 32px;
		height: 32px;
		background-color: #fff;
		border-radius: 50%;
		transition: background-color 0.3s;

		@include flex-center;
	}
	&__social {
		display: flex;
		gap: 6px;
		pointer-events: all;
		&-item {
			@include flex-center;
			background-color: #fff;
			border-radius: 50%;
			width: 24px;
			aspect-ratio: 1;
			&:hover .plan__social-icon {
				fill: $clr-red;
			}
		}
		&-icon {
			width: 60%;
			fill: $clr-primary;
			transition: fill 0.3s;
		}
	}
	&__arrow {
		transition: fill 0.3s;
		width: 14px;
		fill: $clr-primary;
	}
	&__button {
		background-color: #fff;
		border-radius: 50%;
		aspect-ratio: 1;
		width: clamp(30px, 4.3vw, 66px);
		box-shadow: 0px 4px 100px 0px rgba(0, 0, 0, 0.8);
		transition: background-color 0.3s;
		@include flex-center;
		&:hover {
			background-color: $clr-primary;
			.plan__arrow {
				fill: #fff;
			}
		}
	}
	&__buttons {
		display: flex;
		gap: 20px;
		pointer-events: all;
	}
	&__bottom {
		align-self: flex-end;
		position: relative;
		height: 127px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: max(15vw, 40px);
		pointer-events: none;
		@media only screen and (max-width: $bp-md) {
			display: none;
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(102, 102, 102, 0) 100%);
		}
	}
	&__tel {
		pointer-events: all;
		display: flex;
		z-index: 1;
		align-items: center;
		gap: 11px;
		&:hover {
			.plan__circle {
				background-color: $clr-red;
			}
			.plan__icon {
				fill: #fff;
			}
		}
		&-text {
			font-size: 14px;
			opacity: 0.73;
		}
	}
	&__icon {
		width: 16px;
		fill: $clr-red;
		transition: fill 0.3s;
	}
}

.fade {
	&-enter-active,
	&-leave-active,
	&-move {
		transition: opacity 0.5s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}
</style>
