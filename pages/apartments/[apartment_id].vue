<template>
	<main class="apartment" :id="`apartment-${apartmentId}`">
		<div class="apartment__container">
			<div class="apartment__wrapper">
				<img :src="currentApartmentsImg" alt="floor plan" class="apartment__image" />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1724 1077">
					<NuxtLink
						v-for="path in currentApartmentsPaths"
						:key="path.apartmentId"
						:to="`/apartments/${path.apartmentId}`"
						active-class="apartment__link--active">
						<path :d="path.path" class="apartment__path" />
					</NuxtLink>
				</svg>
			</div>
			<img
				:src="currentApartmentImg"
				class="apartment__image"
				:alt="`${currentApartment.apartmentId} ${$t('apartment')}`" />
			<div class="apartment__main">
				<div class="apartment__top">
					<span class="apartment__labels">
						<span>{{ $t('phase') }}: {{ phaseId.padStart(2, '0') }}</span> /
						<span>{{ $t('block') }}: {{ blockId.padStart(2, '0') }}</span> /
						<span>{{ $t('floor') }}: {{ floorId.padStart(2, '0') }}</span> /
						<span>{{ $t('apartment') }}: {{ apartmentId.padStart(2, '0') }}</span>
					</span>
					<h2 class="apartment__title">
						{{ $t('apartment') }} № {{ apartmentId.padStart(2, '0') }}
						{{ $t('with-area') }} {{ Math.round(totalArea) }}
						{{ $t('m-squared') }}
					</h2>
				</div>
				<div class="apartment__content">
					<ul class="apartment__details">
						<li
							class="apartment__detail"
							v-for="(detail, i) in currentApartmentDetails"
							:key="i">
							<span class="apartment__detail-rooms">
								{{ detail[`key_${$i18n.locale}`] }}
							</span>
							<h3 class="apartment__detail-area">
								{{ detail.val }} {{ $t('m-squared') }}
							</h3>
						</li>
					</ul>
				</div>
				<button class="apartment__button" @click="generatePDF" disabled>
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
import { apartments, apartmentsSketches } from '~/assets/data/apartments';

const { t } = useI18n();
const route = useRoute();

const generatePDF = () => {};

// IDs
const floorId = ref();
const blockId = ref();
const phaseId = ref();

// Current apartment data
const apartmentId = computed(() => route.params.apartment_id);
const currentApartment = computed(() => apartments.find(a => a.apartmentId == apartmentId.value));
const totalArea = computed(() =>
	currentApartment.value?.details.reduce((sum, detail) => {
		const floatVal = parseFloat(detail.val.replace(',', '.'));
		if (detail.key_en == 'Terrace' || detail.key_en == 'Balcony') {
			return sum + floatVal / 3;
		}
		return sum + floatVal;
	}, 0)
);
const currentApartmentDetails = computed(() => currentApartment.value?.details);
const currentApartmentImg = computed(() => currentApartment.value?.img);

// Assigning IDs
if (import.meta.client) {
	phaseId.value = currentApartment.value.phaseId;
	blockId.value = currentApartment.value.blockId;
	floorId.value = currentApartment.value.floorId;
}

// Apartments sketch data
const currentApartments = computed(() =>
	apartmentsSketches.find(
		a => a.phaseId == phaseId.value && a.blockId == blockId.value && a.floorId == floorId.value
	)
);
const currentApartmentsImg = computed(() => currentApartments.value?.img);
const currentApartmentsPaths = computed(() => currentApartments.value?.paths?.paths);

useHead({
	title: `${t('apartment')} Nº${route.params.apartment_id}`
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
	&__image {
		object-fit: contain;
		aspect-ratio: 376/470;
	}
	&__main {
		display: flex;
		flex-direction: column;
		gap: min(2vw, 30px);
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
		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}
		&:hover:not(:disabled) {
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
		align-items: center;
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
