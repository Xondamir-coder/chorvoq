<template>
	<ModalContainer v-model="showModal">
		<div class="modal">
			<h2 class="modal__title">
				{{ $t('leave-enquiry') }}
			</h2>
			<form class="modal__form" @submit.prevent="orderCall">
				<input
					required
					v-model="name"
					class="modal__input"
					type="text"
					:placeholder="$t('your-name')" />
				<input
					required
					v-model="phone"
					class="modal__input"
					type="tel"
					:minlength="MAX_DIGITS"
					:maxlength="MAX_DIGITS"
					:placeholder="$t('your-tel')"
					@click="prependCountry"
					@focus="prependCountry"
					@input="validateInput" />
				<button
					class="modal__button"
					type="submit"
					:disabled="!name || !phone || phone.length !== MAX_DIGITS">
					<Spinner v-if="status === 'submitting'" />
					<span v-if="status === 'submit'">{{ $t('send-enquiry') }}</span>
					<span v-if="status === 'submitted'">{{ $t('sent-enquiry') }} ✅</span>
				</button>
			</form>
			<p class="modal__copyright">
				{{ $t('confirm-terms') }}
			</p>
		</div>
	</ModalContainer>
</template>

<script setup>
const showModal = defineModel();

const name = ref('');
const phone = ref('');
const status = ref('submit');

const COUNTRY_CODE = '+998 ';
const MAX_DIGITS = 17;
const LENGTHS_WITH_SPACE = [7, 11, 14];

const prependCountry = () => phone.value.includes(COUNTRY_CODE) || (phone.value = COUNTRY_CODE);
const validateInput = e => {
	// Validate
	const regex = /^[\d\s+]+$/;
	if (!regex.test(phone.value)) {
		phone.value = phone.value.slice(0, -1);
	}

	// Always prepend country
	if (phone.value.length < COUNTRY_CODE.length) {
		phone.value = COUNTRY_CODE;
	}

	// Don't add space on deletion
	if (e.inputType === 'deleteContentBackward') {
		return;
	}

	// Add spaces
	if (LENGTHS_WITH_SPACE.includes(phone.value.length)) {
		phone.value = `${phone.value} `;
	}
};
const orderCall = async () => {
	status.value = 'submitting';
	try {
		await useSendTelegram({ name: name.value, phone: phone.value });
		status.value = 'submitted';
	} catch (error) {
		console.error(error);
	} finally {
		name.value = '';
		phone.value = '';
		setTimeout(() => {
			status.value = 'submit';
		}, 2000);
	}
};
</script>

<style lang="scss" scoped>
@keyframes slide-from-bottom {
	from {
		opacity: 0;
		transform: translateY(15%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
.modal {
	color: #0f386b;
	background-color: #fff;
	padding-block: clamp(22px, 2.2vw, 38px);
	padding-inline: clamp(14px, 1.4vw, 26px);
	min-width: 344px;
	display: flex;
	flex-direction: column;
	gap: clamp(22px, 2.2vw, 40px);
	animation: slide-from-bottom 0.3s;
	&__copyright {
		font-size: 12px;
		font-weight: 500;
		max-width: 35ch;
		text-align: center;
		align-self: center;
	}
	&__input {
		background-color: #fffcf6;
		color: inherit;
		font-size: clamp(16px, 1.1vw, 20px);
		padding: 14px;
		font-weight: 500;
		border-bottom: 1px solid #0f386b;
	}
	&__title {
		font-size: clamp(22px, 1.7vw, 30px);
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}
	&__form {
		display: flex;
		flex-direction: column;
		gap: clamp(20px, 1.6vw, 30px);
	}
	&__button {
		background-color: $clr-primary;
		color: #fff;
		text-transform: uppercase;
		padding-block: clamp(12px, 1vw, 20px);
		font-size: 0.9rem;
		font-weight: 500;
		transition: background-color 0.3s, color 0.3s, opacity 0.3s;
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&:not(:disabled):hover {
			background-color: rgba($clr-primary, 0.1);
			color: $clr-primary;
		}
	}
}
</style>
