<template>
	<section class="apartments" id="home-apartments">
		<div class="apartments__stars">
			<VectorsStarPattern class="apartments__star" id="home-apartments-star-1" />
			<VectorsStarPattern class="apartments__star" id="home-apartments-star-2" />
		</div>
		<div class="apartments__main">
			<div class="apartments__top">
				<span class="apartments__labels">
					{{ $t('apartments') }}&ThickSpace;&ThickSpace; /&ThickSpace;&ThickSpace;
					{{ $t('commercial-premises') }}
				</span>
				<h2 class="apartments__title">
					{{ currentTitle }}
				</h2>
			</div>
			<div class="apartments__content">
				<ul class="apartments__details">
					<TransitionGroup name="fade">
						<li
							class="apartments__detail"
							v-for="(detail, i) in currentDetails"
							:key="i">
							<span class="apartments__detail-rooms">{{ detail.room }}</span>
							<h3 class="apartments__detail-area">
								{{ detail.area }} {{ $t('m-squared') }}
							</h3>
						</li>
					</TransitionGroup>
				</ul>
				<NuxtLink to="/plan" class="apartments__button">{{ $t('learn-more') }}</NuxtLink>
			</div>
			<div class="apartments__carousel">
				<button
					class="apartments__arrow apartments__arrow--mobile"
					@click="changeApartment('prev')">
					<IconsArrowLeft class="apartments__arrow-icon" />
				</button>
				<div class="apartments__images">
					<img
						class="apartments__image"
						:alt="$t('apartment')"
						v-for="(apartment, i) in apartments"
						:key="i"
						:src="apartment.img"
						:class="{ active: i == currentIndex }" />
				</div>
				<div class="apartments__arrows">
					<button class="apartments__arrow" @click="changeApartment('prev')">
						<IconsArrowLeft class="apartments__arrow-icon" />
					</button>
					<button class="apartments__arrow" @click="changeApartment('next')">
						<IconsArrowLeft class="apartments__arrow-icon rotate-180" />
					</button>
				</div>
				<button
					class="apartments__arrow apartments__arrow--mobile"
					@click="changeApartment('next')">
					<IconsArrowLeft class="apartments__arrow-icon rotate-180" />
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
const { t } = useI18n();
import img1 from '~/assets/images/home-apartment-1.webp';
import img2 from '~/assets/images/home-apartment-2.webp';
import img3 from '~/assets/images/home-apartment-3.webp';
import img4 from '~/assets/images/home-apartment-4.webp';
import img5 from '~/assets/images/home-apartment-5.webp';

const apartments = [
	{
		id: 38,
		area: 105,
		img: img1,
		details: [
			{
				room: `${t('gym')} + ${t('kitchen')}`,
				area: '13.06'
			},
			{
				room: t('kidsroom'),
				area: '11.4'
			},
			{
				room: t('kidsroom'),
				area: '10.9'
			},
			{
				room: t('bedroom'),
				area: '15.9'
			},
			{
				room: t('bathroom'),
				area: '3.7'
			},
			{
				room: t('bathroom'),
				area: '3.8'
			},
			{
				room: t('terrace'),
				area: '30.7'
			},
			{
				room: t('hallway'),
				area: '13.6'
			}
		]
	},
	{
		id: 15,
		area: 57,
		img: img2,
		details: [
			{
				room: `${t('gym')} + ${t('kitchen')}`,
				area: '20.7'
			},
			{
				room: t('kidsroom'),
				area: '10.9'
			},
			{
				room: t('bedroom'),
				area: '12'
			},
			{
				room: t('bathroom'),
				area: '4.1'
			},
			{
				room: t('terrace'),
				area: '8.5'
			},
			{
				room: t('hallway'),
				area: '3.6'
			}
		]
	},
	{
		id: 12,
		area: 39,
		img: img3,
		details: [
			{
				room: `${t('gym')} + ${t('kitchen')}`,
				area: '20.7'
			},
			{
				room: t('hallway'),
				area: '2.7'
			},
			{
				room: t('bedroom'),
				area: '10.6'
			},
			{
				room: t('bathroom'),
				area: '3.8'
			},
			{
				room: t('terrace'),
				area: '4.4'
			}
		]
	},
	{
		id: 30,
		area: 25,
		img: img4,
		details: [
			{
				room: t('living-space'),
				area: '19.9'
			},
			{
				room: t('bathroom'),
				area: '3.8'
			},
			{
				room: t('terrace'),
				area: '3.6'
			}
		]
	},
	{
		id: 30,
		area: 153,
		img: img5,
		details: [
			{
				room: `${t('gym')} + ${t('kitchen')}`,
				area: '45'
			},
			{
				room: t('kidsroom'),
				area: '9.4'
			},
			{
				room: t('kidsroom'),
				area: '9.4'
			},
			{
				room: t('kidsroom'),
				area: '13.6'
			},
			{
				room: t('bedroom'),
				area: '16.9'
			},
			{
				room: t('bathroom'),
				area: '4'
			},
			{
				room: t('bathroom'),
				area: '5.9'
			},
			{
				room: t('hall'),
				area: '9.5'
			},
			{
				room: t('terrace'),
				area: '30.9'
			},
			{
				room: t('terrace'),
				area: '28.6'
			}
		]
	}
];

const currentIndex = ref(0);

const currentApartment = computed(() => apartments[currentIndex.value]);
const currentDetails = computed(() => currentApartment.value.details);
const currentTitle = computed(
	() => `${t('home-apartments-title')} ${currentApartment.value.id}
					${t('with-area')} ${currentApartment.value.area} ${t('m-squared')}`
);

const changeApartment = direction => {
	if (direction == 'next') {
		currentIndex.value = (currentIndex.value + 1) % apartments.length;
	} else {
		currentIndex.value = (currentIndex.value - 1 + apartments.length) % apartments.length;
	}
};

onMounted(() => {
	const parentId = '#home-apartments';
	const parentPrefix = `${parentId} .apartments`;

	GSAPAnimation(`${parentId}-star-1`, {
		animProps: { rotate: -90 }
	});
	GSAPAnimation(`${parentId}-star-2`, {
		animProps: { rotate: 90 }
	});
	GSAPAnimation(`${parentPrefix}__top`, {
		animProps: { y: 25 }
	});
	GSAPAnimation(`${parentPrefix}__details`, {
		animProps: { y: 25 }
	});
	GSAPAnimation(`${parentPrefix}__button`, {
		animProps: { scale: 0.8 }
	});
	GSAPAnimation(`${parentPrefix}__images`, {
		animProps: { scale: 0.95 }
	});
});
</script>

<style lang="scss" scoped>
.apartments {
	padding-bottom: clamp(40px, 4.3vw, 65px);
	background-color: $clr-primary;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: $bp-md) {
		padding-top: 30px;
	}
	&__carousel {
		display: flex;
		grid-area: carousel;
		flex-direction: column;

		@media only screen and (max-width: $bp-md) {
			display: grid;
			grid-template-columns: max-content 1fr max-content;
			align-items: center;
			gap: 16px;
		}
	}
	&__images {
		filter: drop-shadow(20px 24px 34px rgba(0, 0, 0, 0.25));
		flex: 1;
		display: grid;
	}
	&__image {
		grid-area: 1/1/2/2;
		object-fit: contain;
		height: 100%;
		aspect-ratio: 2777/1519;
		transition: opacity 0.5s ease, transform 0.5s ease;
		&:not(.active) {
			opacity: 0;
			transform: scale(0.95);
		}
		@media only screen and (min-width: $bp-md) {
			flex: 1;
		}
	}
	&__arrows {
		display: flex;
		gap: clamp(10px, 1.1vw, 18px);
		align-self: flex-end;
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__arrow {
		width: clamp(35px, 3.6vw, 55px);
		height: clamp(35px, 3.6vw, 55px);
		border-radius: 50%;
		border: 2px solid #fff;
		transition: border-color 0.3s, background-color 0.3s;
		@include flex-center;
		&:hover {
			border-color: $clr-secondary;
			background-color: #fff;
			.apartments__arrow-icon {
				fill: $clr-secondary;
			}
		}
		&-icon {
			width: clamp(12px, 1vw, 16px);
			fill: #fff;
			transition: fill 0.3s;
		}
		&--mobile {
			@media only screen and (min-width: $bp-md) {
				display: none;
			}
		}
	}
	&__details {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		row-gap: clamp(18px, 2vw, 30px);
	}
	&__detail {
		display: flex;
		flex-direction: column;
		gap: 6px;
		&-rooms {
			font-weight: 700;
			@media only screen and (max-width: $bp-md) {
				font-size: 22px;
				color: rgba(#fff, 0.5);
			}
		}
		&-area {
			@media only screen and (max-width: $bp-md) {
				font-size: 22px;
			}
		}
	}
	&__main {
		padding-inline: $layout-spacing;
		display: grid;
		grid-template-areas:
			'top carousel'
			'details carousel';
		@media only screen and (min-width: $bp-lg) {
			grid-template-columns: 1fr 1.5fr;
			grid-auto-rows: max-content 1fr;
			column-gap: clamp(50px, 7.3vw, 110px);
			row-gap: 17px;
		}
		@media only screen and (max-width: $bp-lg) {
			row-gap: 30px;
			grid-template-areas:
				'top'
				'carousel'
				'details';
		}
	}
	&__content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 17px;
		grid-area: details;
	}
	&__top {
		grid-area: top;
		display: flex;
		flex-direction: column;
		gap: 17px;
	}
	&__title {
		font-size: clamp(30px, 3vw, 45px);
		line-height: 1.2;
	}
	&__labels {
		font-weight: 600;
	}
	&__stars {
		height: clamp(75px, 9.4vw, 141.5px);
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__button {
		text-transform: uppercase;
		color: $clr-secondary;
		background-color: #fff;
		padding-block: clamp(20px, 1.4vw, 22px);
		font-weight: 700;
		box-shadow: 0px 10px 30px 0px #626262b1;
		font-size: clamp(12px, 1vw, 16px);
		transition: background-color 0.3s, color 0.3s;
		max-width: 300px;
		text-align: center;
		@media only screen and (max-width: $bp-md) {
			align-self: center;
			padding-inline: 65px;
			margin-top: 30px;
		}
		&:hover {
			background-color: $clr-secondary;
			color: #fff;
		}
	}
	&__star {
		width: clamp(150px, 18.8vw, 283px);
		fill: #fff;
		// position: absolute;
		// top: -15%;
		&:first-of-type {
			// left: -1%;
			transform: translate(-45%, -45%);
		}
		&:last-of-type {
			// right: -1%;
			float: right;
			transform: translate(45%, -45%);
		}
	}
}
.fade {
	&-enter-active,
	&-leave-active,
	&-move {
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
}
</style>
