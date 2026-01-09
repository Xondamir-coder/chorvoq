import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
	if (import.meta.client) {
		const router = useRouter();
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(MotionPathPlugin);
		router.afterEach(() => {
			// Wait for DOM updates
			nextTick(() => {
				ScrollTrigger.refresh();
			});
		});
	}
	return {
		provide: {
			gsap
		}
	};
});
