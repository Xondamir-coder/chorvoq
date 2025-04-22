<template>
	<a
		href="tel:+998 71 202 22 22"
		class="tel"
		@click="orderCall"
		:class="{ 'tel--yellow': isYellow }">
		<div class="tel__circle">
			<IconsPhone class="tel__icon" />
		</div>
		<div class="tel__data">
			<h3 class="tel__title"><span style="opacity: 0.73">71</span> 202 22 22</h3>
			<p class="tel__text">{{ $t('order-call') }}</p>
		</div>
	</a>
</template>

<script setup>
const orderCall = () => {
	const content = `
	zxc
`;
	sendDataTelegram(content);
};

defineProps({
	isYellow: {
		defalt: false,
		type: Boolean
	}
});
</script>

<style lang="scss" scoped>
.tel {
	pointer-events: all;
	display: flex;
	z-index: 1;
	align-items: center;
	gap: 11px;

	&:hover:not(.tel--yellow) {
		.tel__circle {
			background-color: $clr-red;
		}
		.tel__icon {
			fill: #fff;
		}
	}
	&:hover.tel--yellow {
		.tel__circle {
			background-color: #fff;
		}
		.tel__icon {
			fill: $clr-primary;
		}
	}
	&.tel--yellow {
		color: $clr-primary;
		.tel__circle {
			background-color: $clr-primary;
		}
		.tel__icon {
			fill: #fff;
		}
	}
	&__circle {
		width: 32px;
		height: 32px;
		background-color: #fff;
		border-radius: 50%;
		transition: background-color 0.3s;

		@include flex-center;
	}
	&__text {
		font-size: 14px;
		opacity: 0.73;
	}
	&__icon {
		width: 16px;
		fill: $clr-red;
		transition: fill 0.3s;
	}
}
</style>
