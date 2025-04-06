<template>
	<main class="plan">
		<div class="plan__main" ref="mainRef">
			<img :src="backgroundImage" alt="genplan banner" class="plan__image" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1920 1080"
				preserveAspectRatio="xMidYMid slice">
				<NuxtLink
					v-for="path in paths"
					:key="path.id"
					@mouseover="pathInfo = path"
					@click="navigatePath(path)">
					<path :d="path.path"></path>
				</NuxtLink>
			</svg>
		</div>
		<div class="plan__bottom">
			<a href="tel:+998 71 202 22 22" class="plan__tel">
				<div class="plan__circle">
					<IconsPhone class="plan__icon" />
				</div>
				<div class="plan__tel-data">
					<h3 class="plan__tel-title"><span style="opacity: 0.73">71</span> 202 22 22</h3>
					<p class="plan__tel-text">{{ $t('order-call') }}</p>
				</div>
			</a>
			<div class="plan__buttons" v-if="$route.name.includes('buildings')">
				<button class="plan__button">
					<IconsShortArrowLeft class="plan__arrow" />
				</button>
				<button class="plan__button">
					<IconsShortArrowRight class="plan__arrow" />
				</button>
			</div>
			<div class="plan__social">
				<a href="#" class="plan__social-item">
					<IconsTelegram class="plan__social-icon" />
				</a>
				<a href="#" class="plan__social-item">
					<IconsFacebookCircular class="plan__social-icon" />
				</a>
				<a href="#" class="plan__social-item">
					<IconsInstagram class="plan__social-icon" />
				</a>
			</div>
		</div>
	</main>
	<MapTooltip :data="pathInfo" class="map-tooltip" />
	<Transition name="slide-in">
		<MapModal :data="commercialPath" v-if="showModal" @next="showNextCommercial" />
	</Transition>
	<MapInfo />
</template>

<script setup>
const props = defineProps({
	backgroundImage: String,
	paths: Array,
	pathname: String
});

const { $gsap } = useNuxtApp();
const router = useRouter();
const route = useRoute();

const showModal = ref(false);
const pathInfo = ref({});
const commercialPath = ref({});
const mainRef = ref();

const st = 32;
const handleMouseMove = e => {
	const ySt = e.clientY - 120 < 0 ? 100 : st;

	const x = (e.clientX / window.innerWidth) * (2 * st) - st;
	const y = (e.clientY / window.innerHeight) * (2 * st) - ySt;

	$gsap.to(mainRef.value, {
		x: -x,
		y: -y,
		duration: 0.5
	});
};
const navigatePath = path => {
	// // If its commercial path
	if (path.commercial && Object.keys(path.commercial).length !== 0) {
		showModal.value = true;
		commercialPath.value = path;
	} else {
		const id = path.phaseId || path.buildingId || path.blockId;
		const cleanSegment = str => str.replace(/^\/+|\/+$/g, '');
		const segments = [
			cleanSegment(route.path),
			cleanSegment(props.pathname.replace('placeholder', id))
		];
		const pathname = '/' + segments.join('/');
		router.push(pathname);
	}
};
const handleGlobalClick = e => {
	if (!e.target.closest('path')) {
		showModal.value = false;
		commercialPath.value = {};
	}
};
const showNextCommercial = () => {
	const newCommercial = props.paths.find(
		p =>
			p.commercial &&
			Object.keys(p.commercial).length !== 0 &&
			p.path !== commercialPath.value.path
	);
	if (!newCommercial) return;
	commercialPath.value = newCommercial;
};

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
</style>
