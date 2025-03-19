<template>
	<section id="home-advantages" class="advantages">
		<VectorsStarGroupedPattern class="advantages__pattern" />
		<h2 class="section-title">{{ $t('advantages') }}</h2>
		<ul class="advantages__list">
			<li class="advantages__item" v-for="card in cards" :key="card.title">
				<div class="advantages__item-icontainer">
					<VectorsStarPattern class="advantages__item-icon" />
				</div>
				<h3 class="advantages__item-title">
					{{ card.title }}
				</h3>
				<p class="advantages__item-text">
					{{ card.text }}
				</p>
			</li>
		</ul>
	</section>
</template>

<script setup>
const { t } = useI18n();
const cards = computed(() => [
	{
		title: t('ecology'),
		text: t('home-advantages-1-text')
	},
	{
		title: t('security'),
		text: t('home-advantages-2-text')
	},
	{
		title: t('entertainment'),
		text: t('home-advantages-3-text')
	},
	{
		title: t('parking'),
		text: t('home-advantages-4-text')
	},
	{
		title: t('service'),
		text: t('home-advantages-5-text')
	},
	{
		title: t('pool'),
		text: t('home-advantages-6-text')
	}
]);

onMounted(() => {
	document.querySelectorAll('#home-advantages .advantages__item').forEach(item => {
		GSAPAnimation(item, {
			animProps: { y: 25, scale: 0.95 }
		});
	});
});
</script>

<style lang="scss" scoped>
.advantages {
	padding-inline: $layout-spacing;
	display: flex;
	flex-direction: column;
	gap: clamp(30px, 4vw, 60px);
	padding-top: clamp(50px, 6.4vw, 97px);
	position: relative;
	overflow: hidden;
	&__pattern {
		position: absolute;
		left: -10%;
		top: -10%;
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(clamp(300px, 27vw, 400px), 1fr));
		gap: 32px;
	}
	&__item {
		border: 1px solid rgba($clr-grey, 0.2);
		padding-inline: clamp(20px, 3vw, 44px);
		padding-block: clamp(25px, 2.1vw, 32px);
		transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
		&:hover {
			background-color: $clr-primary;
			border-color: transparent;
			box-shadow: 0px 10px 30px 0px rgba($clr-primary, 0.6);
			.advantages__item-title,
			.advantages__item-text {
				color: #f4f4f4;
			}
		}
		&-title {
			color: $clr-tertiary;
			font-weight: 700;
			font-size: clamp(22px, 1.86vw, 28px);
			line-height: 1.42;
			letter-spacing: -1px;
			margin-top: 16px;
			transition: color 0.3s;
		}
		&-text {
			margin-top: 4px;
			color: $clr-grey;
			transition: color 0.3s;
		}
		&-icontainer {
			width: 48px;
			height: 48px;
			background-color: #fbf6ea;
			border-radius: 8px;
			@include flex-center;
		}
		&-icon {
			width: 33px;
			fill: $clr-primary;
			opacity: 0.6;
		}
	}
}
</style>
