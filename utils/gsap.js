export const defaultScrollTrigger = (trigger, options) => ({
	scrollTrigger: {
		trigger,

		// Default values
		start: '10% bottom',
		end: 'bottom 90%',
		scrub: 1,

		// You can override any ScrollTrigger options here
		...options
	}
});

export const GSAPAnimation = (trigger, { method = 'from', animProps, scrollTriggerOptions }) => {
	const { $gsap } = useNuxtApp();
	if (!$gsap) {
		console.error('GSAP instance not found in Nuxt app');
		return;
	}

	const validMethods = ['from', 'to'];
	if (!validMethods.includes(method)) {
		throw new Error(`Invalid GSAP method: ${method}`);
	}

	if (!trigger) {
		throw new Error('Trigger is required for GSAP animation');
	}

	$gsap[method](trigger, {
		// Default values
		opacity: method === 'from' ? 0 : 1,

		// You can override any GSAP options here
		...animProps,
		...defaultScrollTrigger(trigger, scrollTriggerOptions)
	});
};
