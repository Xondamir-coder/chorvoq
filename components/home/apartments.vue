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
				<h2 class="apartments__title">{{ $t('home-apartments-title') }}</h2>
			</div>
			<div class="apartments__content">
				<ul class="apartments__details">
					<li class="apartments__detail" v-for="(detail, i) in details" :key="i">
						<span class="apartments__detail-rooms">{{ detail.room }}</span>
						<h3 class="apartments__detail-area">{{ detail.area }}</h3>
					</li>
				</ul>
				<button class="apartments__button">{{ $t('learn-more') }}</button>
			</div>
			<div class="apartments__carousel">
				<button class="apartments__arrow apartments__arrow--mobile">
					<IconsArrowLeft class="apartments__arrow-icon" />
				</button>
				<img
					src="~/assets/images/home-apartment.webp"
					alt="apartment example"
					width="683"
					height="374"
					class="apartments__image" />
				<button class="apartments__arrow apartments__arrow--mobile">
					<IconsArrowLeft class="apartments__arrow-icon rotate-180" />
				</button>
				<div class="apartments__arrows">
					<button class="apartments__arrow">
						<IconsArrowLeft class="apartments__arrow-icon" />
					</button>
					<button class="apartments__arrow">
						<IconsArrowLeft class="apartments__arrow-icon rotate-180" />
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const { t } = useI18n();
const details = computed(() => [
	{
		room: `1 ${t('gym')}`,
		area: '13.06'
	},
	{
		room: `2 ${t('bedroom')}`,
		area: '3.06'
	},
	{
		room: `1 ${t('gym')}`,
		area: '13.06'
	},
	{
		room: `2 ${t('bedroom')}`,
		area: '3.06'
	},
	{
		room: `2 ${t('gym')}`,
		area: '13.06'
	},
	{
		room: `1 ${t('gym')}`,
		area: '13.06'
	},
	{
		room: `2 ${t('bedroom')}`,
		area: '3.06'
	},
	{
		room: `1 ${t('gym')}`,
		area: '13.06'
	},
	{
		room: `2 ${t('bedroom')}`,
		area: '3.06'
	},
	{
		room: `2 ${t('gym')}`,
		area: '13.06'
	}
]);

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
	document.querySelectorAll(`${parentPrefix}__detail`).forEach((detail, i) => {
		GSAPAnimation(detail, {
			animProps: { y: 25 }
		});
	});
	GSAPAnimation(`${parentPrefix}__button`, {
		animProps: { scale: 0.8 }
	});
	GSAPAnimation(`${parentPrefix}__image`, {
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
	&__image {
		object-fit: contain;
		height: 100%;
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
</style>
