<template>
	<div class="menu">
		<VectorsLogo class="menu__logo" />
		<nav class="menu__nav">
			<a @click="navigateSection('#')" class="menu__link" href="/#">
				{{ $t('route-home') }}
			</a>
			<NuxtLink to="/plan" class="menu__link" @click="emits('close')">
				{{ $t('route-genplan') }}
			</NuxtLink>
			<a @click="navigateSection('#home-avenues')" href="/#home-avenues" class="menu__link">
				{{ $t('route-projects') }}
			</a>
			<a @click="navigateSection('#home-contact')" href="/#home-contact" class="menu__link">
				{{ $t('route-contacts') }}
			</a>
		</nav>
		<div class="menu__contacts">
			<p class="menu__contacts-label">Контактные данные</p>
			<a href="tel:+998 71 210 44 54" class="menu__contacts-tel">+998 71 210 44 54</a>
			<p class="menu__contacts-label">Пн-пт: 9:00–18:00</p>
		</div>
		<div class="menu__social">
			<a class="menu__social-item" href="https://telegram.org/" target="_blank">
				<IconsTelegram class="menu__icon" />
			</a>
			<a class="menu__social-item" href="https://instagram.com/" target="_blank">
				<IconsInstagram class="menu__icon" />
			</a>
			<a class="menu__social-item" href="https://facebook.com/" target="_blank">
				<IconsFacebook class="menu__icon" />
			</a>
		</div>
		<VectorsMenuPattern class="menu__pattern" />
	</div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { $lenis } = useNuxtApp();
const emits = defineEmits(['close']);

const navigateSection = to => {
	if (route.name !== 'index') router.push({ path: '/', hash: to === '#' ? '' : to });
	else $lenis.scrollTo(to === '#' ? 0 : to);
	emits('close');
};
</script>

<style lang="scss" scoped>
@keyframes slide-from-left {
	from {
		opacity: 0;
		transform: translateX(-30px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-right {
	from {
		opacity: 0;
		transform: translateX(30px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes slide-from-top {
	from {
		opacity: 0;
		transform: translateY(30px);
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
.menu {
	position: fixed;
	inset: 0;
	z-index: 1;
	height: 100vh;
	background: linear-gradient(162.18deg, $clr-primary 0%, #efe3cf 165.53%, #fffffe 222.18%);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding-left: $layout-spacing;
	padding-top: 23px;
	@media only screen and (min-width: $bp-md) {
		display: none;
	}
	&__icon {
		width: 20px;
		fill: #fff;
	}
	&__social {
		display: flex;
		gap: 40px;
		animation: slide-from-top 0.5s 0.8s backwards;

		&-item {
			&:last-child .menu__icon {
				width: 12px;
			}
		}
	}
	&__contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		animation: slide-from-top 0.5s 0.7s backwards;
		margin-bottom: 4vh;

		&-label {
			color: #ffffff4a;
			line-height: normal;
		}
		&-tel {
			font-size: 36px;
		}
	}
	&__logo {
		width: 153px;
		margin-bottom: auto;
		animation: scale-up 0.4s;
	}
	&__pattern {
		align-self: flex-end;
		width: 20vh;
		animation: slide-from-right 0.4s 1s backwards;
	}
	&__nav {
		display: flex;
		flex-direction: column;
		gap: 38px;
		margin-bottom: 4vh;
	}
	&__link {
		font-size: 28px;
		line-height: 1;
		letter-spacing: 1.25px;
		text-align: center;
		text-transform: uppercase;
		animation: 0.8s backwards;

		@for $i from 1 through 4 {
			&:nth-child(#{$i}) {
				animation-delay: 0.15s * $i + 0.05s;
				@if ($i % 2 == 0) {
					animation-name: slide-from-left;
				} @else {
					animation-name: slide-from-right;
				}
			}
		}
	}
}
</style>
