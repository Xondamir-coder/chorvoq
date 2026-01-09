<template>
	<Transition name="scale-fade">
		<div class="preloader" v-if="!isHidden">
			<div class="preloader__star-container">
				<VectorsStarPattern class="preloader__star" />
			</div>
			<div class="preloader__top">
				<VectorsNbuColored class="preloader__vector" />
				<VectorsDcityColored class="preloader__vector" />
			</div>
			<h2 class="preloader__text">
				<span>{{ $t('preloader-text') }}</span>
				<span class="preloader__divider">&nbsp;</span>
				<div class="preloader__carousel">
					<span
						v-for="(word, i) in words"
						:key="word"
						:style="{
							transform: `translateY(${
								i > activeIndex ? -100 : i === activeIndex ? 0 : 100
							}%)`
						}">
						{{ word }}
					</span>
				</div>
			</h2>
			<h3 class="preloader__status">
				<div class="preloader__carousel preloader__carousel--status">
					<span
						v-for="(percentage, i) in percentages"
						:key="percentage"
						:style="{
							transform: `translateY(${
								i > activeIndex ? -100 : i === activeIndex ? 0 : 100
							}%)`
						}">
						{{ percentage }}%
					</span>
				</div>
			</h3>
			<VectorsLogoColored class="preloader__vector preloader__vector--last" data-primary />
		</div>
	</Transition>
</template>

<script setup>
const { t } = useI18n();
const { $lenis } = useNuxtApp();

const words = computed(() => [t('preloader-text-1'), t('preloader-text-2'), t('preloader-text-3')]);
const activeIndex = ref(0);
const isHidden = ref(false);

const percentages = [0, 57, 100];
const INTERVAL_TIME = 1.3;
let interval;

if (import.meta.client) {
	// Trigger the first increment earlier
	setTimeout(() => {
		activeIndex.value++;
		interval = setInterval(() => {
			if (activeIndex.value === words.value.length - 1) {
				clearInterval(interval);
				setTimeout(() => {
					$lenis.start();
					isHidden.value = true;
				}, 150);
				return;
			}
			activeIndex.value++;
		}, INTERVAL_TIME * 1000);
	}, (INTERVAL_TIME * 1000) / 3); // Start earlier
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
	from {
		transform: translate(-35%, 55%) rotate(0);
	}
	to {
		transform: translate(-35%, 55%) rotate(360deg);
	}
}
@keyframes appear-scale-down {
	from {
		opacity: 0;
		transform: scale(1.15);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
@keyframes slide-from-left {
	from {
		opacity: 0;
		transform: translateX(-25px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-right {
	from {
		transform: translateX(25px);
		opacity: 0;
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-bottom {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes appear {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.preloader {
	position: fixed;
	inset: 0;
	background-color: #fff;
	z-index: 500;
	color: $clr-primary;
	padding-inline: $layout-spacing;
	padding-block: clamp(10.5px, 2.65vw, 40px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	&__star {
		fill: $clr-primary;
		opacity: 0.3;
		animation: rotate 50s infinite linear;
		&-container {
			pointer-events: none;
			position: absolute;
			bottom: 0;
			width: 50%;
			left: 0;
			animation: appear-scale-down 1s 0.4s backwards;
		}
	}
	&__carousel {
		display: grid;
		overflow: hidden;
		& > * {
			grid-area: 1/1/2/2;
			transition: transform 1s ease;
		}
		&--status {
			animation: slide-from-bottom 0.75s 0.3s backwards;
			& > * {
				transition-delay: 0.75s;
			}
		}
	}
	&__status {
		font-size: clamp(20px, 2vw, 50px);
		font-weight: 400;
	}
	&__divider {
		@media only screen and (max-width: $bp-xs) {
			display: none;
		}
	}
	&__text {
		display: flex;
		font-size: clamp(30px, 4vw, 100px);
		font-weight: 400;
		margin-top: 10vh;
		animation: appear-scale-down 0.75s 0.2s backwards;
		@media only screen and (max-width: $bp-xs) {
			flex-direction: column;
			text-align: center;
		}
	}
	&__top {
		align-self: stretch;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.preloader__vector {
			animation: 1s;
			&:first-of-type {
				animation-name: slide-from-left;
			}
			&:last-of-type {
				animation-name: slide-from-right;
				translate: 0 15%;
			}
		}
	}
	&__vector {
		width: clamp(125px, 15vw, 300px);
		&--last {
			animation: appear 0.75s 0.4s backwards;
		}
	}
}
.scale-fade-enter-active,
.scale-fade-leave-active {
	transition: transform 1s ease, opacity 1s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
	transform: scale(1.15);
	opacity: 0;
}
</style>
