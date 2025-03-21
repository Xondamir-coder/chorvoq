<template>
	<main class="plan">
		<div class="plan__main" ref="mainRef">
			<img src="~/assets/images/buildings.jpg" alt="plan banner" class="plan__image" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 2048 1152"
				preserveAspectRatio="xMidYMid slice"
				ref="svgRef">
				<path
					:data-hover="$t('hotel')"
					d="M 392.917 434.422 L 541.257 348.178 C 541.257 348.178 632.474 375.162 630.749 376.887 C 629.024 378.612 722.37 396.475 722.37 396.475 L 724.095 562.064 L 601.628 563.789 L 606.802 487.894 L 525.733 463.745 L 472.261 513.767 L 391.284 481.196 L 370.613 465.176 L 392.917 434.422 Z"></path>
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
		</div>
	</main>
	<MapTooltip :title="tooltipTitle" :type="$t('phase')" class="map-tooltip" />
	<Transition name="slide-in">
		<MapModal :data="data" :phase="tooltipTitle" v-if="showModal" />
	</Transition>
	<MapInfo />
</template>

<script setup>
import img from '~/assets/images/hotel-close.jpg';
const data = {
	img,
	title: "Savdo va ko'ngilochar markaz - bu shahar aholisi va mehmonlari"
};
const { $gsap } = useNuxtApp();

const showModal = ref(false);
const tooltipTitle = ref('');
const svgRef = ref();
const mainRef = ref();

const st = 32;

const handleMouseMove = e => {
	const x = (e.clientX / window.innerWidth) * (2 * st) - st;
	const y = (e.clientY / window.innerHeight) * (2 * st) - st;

	$gsap.to(mainRef.value, {
		x: -x,
		y: -y,
		duration: 0.5
	});
};

onMounted(() => {
	svgRef.value.addEventListener('mouseover', e => {
		const val = e.target.closest('path[data-hover]')?.dataset.hover;
		if (!val) return;
		tooltipTitle.value = val;
	});
	svgRef.value.addEventListener('click', e => {
		e.target.closest('path[data-hover]') ? (showModal.value = true) : (showModal.value = false);
	});

	if (window.innerWidth > 992) {
		document.addEventListener('mousemove', handleMouseMove);
	}
});

onUnmounted(() => {
	svgRef.value.removeEventListener('mouseover');
	if (window.innerWidth > 992) {
		document.removeEventListener('mousemove');
	}
});

useHead({
	title: 'Plan'
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
			fill: #68232380;
			cursor: pointer;
			transition: opacity 0.3s, transform 0.3s;
			&:not(:hover) {
				opacity: 0;
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
	&__bottom {
		align-self: flex-end;
		position: relative;
		height: 127px;
		display: flex;
		align-items: center;
		padding-inline: max(15vw, 40px);
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
