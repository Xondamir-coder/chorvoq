<template>
	<div class="tooltip" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
		<svg
			width="200"
			height="200"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			class="tooltip__arrow">
			<polygon points="50,0 0,100 100,100" fill="white" stroke="#CAA564" stroke-width="10" />
		</svg>
		<div class="tooltip__item" v-for="item in items" :key="item.type">
			<h2 class="tooltip__title">{{ item.title }}</h2>
			<p class="tooltip__text">{{ item.type }}</p>
		</div>
		<div class="tooltip__pattern-container">
			<VectorsStarPattern class="tooltip__pattern" />
		</div>
	</div>
</template>

<script setup>
// Create a reactive object to store the cursor position
const position = ref({ x: 0, y: 0 });

// Function to update the position based on mouse movement
const updatePosition = e => {
	// Offset added so tooltip does not obscure the cursor
	position.value = { x: e.clientX + 10, y: e.clientY + 10 };
};

onMounted(() => {
	window.addEventListener('mousemove', updatePosition);
});

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', updatePosition);
});

defineProps({
	items: Array
});
</script>

<style lang="scss" scoped>
.tooltip {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
	background-color: #fff;
	padding: clamp(10px, 1vw, 16px);
	padding-right: clamp(20px, 2.2vw, 36px);
	transition: transform 0.3s, opacity 0.3s;
	border: 2px solid $clr-primary;
	box-shadow: 0px 0px 114px 0px #0000009f;

	&__pattern {
		transform: translate(40%, 40%);
		fill: rgba($clr-primary, 0.6);
		&-container {
			overflow: hidden;
			width: 70%;
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
	&__arrow {
		width: 20px;
		height: auto;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: translate(-100%, 6%) rotate(-90deg);
	}
	&__title {
		font-size: clamp(20px, 2vw, 35px);
		letter-spacing: 0.33px;
		color: #d4bb8a;
		font-weight: 700;
	}
	&__text {
		color: rgba(#8e734f, 0.4);
		font-weight: 700;
	}
}
</style>
