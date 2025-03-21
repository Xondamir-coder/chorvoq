<template>
	<div class="modal">
		<div class="modal__image-container">
			<img :src="data.img" :alt="data.title" class="modal__image" />
		</div>
		<div class="modal__content">
			<h3 class="modal__title">{{ phase }}</h3>
			<p class="modal__text">{{ data.title }}</p>
			<div class="modal__buttons">
				<NuxtLink :to="`/plan/${phase}`" class="modal__button">
					{{ $t('next') }}
				</NuxtLink>
				<a href="tel:+998 71 202 22 22" class="modal__button">
					{{ $t('contact-us') }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	data: Object,
	phase: String
});
</script>

<style lang="scss" scoped>
.modal {
	background-color: #fff;
	position: fixed;
	right: 85px;
	bottom: 0;
	z-index: 10;
	width: clamp(350px, 31.2vw, 469px);
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: clamp(9px, 1.53vw, 23px);
	@media only screen and (max-width: $bp-md) {
		right: auto;
		left: 50%;
		transform: translateX(-50%);
	}
	&__text {
		color: $clr-grey;
		font-weight: 500;
		font-size: clamp(14px, 1.1vw, 16px);
	}
	&__title {
		color: #393939;
		font-size: clamp(18px, 1.4vw, 21px);
	}
	&__content {
		padding-left: clamp(10px, 1.86vw, 28px);
		padding-bottom: 17px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		@media only screen and (max-width: $bp-lg) {
			padding-bottom: 53px;
		}
	}
	&__buttons {
		display: flex;
		gap: 10px;
	}
	&__button {
		padding-block: 8px;
		padding-inline: 25px;
		transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s;
		border: 1px solid transparent;
		border-color: $clr-secondary;
		font-size: 14px;
		font-weight: 500;
		&:first-of-type {
			background-color: $clr-secondary;
			color: #fff;
			&:hover {
				background-color: #fff;
				color: $clr-secondary;
			}
		}
		&:last-of-type {
			background-color: #fff;
			color: $clr-secondary;
			&:hover {
				background-color: $clr-secondary;
				color: #fff;
			}
		}
	}
	&__image {
		&-container {
			display: flex;
			position: relative;
			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: #00000033;
			}
		}
	}
}
</style>
