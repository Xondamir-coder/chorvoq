<template>
	<main class="floor">
		<div class="floor__container">
			<nav class="floor__buttons">
				<NuxtLink
					class="floor__button"
					v-for="floor in floors"
					:key="floor"
					@click="navigateToFloor(floor)"
					:class="{ active: floor == $route.params.floor_id }">
					<div class="floor__button-num">
						{{ floor }}
					</div>
					<div class="floor__button-content">
						<span class="floor__button-floor">{{ $t('floor') }}</span>
						<span class="floor__button-block">
							{{ blockName }} {{ $t('block').toLowerCase() }}
						</span>
					</div>
				</NuxtLink>
			</nav>
			<div class="floor__center">
				<ButtonBack :to="`/buildings/${charvakStore.selectedBuilding?.id}`" />
				<div class="floor__wrapper">
					<ClientOnly>
						<Transition name="fade">
							<img
								:src="schemaImg"
								alt="floor plan"
								class="floor__image"
								:key="schemaImg" />
						</Transition>
						<Transition name="fade">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1724 1077"
								:key="apartments">
								<NuxtLink
									v-for="apartment in apartments"
									:key="apartment?.id"
									:to="`/apartments/${apartment?.id}?block_id=${apartment.block_id}&floor_number=${apartment.floor}`"
									@click="charvakStore.setApartment(apartment)">
									<path :d="apartment?.path" class="floor__path"></path>
								</NuxtLink>
							</svg>
						</Transition>
					</ClientOnly>
				</div>
			</div>
		</div>
		<button class="floor__cta" disabled>
			{{ $t('print-to-pdf') }}
		</button>
		<div class="floor__bottom">
			<a href="tel:+998 71 202 22 22" class="floor__tel">
				<div class="floor__tel-circle">
					<IconsPhone class="floor__tel-icon" />
				</div>
				<div class="floor__tel-data">
					<h3 class="floor__tel-title">71 202 22 22</h3>
					<p class="floor__tel-text">{{ $t('order-call') }}</p>
				</div>
			</a>
			<div class="floor__social">
				<a target="_blank" href="https://telegram.org" class="floor__social-item">
					<IconsTelegram class="floor__social-icon" />
				</a>
				<a target="_blank" href="https://facebook.com" class="floor__social-item">
					<IconsFacebookCircular class="floor__social-icon" />
				</a>
				<a target="_blank" href="https://instagram.com" class="floor__social-item">
					<IconsInstagram class="floor__social-icon" />
				</a>
			</div>
		</div>
	</main>
</template>

<script setup>
const charvakStore = useCharvakStore();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const floors = [7, 6, 5, 4, 3, 2, 1];

const floor = ref({});
const apartments = ref([]);

const blockName = computed(() => charvakStore.selectedFloor?.block?.name);
const schemaImg = computed(() => `${DOMAIN_URL}/${floor.value?.schema}`);

const fetchData = async () => {
	try {
		const { data } = await useFetch(`${API_URL}/floors`, {
			query: {
				block_id: route.query.block_id || charvakStore.selectedFloor?.block?.id,
				floor_number: route.params.floor_id
			}
		});
		apartments.value = data.value?.apartments;
		floor.value = data.value?.floor;

		charvakStore.setSketch({
			floor: floor.value,
			apartments: apartments.value
		});
	} catch (error) {
		console.error(error);
	}
};
fetchData();

const navigateToFloor = floorNum => {
	router.push({
		path: `/floors/${floorNum}`,
		query: { block_id: route.params.block_id || charvakStore.selectedFloor?.block?.id }
	});
};

useHead({
	title: t('apartments')
});
</script>

<style scoped lang="scss">
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
@keyframes animate-border-color {
	from {
		border: 1px solid transparent;
	}
	to {
		border: 1px solid $clr-secondary-darkest;
	}
}
.floor {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-image: url('~/assets/images/blur.png');
	background-repeat: no-repeat;
	background-size: cover;
	gap: 18px;
	padding-inline: $layout-spacing;
	justify-content: center;
	padding-block: 40px;
	&__image {
		aspect-ratio: 1.6;
		align-self: center;
		object-fit: contain;
		animation: slide-from-bottom 0.3s;
	}
	&__center {
		display: flex;
		flex-direction: column;
		width: 70%;
		margin-inline: auto;
	}
	&__path {
		fill: rgba(255, 255, 255, 0.2);
		transition: fill 0.3s;
		&:hover {
			fill: rgba($clr-primary, 0.7);
		}
	}
	&__wrapper {
		width: 80%;
		align-self: center;
		display: grid;
		padding-right: 7%;
		& > * {
			grid-area: 1/1/2/2;
		}
	}
	&__cta {
		margin-top: 3vw;
		align-self: center;
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
	&__bottom {
		display: flex;
		justify-content: space-between;
	}
	&__social {
		align-self: center;
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
				.floor__social-icon {
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
	&__tel {
		align-self: flex-start;
		gap: 11px;
		color: $clr-primary;
		display: grid;
		grid-template-columns: 1fr max-content;
		&:hover {
			.floor__tel-circle {
				background-color: #fff;
			}
			.floor__tel-icon {
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
	&__container {
		display: flex;
	}
	&__buttons {
		display: flex;
		gap: 20px;
		flex-direction: column;
	}
	&__button {
		cursor: pointer;
		color: $clr-secondary-darkest;
		display: flex;
		gap: 9px;
		&.active {
			.floor__button-content {
				animation: slide-from-bottom 0.3s forwards;
			}
			.floor__button-num {
				animation: animate-border-color 0.3s forwards;
			}
		}
		& > * {
			font-weight: 700;
		}
		&-floor {
			text-transform: lowercase;
		}
		&-block {
			color: #7b7b99;
		}
		&-content {
			opacity: 0;
			align-self: flex-end;
			display: flex;
			flex-direction: column;
			font-size: min(0.9vw, 14px);
			line-height: 1.1;
		}
		&-num {
			@include flex-center;
			width: min(2.5vw, 40px);
			aspect-ratio: 1;
			border-radius: 50%;
			border: 1px solid transparent;
			box-shadow: 0px 1px 10px 0px rgba(255, 255, 255, 0.33) inset;
			font-weight: 700;
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
