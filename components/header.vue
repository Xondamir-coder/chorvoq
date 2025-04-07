<template>
	<header class="header" :class="{ 'header--colorful': isColorful }">
		<div class="header__vectors">
			<VectorsLogo class="header__vector" v-if="!isColorful" />
			<VectorsLogoColored class="header__vector" v-else />
			<VectorsNbu class="header__vector" v-if="!isColorful" />
			<VectorsNbuColored class="header__vector" v-else />
			<VectorsDcity class="header__vector" v-if="!isColorful" />
			<VectorsDcityColored class="header__vector" v-else />
		</div>
		<button class="header__hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
			<IconsHamburger :class="{ active: !isMenuOpen }" />
			<IconsX :class="{ active: isMenuOpen }" />
		</button>
		<Transition name="fade">
			<Menu v-if="isMenuOpen" @close="toggleMenu" />
		</Transition>
		<VectorsLogo class="header__vector header__vector--center" />
		<nav class="nav">
			<a
				v-for="link in routingLinks"
				:key="link.to"
				:href="`/${link.to}`"
				class="nav__link"
				@click.prevent="navigateSection(link.to)">
				{{ link.label }}
			</a>
		</nav>
		<div class="header__cta">
			<div class="header__dropdown">
				<button class="header__locale">UZ <IconsArrowDown /></button>
			</div>
			<a href="tel:+998 71 210 44 54" class="header__call">
				<IconsPhone class="header__phone" />
			</a>
		</div>
		<div class="header__languages">
			<button
				class="header__language"
				v-for="(language, i) in languages"
				:key="language"
				@click="setLocale(language)">
				<span>{{ capitalize(language) }}</span>
				<span v-if="i != languages.length - 1">/</span>
			</button>
		</div>
	</header>
</template>

<script setup>
const { routingLinks, languages } = useConstants();
const { $lenis } = useNuxtApp();
const { setLocale } = useI18n();
const route = useRoute();
const router = useRouter();

const isMenuOpen = ref(false);
const isColorful = computed(
	() => route.name.includes('floors') || route.name.includes('apartments')
);

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
	isMenuOpen.value ? $lenis.stop() : $lenis.start();
};
const navigateSection = to => {
	if (route.name !== 'index') router.push({ path: '/', hash: to === '#' ? '' : to });
	else $lenis.scrollTo(to === '#' ? 0 : to);
};
</script>

<style lang="scss" scoped>
@keyframes slide-from-bottom {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes slide-from-left {
	from {
		opacity: 0;
		transform: translateX(-20px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-right {
	from {
		opacity: 0;
		transform: translateX(20px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-top {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes scale-up {
	from {
		opacity: 0;
		transform: scale(0.85);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
.nav {
	display: flex;
	gap: clamp(12px, 2vw, 30px);
	@media only screen and (max-width: $bp-md) {
		display: none;
	}
	&__link {
		transition: color 0.3s;
		animation: slide-from-top 0.3s backwards;
		@for $i from 1 through 7 {
			&:nth-child(#{$i}) {
				animation-delay: 0.05s * $i + 0.2s;
			}
		}
		&:hover {
			color: $clr-primary;
		}
	}
}
.header {
	backdrop-filter: blur(30px);
	background: #0000001a;
	border: 1px solid #ffffff26;
	position: fixed;
	z-index: 100;
	top: 0;
	right: 0;
	left: 0;
	padding-inline: $layout-spacing;
	padding-block: 23px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	font-size: 0.95rem;
	&--colorful {
		background-color: #f3f0ea;
		color: #000;
		position: static;
	}
	&__language {
		display: flex;
		gap: 4px;

		span:first-child {
			transition: color 0.3s;
		}
		&:hover span:first-child {
			color: $clr-primary;
		}
	}
	&__languages {
		display: flex;
		gap: 4px;
		animation: scale-up 0.3s 0.3s backwards;
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__vectors {
		display: flex;
		gap: clamp(16px, 2.5vw, 40px);
		@media only screen and (max-width: $bp-md) {
			display: none;
		}
	}
	&__locale {
		color: rgba(#fff, 0.8);
	}
	&__hamburger {
		@include grid-center;
		background-color: #fff;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		border: 1px solid transparent;
		transition: background-color 0.3s, border-color 0.3s;
		z-index: 3;
		animation: slide-from-left 0.3s;
		@media only screen and (min-width: $bp-md) {
			display: none;
		}
		&.active {
			background-color: transparent;
			border-color: #ffffff29;
		}
		& > * {
			grid-area: 1/1/2/2;
			transition: transform 0.3s;
			&:not(.active) {
				transform: scale(0);
			}
		}
	}
	&__cta {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 10px;
		animation: slide-from-right 0.3s;

		@media only screen and (min-width: $bp-md) {
			display: none;
		}
	}
	&__call {
		@include flex-center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: $clr-primary;
	}
	&__phone {
		width: 12px;
		height: 12px;
		fill: #fff;
	}
	&__vector {
		width: clamp(70px, 7.1vw, 108px);
		animation: slide-from-bottom 0.5s backwards;
		@for $i from 1 through 3 {
			&:nth-child(#{$i}) {
				animation-delay: 0.05s * $i;
			}
		}
		&--center {
			width: 115px;
			margin-left: 15px;
			animation: slide-from-top 0.3s !important;
			@media only screen and (min-width: $bp-md) {
				display: none;
			}
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
