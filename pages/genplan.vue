<template>
	<GenplanWrapper :background-image="backgroundImage" :paths="phasesData" />
</template>

<script setup>
import backgroundImage from '~/assets/images/genplan.avif';
import phasesData from '~/assets/data/phases.json';

const { t } = useI18n();

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
