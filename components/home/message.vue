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
						{{ $t('monday') }} - {{ $t('friday') }}
						<br />
						9:00 - 20:00
					</h3>
					<p class="message__col-text">{{ $t('home-message-qa') }}</p>
				</li>
				<li class="message__col">
					<span class="message__col-label">
						{{ $t('contacts') }}
					</span>
					<a href="tel:020 7993 2905" class="message__col-title"> 020 7993 2905 </a>
					<a href="mailto:hello@finsweet.com" class="message__col-text">
						hello@finsweet.com
					</a>
				</li>
			</ul>
			<form @submit.prevent="submitForm" class="message__form">
				<input
					required
					v-model="name"
					class="message__input"
					type="text"
					name="name"
					id="input-name"
					placeholder="Ваше имя" />
				<textarea
					required
					v-model="message"
					class="message__input"
					name="message"
					id="input-message"
					placeholder="Ваше сообщение"
					rows="1"></textarea>
				<button class="message__button" type="submit">{{ $t('send-message') }}</button>
			</form>
		</div>
	</section>
</template>

<script setup>
const name = ref('');
const message = ref('');

const submitForm = () => {
	console.log(name.value, message.value);
};

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
		&:hover {
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
