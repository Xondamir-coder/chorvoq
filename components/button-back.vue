<template>
	<NuxtLink class="back" :to="to">
		<svg viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="back__icon">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M11.5501 2.83899H11.5601H2.2101L3.8901 1.06199C4.06357 0.878502 4.06357 0.591487 3.8901 0.407995L3.6301 0.131995C3.54976 0.0463276 3.43755 -0.00227356 3.3201 -0.00227356C3.20265 -0.00227356 3.09044 0.0463276 3.0101 0.131995L0.1301 3.17099C-0.0433666 3.35449 -0.0433666 3.6415 0.1301 3.82499L3.0101 6.86399C3.09059 6.94939 3.20275 6.9978 3.3201 6.9978C3.43745 6.9978 3.54961 6.94939 3.6301 6.86399L3.8901 6.58799C3.97261 6.49937 4.01898 6.38308 4.0201 6.26199C4.01895 6.14269 3.97248 6.0283 3.8901 5.94199L2.1901 4.15599H11.5601C11.8105 4.14308 12.0053 3.93364 12.0001 3.68299V3.29999C12.0023 3.04875 11.8013 2.84283 11.5501 2.83899Z"
				fill="inherit" />
		</svg>
		<span>{{ $t('back') }}</span>
	</NuxtLink>
</template>

<script setup>
defineProps({
	to: String
});
</script>

<style scoped lang="scss">
.back {
	align-self: flex-start;
	cursor: pointer;
	color: $clr-primary;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: min(15px, 1vw);
	&:hover svg {
		transform: translateX(-5px);
	}
	&__icon {
		width: 12px;
		fill: $clr-primary;
		transition: transform 0.3s;
	}
}
</style>
