<template>
	<section class="message" id="home-message">
		<div class="message__map">
			<iframe
				class="message__map-iframe"
				src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5992.9726580383785!2d69.243385!3d41.320037!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzEyLjEiTiA2OcKwMTQnMzYuMiJF!5e0!3m2!1sen!2s!4v1743761625160!5m2!1sen!2s"
				style="border: 0"
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
			<h2 class="message__title">{{ $t('home-message-title') }}</h2>
		</div>
		<div class="message__content">
			<ul class="message__cols">
				<li class="message__col">
					<span class="message__col-label">
						{{ $t('opening-hours') }}
					</span>
					<h3 class="message__col-title">
						{{ $t('everyday') }}
						<br />
						9:00 - 20:00
					</h3>
					<p class="message__col-text">{{ $t('home-message-qa') }}</p>
				</li>
				<li class="message__col">
					<span class="message__col-label">
						{{ $t('contacts') }}
					</span>
					<a href="tel:+998 71 202 22 22" class="message__col-title">+998 71 202 22 22</a>
					<a href="mailto:Chorvoqdarvozasi@gmail.com" class="message__col-text">
						Chorvoqdarvozasi@gmail.com
					</a>
				</li>
			</ul>
			<form @submit.prevent="submitForm" class="message__form">
				<input
					required
					v-model="name"
					class="message__input"
					type="text"
					:placeholder="$t('your-name')" />
				<input
					required
					v-model="tel"
					class="message__input"
					type="tel"
					:minlength="MAX_DIGITS"
					:maxlength="MAX_DIGITS"
					:placeholder="$t('your-tel')"
					@input="validateInput"
					@click="prependCountry"
					@focus="prependCountry" />
				<button
					class="message__button"
					type="submit"
					:disabled="
						status === 'sending' || status === 'success' || tel.length !== MAX_DIGITS
					">
					<span v-if="status === 'awaiting'">{{ $t('order-call') }}</span>
					<Spinner v-if="status === 'sending'" />
					<span v-if="status === 'success'">{{ $t('call-ordered') }} ✅</span>
				</button>
			</form>
		</div>
	</section>
</template>

<script setup>
const name = ref('');
const tel = ref('');
const status = ref('awaiting');

const COUNTRY = '+998 9';
const MAX_DIGITS = 6 + 11;
const LENGTHS_WITH_SPACE = [7, 11, 14];

const validateInput = e => {
	// Validate
	const regex = /^[\d\s+]+$/;
	if (!regex.test(tel.value)) {
		tel.value = tel.value.slice(0, -1);
	}

	// Always prepend country
	if (tel.value.length < 7) {
		tel.value = COUNTRY;
	}

	// Don't add space on deletion
	if (e.inputType === 'deleteContentBackward') {
		return;
	}

	// Add spaces
	if (LENGTHS_WITH_SPACE.includes(tel.value.length)) {
		tel.value = `${tel.value} `;
	}
};
const submitForm = async () => {
	const content = `
Имя: ${name.value}
Телефон: ${tel.value}
`;
	status.value = 'sending';
	try {
		await useSendTelegram(content);
		status.value = 'success';
	} catch (error) {
		console.error(error);
	} finally {
		name.value = '';
		tel.value = '';
		setTimeout(() => {
			status.value = 'awaiting';
		}, 2000);
	}
};
const prependCountry = () => (!tel.value.includes(COUNTRY) ? (tel.value = COUNTRY) : null);

onMounted(() => {
	const parentPrefix = '#home-message .message';
	GSAPAnimation(`${parentPrefix}__map`, {
		animProps: { x: -25 }
	});
	GSAPAnimation(`${parentPrefix}__content`, {
		animProps: { x: 25 }
	});
});
</script>

<style lang="scss" scoped>
.message {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	padding-inline: $layout-spacing;
	margin-block: 100px;
	gap: clamp(30px, 5.3vw, 80px);
	overflow: hidden;
	&__map {
		display: grid;
		&-iframe {
			width: 100%;
			height: 100%;

			@media only screen and (max-width: $bp-md) {
				aspect-ratio: 440/425;
			}
		}
		& > * {
			grid-area: 1/1/2/2;
		}
	}
	&__button {
		background-color: $clr-primary;
		color: #fff;
		font-size: clamp(16px, 1.3vw, 20px);
		font-weight: 500;
		margin-top: 12px;
		padding-block: 16px;
		transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
		&:disabled {
			opacity: 0.7;
		}
		&:hover:not(:disabled) {
			background-color: #fff;
			color: $clr-primary;
			box-shadow: 0px 10px 30px 0px rgba($clr-primary, 0.2);
		}
	}
	&__col {
		display: flex;
		flex-direction: column;
		z-index: 2;
		position: relative;
		&-title {
			line-height: 1.5;
			font-weight: 600;
			font-size: clamp(16px, 1.3vw, 20px);
		}
		&-label {
			font-size: 0.85rem;
			padding-bottom: 6px;
			opacity: 0.6;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			margin-bottom: 16px;
		}
		&-text {
			opacity: 0.6;
			font-size: 0.95rem;
			@media only screen and (max-width: $bp-md) {
				margin-top: 10px;
			}
		}
	}
	&__input {
		padding: clamp(16px, 1.3vw, 20px);
		border-radius: 2px;
		border: 1px solid #6d6e7680;
		line-height: normal;
		font-size: 16px;
		font-weight: 500;
		transition: border-color 0.3s;
		&:focus {
			border-color: $clr-primary;
		}
	}
	&__cols {
		background-image: url('~/assets/images/home-restaurant-hotel.avif');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(40px, 6vw, 90px);
		padding: clamp(10px, 3.3vw, 50px);
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
		}
	}
	&__form {
		color: $clr-tertiary;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	&__content {
		display: flex;
		flex-direction: column;
		gap: clamp(26px, 2.1vw, 32px);
	}
	&__title {
		background-color: #fff;
		place-self: flex-end;
		font-weight: 700;
		font-size: clamp(22px, 2.5vw, 38px);
		line-height: 1.68;
		letter-spacing: -2px;
		color: $clr-primary;
		padding-block: 17px;
		padding-inline: 40px;
		@media only screen and (max-width: $bp-md) {
			justify-self: center;
			padding-block: 12px;
		}
	}
}
</style>
