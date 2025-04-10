<template>
	<GenplanWrapper :background-image="bgImage" :paths="paths" />
</template>

<script setup>
import bgImage from '~/assets/images/genplan.avif';

const { t } = useI18n();
// const {data, error, status} = useFetch(`${API_URL}/phases`, {

// });

const paths = [
	{
		path: 'M 637.389 704.955 L 501.388 573.406 L 501.388 527.302 L 524.461 519.924 L 524.461 516.235 L 1065.42 366.858 L 1207.49 438.167 L 1039.92 484.271 L 1056.92 494.72 L 1056.92 515.622 L 795.244 612.133 L 769.136 638.566 L 711.46 632.418 L 683.53 646.557 L 705.994 679.136 L 637.389 704.955 Z',
		phaseId: '1'
	}
	// {
	// 	path: 'M 171.081 681.876 L 315.678 570.415 L 451.35 536.076 L 688.777 746.947 L 315.678 910.823 L 171.081 719.835 L 171.081 681.876 Z',
	// 	phaseId: '2'
	// },
	// {
	// 	path: 'M 1118.37 365.913 L 1138.19 361.383 L 1138.19 358.795 L 1623.93 263.023 L 1692.94 285.672 L 1714.02 292.789 L 1714.02 319.968 L 1207.85 440.977 L 1118.37 399.562 L 1118.37 365.913 Z',
	// 	phaseId: '3'
	// }
];

useHead({
	title: t('genplan')
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
			fill: rgba($clr-primary, 0.55);
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
