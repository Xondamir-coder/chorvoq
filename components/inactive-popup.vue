<template>
	<div class="popup__container" @click.self="$emit('close')">
		<div class="popup">
			<p class="popup__text">
				{{ $t('inactive-popup-text') }}
			</p>
			<button @click="$emit('close')" class="popup__button">OK</button>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.popup {
	display: flex;
	flex-direction: column;
	gap: clamp(10px, 1.2vw, 20px);
	background-color: #fff;
	padding: clamp(16px, 1.8vw, 32px);
	max-width: 400px;
	width: 100%;
	font-weight: 500;
	border-radius: clamp(8px, 1vw, 16px);

	&__button {
		background-color: $clr-primary;
		padding: clamp(10px, 0.8vw, 16px);
		color: #fff;
		border-radius: 4px;
		transition: background-color 0.3s, color 0.3s;
		font-size: clamp(16px, 1vw, 20px);
		&:hover {
			background-color: rgba($clr-primary, 0.2);
			color: $clr-primary;
		}
	}
	&__text {
		color: $clr-tertiary;
		text-align: center;
		font-size: clamp(18px, 1.1vw, 26px);
	}
	&__container {
		z-index: 101;
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(5px);
		@include grid-center;

		@media only screen and (max-width: $bp-md) {
			padding-inline: 16px;
		}
	}
}
</style>
