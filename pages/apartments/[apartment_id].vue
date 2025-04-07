<template>
	<main class="apartment">
		<div class="apartment__container">
			<div class="apartment__wrapper">
				<img :src="currentApartmentsImg" alt="floor plan" class="apartment__image" />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1765 1070">
					<NuxtLink
						v-for="path in currentApartmentsPaths"
						:key="path.apartmentId"
						:to="`/apartments/${path.apartmentId}`"
						active-class="apartment__link--active">
						<path :d="path.path" class="apartment__path" />
					</NuxtLink>
				</svg>
			</div>
			<VectorsApartment class="apartment__vector" />
			<div class="apartment__main">
				<div class="apartment__top">
					<span class="apartment__labels">
						<span>{{ $t('phase') }}: {{ phaseId }}</span> /
						<span>{{ $t('block') }}: {{ blockId }}</span> /
						<span>{{ $t('floor') }}: {{ floorId }}</span> /
						<span>{{ $t('apartment') }}: {{ apartmentId }}</span>
					</span>
					<h2 class="apartment__title">Квартира № 19 площадью 100 м²</h2>
				</div>
				<div class="apartment__content">
					<ul class="apartment__details">
						<li
							class="apartment__detail"
							v-for="(detail, i) in currentApartmentDetails"
							:key="i">
							<span class="apartment__detail-rooms">{{ detail.room }}</span>
							<h3 class="apartment__detail-area">
								{{ detail.area }} {{ $t('m-squared') }}
							</h3>
						</li>
					</ul>
				</div>
				<button class="apartment__button">
					{{ $t('print-to-pdf') }}
				</button>
			</div>
		</div>
		<div class="apartment__bottom">
			<a href="tel:+998 71 202 22 22" class="apartment__tel">
				<div class="apartment__tel-circle">
					<IconsPhone class="apartment__tel-icon" />
				</div>
				<div class="apartment__tel-data">
					<h3 class="apartment__tel-title">71 202 22 22</h3>
					<p class="apartment__tel-text">{{ $t('order-call') }}</p>
				</div>
			</a>
			<div class="apartment__social">
				<a target="_blank" href="https://telegram.org" class="apartment__social-item">
					<IconsTelegram class="apartment__social-icon" />
				</a>
				<a target="_blank" href="https://facebook.com" class="apartment__social-item">
					<IconsFacebookCircular class="apartment__social-icon" />
				</a>
				<a target="_blank" href="https://instagram.com" class="apartment__social-item">
					<IconsInstagram class="apartment__social-icon" />
				</a>
			</div>
		</div>
	</main>
</template>

<script setup>
import img1 from '~/assets/images/apartments/apartment-1.webp';
import img2 from '~/assets/images/apartments/apartment-2.webp';
import img3 from '~/assets/images/apartments/apartment-3.webp';
import img4 from '~/assets/images/apartments/apartment-4.webp';
import img5 from '~/assets/images/apartments/apartment-5.webp';
import img6 from '~/assets/images/apartments/apartment-6.webp';
import img7 from '~/assets/images/apartments/apartment-7.webp';

const { t } = useI18n();
const route = useRoute();

const images = [img1, img2, img3, img4, img5, img6, img7];
const floor1Paths = [
	{
		path: 'M 667.286 185.061 L 666.076 518.834 L 1010.733 523.671 L 1011.942 188.689 L 667.286 185.061 Z',
		apartmentId: '19'
	},
	{
		path: 'M 311.743 185.061 L 310.533 518.834 L 655.193 523.671 L 656.403 188.689 L 311.743 185.061 Z',
		apartmentId: '15'
	},
	{
		path: 'M 12.849 239.524 L 11.834 519.613 L 301.057 523.672 L 302.071 242.568 L 12.849 239.524 Z',
		apartmentId: '12'
	},
	{
		path: 'M 11.107 567.15 L 9.415 886.277 L 491.453 890.902 L 493.143 570.619 L 11.107 567.15 Z',
		apartmentId: '11'
	}
];
const paths = Array(7).fill(floor1Paths);

const currentApartmentsImg = ref();
const currentApartmentsPaths = ref();

const currentApartmentDetails = [
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
];

const apartmentId = ref(route.params.apartment_id);
const floorId = ref('');
const blockId = ref('');
const phaseId = ref('');

useHead({
	title: `${t('apartment')} Nº${route.params.apartment_id}`
});

onMounted(() => {
	const storageFloorId = +localStorage.getItem('floorId');

	currentApartmentsImg.value = images[storageFloorId - 1];
	currentApartmentsPaths.value = paths[storageFloorId - 1];

	blockId.value = localStorage.getItem('blockId') || 'N/A';
	phaseId.value = localStorage.getItem('phaseId') || 'N/A';
	floorId.value = storageFloorId;
});
</script>

<style lang="scss" scoped>
.apartment {
	background-image: url('~/assets/images/blur.png');
	background-repeat: no-repeat;
	background-size: cover;
	padding-inline: $layout-spacing;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding-block: 4vw;
	gap: 7vw;
	&__main {
		display: flex;
		flex-direction: column;
	}
	&__button {
		margin-top: auto;
		align-self: flex-start;
		background-color: $clr-primary;
		color: #fff;
		font-weight: 600;
		text-transform: uppercase;
		padding-block: 17px;
		padding-inline: 35px;
		font-size: 0.7rem;
		letter-spacing: 0.3px;
		transition: background-color 0.3s, color 0.3s;
		&:hover {
			background-color: #fff;
			color: $clr-primary;
		}
	}
	&__title {
		font-size: clamp(30px, 3vw, 45px);
		line-height: 1.2;
		color: $clr-secondary;
	}
	&__labels {
		color: $clr-secondary;
		font-weight: 700;
		font-size: 0.85rem;
		display: flex;
		gap: 16px;
		span {
			text-decoration: underline;
		}
	}
	&__top {
		display: flex;
		flex-direction: column;
		gap: 17px;
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
		color: $clr-primary;
		&-rooms {
			font-weight: 700;
			font-size: 0.85rem;
		}
		&-area {
			font-size: 0.9rem;
		}
	}
	&__content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 17px;
	}
	&__container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6vw;
	}
	&__link--active > * {
		fill: $clr-primary !important;
	}
	&__path {
		fill: rgba(255, 255, 255, 0.2);
		transition: fill 0.3s;
		&:hover {
			fill: rgba($clr-primary, 0.7);
		}
	}
	&__wrapper {
		align-self: center;
		display: grid;
		& > * {
			grid-area: 1/1/2/2;
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__tel {
		align-self: flex-start;
		gap: 11px;
		color: $clr-primary;
		display: grid;
		grid-template-columns: 1fr max-content;
		&:hover {
			.apartment__tel-circle {
				background-color: #fff;
			}
			.apartment__tel-icon {
				fill: $clr-primary;
			}
		}
		&-circle {
			background-color: $clr-primary;
			border-radius: 50%;
			transition: background-color 0.3s;
			aspect-ratio: 1;
			@include flex-center;
		}
		&-icon {
			width: 16px;
			fill: #fff;
			transition: fill 0.3s;
		}
		&-text {
			font-size: 14px;
			font-weight: 600;
		}
	}
	&__social {
		display: flex;
		gap: 6px;
		pointer-events: all;
		&-item {
			@include flex-center;
			background-color: $clr-primary;
			border-radius: 50%;
			width: 24px;
			aspect-ratio: 1;
			transition: background-color 0.3s;
			&:hover {
				background-color: #fff;
				.apartment__social-icon {
					fill: $clr-primary;
				}
			}
		}
		&-icon {
			width: 60%;
			fill: #fff;
			transition: fill 0.3s;
		}
	}
}
</style>
