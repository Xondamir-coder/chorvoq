<template>
	<main class="apartment" :id="`apartment-${route.params.apartment_id}`">
		<div class="apartment__container">
			<div class="apartment__box">
				<ButtonBack :to="`/floors/${floorNumber}?block_id=${blockId}`" />
				<div class="apartment__wrapper">
					<img
						:src="`${DOMAIN_URL}/${sketch?.floor?.schema}`"
						:key="`${DOMAIN_URL}/${sketch?.floor?.schema}`"
						alt="floor plan"
						class="apartment__image" />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1724 1077"
						:key="sketch?.apartments">
						<NuxtLink
							v-for="apartment in sketch?.apartments"
							:key="apartment?.id"
							:to="`/apartments/${apartment?.id}?block_id=${apartment.block_id}&floor_number=${apartment.floor}`"
							active-class="apartment__link--active"
							@click="charvakStore.setApartment(apartment)">
							<path :d="apartment?.path" class="apartment__path" />
						</NuxtLink>
					</svg>
				</div>
			</div>
			<img
				:src="`${DOMAIN_URL}/${apartment?.image}`"
				class="apartment__image apartment__image--apart"
				:alt="`${apartment?.id} ${$t('apartment')}`" />
			<div class="apartment__main">
				<div class="apartment__top">
					<span class="apartment__labels">
						<span>
							{{ $t('phase') }}:
							{{ formatNumber(apartment?.phase_id) }}
						</span>
						/
						<span>{{ $t('block') }}: {{ apartment?.block?.name ?? '0' }}</span>
						/
						<span>{{ $t('floor') }}: {{ formatNumber(apartment?.floor) }}</span>
						/
						<span>{{ $t('apartment') }}: {{ formatNumber(apartment?.unit) }}</span>
					</span>
					<h2 class="apartment__title">
						{{ $t('apartment') }} №
						{{ formatNumber(apartment?.unit) }}
						{{ $t('with-area') }} {{ apartment?.area }}
						{{ $t('m-squared') }}
					</h2>
				</div>
				<div class="apartment__content">
					<ul class="apartment__details">
						<li
							class="apartment__detail"
							v-for="(detail, i) in apartment?.details"
							:key="i">
							<span class="apartment__detail-rooms">
								{{ capitalize(detail[`key_${$i18n.locale}`]) }}
							</span>
							<h3 class="apartment__detail-area">
								{{ detail.val }} {{ $t('m-squared') }}
							</h3>
						</li>
					</ul>
				</div>
				<button class="apartment__button" @click="makePDF" :disabled="isDownloading">
					<span v-if="!isDownloading">{{ $t('print-to-pdf') }}</span>
					<Spinner v-if="isDownloading" />
				</button>
			</div>
		</div>
		<div class="apartment__bottom">
			<ButtonCall :is-yellow="true" />
			<div class="apartment__social">
				<a target="_blank" href="https://t.me/dreamcityuz" class="apartment__social-item">
					<IconsTelegram class="apartment__social-icon" />
				</a>
				<a
					target="_blank"
					href="https://www.facebook.com/dreamcity.uz?mibextid=wwXIfr&mibextid=wwXIfr"
					class="apartment__social-item">
					<IconsFacebookCircular class="apartment__social-icon" />
				</a>
				<a
					target="_blank"
					href="https://www.instagram.com/dreamcity.uz?igsh=cWd6ZjdsMXhzeDR1&utm_source=qr"
					class="apartment__social-item">
					<IconsInstagram class="apartment__social-icon" />
				</a>
			</div>
		</div>
	</main>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const charvakStore = useCharvakStore();

const isDownloading = ref(false);
const apartment = ref();

const sketch = computed(() => charvakStore.selectedSketch);
const unit = computed(() => apartment.value?.unit);

const blockId = computed(() => route.query.block_id ?? charvakStore.selectedApartment?.block?.id);
const floorNumber = computed(
	() => route.query.floor_number ?? charvakStore.selectedApartment?.floor
);

const formatNumber = number => (number ? String(number).padStart(2, '0') : '0');
const fetchApartment = async () => {
	try {
		const { data } = await useFetch(`${API_URL}/apartments`, {
			query: {
				block_id: blockId.value,
				floor_number: floorNumber.value,
				apartment_id: route.params.apartment_id
			}
		});
		apartment.value = data.value;
	} catch (error) {
		console.error(error);
	}
};
fetchApartment();

const makePDF = async () => {
	isDownloading.value = true;
	try {
		await generatePDF('/pdf', `${t('apartment').toLowerCase()}-${apartment.value?.unit}`, {
			block_id: blockId.value,
			floor_number: floorNumber.value,
			apartment_id: apartment.value?.unit
		});
	} finally {
		isDownloading.value = false;
	}
};

useHead({
	title: `${t('apartment')}`
});
</script>

<style lang="scss" scoped>
@keyframes slide-from-bottom {
	from {
		opacity: 0;
		transform: translateY(5px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes slide-from-top {
	from {
		opacity: 0;
		transform: translateY(-5px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes slide-from-left {
	from {
		opacity: 0;
		transform: translateX(-30px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes scale-up {
	from {
		opacity: 0;
		transform: scale(0.95);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
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
		&--apart {
			animation: scale-up 0.5s backwards 0.2s;
		}
	}
	&__main {
		display: flex;
		flex-direction: column;
		gap: min(2vw, 30px);
	}
	&__button {
		min-width: 60%;
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
			cursor: not-allowed;
			opacity: 0.7;
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
		animation: slide-from-left 0.3s 0.3s backwards;
	}
	&__labels {
		color: $clr-secondary;
		font-weight: 700;
		font-size: 0.85rem;
		display: flex;
		gap: 16px;
		span {
			text-decoration: underline;
			@for $i from 1 through 4 {
				&:nth-child(#{$i}) {
					animation: 0.3s backwards 0.3s;
					@if ($i % 2 == 0) {
						animation-name: slide-from-bottom;
					} @else {
						animation-name: slide-from-top;
					}
				}
			}
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
		@for $i from 1 through 20 {
			&:nth-child(#{$i}) {
				animation: 0.3s backwards;
				animation-delay: (0.05s * $i) + 0.2s;
				@if ($i % 2 == 0) {
					animation-name: slide-from-bottom;
				} @else {
					animation-name: slide-from-top;
				}
			}
		}
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
	&__box {
		display: flex;
		flex-direction: column;
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
.scale {
	&-enter-active,
	&-leave-active,
	&-move {
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
		transform: scale(0.85);
	}
}
</style>
