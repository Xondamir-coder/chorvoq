<template>
	<div class="modal">
		<div class="modal__image-container">
			<img
				:src="`${DOMAIN_URL}/${data.image}`"
				:alt="data[`name_${$i18n.locale}`]"
				class="modal__image" />
		</div>
		<div class="modal__content">
			<h3 class="modal__title">{{ data[`name_${$i18n.locale}`] }}</h3>
			<p class="modal__text">{{ data[`description_${$i18n.locale}`] }}</p>
			<div class="modal__buttons">
				<button class="modal__button" @click="emits('next')">
					{{ capitalize($t('next')) }}
				</button>
				<a href="tel:+998 71 202 22 22" class="modal__button">
					{{ capitalize($t('contact-us')) }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	data: Object
});
const emits = defineEmits(['next']);
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
		color: #545454;
		font-weight: 500;
		font-size: clamp(14px, 1.1vw, 16px);
	}
	&__title {
		color: #393939;
		font-size: clamp(18px, 1.4vw, 21px);
	}
	&__content {
		padding-left: 10px;
		padding-bottom: 17px;
		display: flex;
		flex-direction: column;
		gap: 10px;
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
		border-color: $clr-primary;
		font-size: 14px;
		font-weight: 500;
		&:first-child {
			background-color: $clr-primary;
			color: #fff;
			&:hover {
				background-color: #fff;
				color: $clr-primary;
			}
		}
		&:last-child {
			background-color: #fff;
			color: $clr-primary;
			&:hover {
				background-color: $clr-primary;
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
