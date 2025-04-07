<template>
	<main class="floor">
		<div class="floor__container">
			<nav class="floor__buttons">
				<NuxtLink
					class="floor__button"
					v-for="floor in floors"
					:key="floor"
					@click="navigateToFloor(floor)"
					:class="{ active: floor == $route.params.floor_id }">
					<div class="floor__button-num">
						{{ floor }}
					</div>
					<div class="floor__button-content">
						<span class="floor__button-floor">{{ $t('floor') }}</span>
						<span class="floor__button-block">
							{{ blockId }} {{ $t('block').toLowerCase() }}
						</span>
					</div>
				</NuxtLink>
			</nav>
			<div class="floor__wrapper">
				<img :src="currentImg" alt="floor plan" class="floor__image" />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1724 1077">
					<NuxtLink
						v-for="path in currentPaths"
						:key="path.apartmentId"
						:to="`/apartments/${path.apartmentId}`">
						<path :d="path.path" class="floor__path"></path>
					</NuxtLink>
				</svg>
			</div>
		</div>
		<button class="floor__cta">
			{{ $t('print-to-pdf') }}
		</button>
		<div class="floor__bottom">
			<a href="tel:+998 71 202 22 22" class="floor__tel">
				<div class="floor__tel-circle">
					<IconsPhone class="floor__tel-icon" />
				</div>
				<div class="floor__tel-data">
					<h3 class="floor__tel-title">71 202 22 22</h3>
					<p class="floor__tel-text">{{ $t('order-call') }}</p>
				</div>
			</a>
			<div class="floor__social">
				<a target="_blank" href="https://telegram.org" class="floor__social-item">
					<IconsTelegram class="floor__social-icon" />
				</a>
				<a target="_blank" href="https://facebook.com" class="floor__social-item">
					<IconsFacebookCircular class="floor__social-icon" />
				</a>
				<a target="_blank" href="https://instagram.com" class="floor__social-item">
					<IconsInstagram class="floor__social-icon" />
				</a>
			</div>
		</div>
	</main>
</template>

<script setup>
import img1 from '~/assets/images/apartments/apartment-1.webp';
import img2 from '~/assets/images/apartments/apartment-2.webp';
import img3 from '~/assets/images/apartments/apartment-3.webp';
import img4 from '~/assets/images/apartments/apartment-4.webp';
import img5 from '~/assets/images/apartments/apartment-5.webp';
import img6 from '~/assets/images/apartments/apartment-6.webp';
import img7 from '~/assets/images/apartments/apartment-7.webp';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const blockId = ref('');
const floors = [7, 6, 5, 4, 3, 2, 1];

onMounted(() => {
	blockId.value = localStorage.getItem('blockId');
});

// Floor stuff
const floorPaths1 = [
	{
		path: 'M 4.124 243.794 L 5.37 540.289 L 311.831 539.043 L 308.094 245.04 L 4.124 243.794 Z',
		apartmentId: '19'
	},
	{
		path: 'M 299.995 192.716 L 301.478 534.616 L 666.252 533.18 L 661.804 194.153 L 299.995 192.716 Z',
		apartmentId: '15'
	},
	{
		path: 'M 643.61 190.67 L 645.023 541.726 L 992.417 540.252 L 988.187 192.145 L 643.61 190.67 Z',
		apartmentId: '12'
	},
	{
		path: 'M 15.336 572.947 L 102.54 577.93 L 103.786 610.32 L 151.125 610.32 L 152.371 651.431 L 213.414 646.448 L 214.66 612.812 L 486.24 611.566 L 486.24 901.832 L 12.844 899.341',
		apartmentId: '11'
	}
];
const floorPaths2 = [
	{
		path: 'M 815.281 117.189 L 815.281 81.427 L 848.875 81.427 L 848.875 47.942 L 994.815 47.942 L 994.815 121.89 L 994.815 774.394 L 842.447 774.394 L 840.78 584.192 L 840.78 521.05 L 800.276 521.05 L 800.276 468.229 L 820.12 468.229 L 820.12 122.908 L 815.281 117.189 Z',
		apartmentId: '19'
	},
	{
		path: 'M 641.692 523.89 L 641.692 118.982 L 635.338 112.652 L 635.338 48.556 L 800.999 48.556 L 800.999 78.773 L 828.151 78.773 L 813.24 117.944 L 813.24 477.646 L 802.652 476.708 L 802.652 519.537 L 741.741 519.537 L 741.741 523.89 L 646.775 523.89 L 641.692 523.89 Z',
		apartmentId: '19'
	},
	{
		path: 'M 657.303 522.87 L 657.303 126.599 L 654.93 121.419 L 654.93 53.848 L 503.063 53.848 L 503.063 88.263 L 481.197 88.263 L 481.197 125.678 L 475.9 477.713 L 466.366 477.713 L 466.366 515.417 L 562.343 515.417 L 562.343 523.889 L 657.303 523.889 L 657.303 522.87 Z',
		apartmentId: '19'
	},
	{
		path: 'M 303.922 527.173 L 303.922 128.605 L 292.48 123.395 L 292.48 55.433 L 458.205 55.433 L 458.205 90.048 L 485.367 90.048 L 485.367 127.679 L 485.367 481.752 L 470.451 481.752 L 470.451 519.675 L 398.924 519.675 L 398.924 528.195 L 303.922 528.195 L 303.922 527.173 Z',
		apartmentId: '19'
	},
	{
		path: 'M -6.11 109.99 L -6.11 111.06 L -6.11 275.666 L -1.833 275.666 L -1.833 391.005 L -1.833 523.156 L 153.344 523.156 L 225.576 523.156 L 311.527 523.156 L 311.527 184.811 L 199.242 184.811 L 199.242 109.99 L -6.11 109.99 Z',
		apartmentId: '19'
	},
	{
		path: 'M 10.515 576.689 L 8.264 953.556 L 4.093 959.069 L 3.683 1027.53 L 200.434 1027.53 L 200.876 953.556 L 303.717 953.556 L 311.081 834.836 L 312.404 613.211 L 222.713 613.211 L 222.444 658.452 L 153.167 658.452 L 153.432 614.089 C 153.435 613.503 100.022 614.089 100.022 614.089 L 100.246 576.689 L 10.515 576.689 Z',
		apartmentId: '19'
	},
	{
		path: 'M 308.283 613.502 L 308.283 951.133 L 306.124 951.133 L 306.124 1024.3 L 490.901 1024.3 L 490.901 951.036 L 646.703 951.036 L 643.221 900.704 L 643.221 612.629 L 341.148 612.629 L 308.283 613.502 Z',
		apartmentId: '19'
	}
];
const floorPaths3 = [
	{
		path: 'M 816.179 118.412 L 816.179 82.446 L 849.372 82.446 L 849.372 48.771 L 993.587 48.771 L 993.587 123.091 L 993.587 779.326 L 843.023 779.326 L 841.375 588.064 L 841.375 524.515 L 801.313 524.515 L 801.313 471.395 L 820.962 471.395 L 820.962 124.163 L 816.179 118.412 Z',
		apartmentId: '19'
	},
	{
		path: 'M 652.19 524.077 L 652.19 125.089 L 646.162 118.851 L 646.162 55.691 L 803.32 55.691 L 803.32 85.517 L 829.038 85.517 L 814.934 124.113 L 814.934 478.558 L 804.889 477.582 L 804.889 519.836 L 747.064 519.836 L 747.064 524.077 L 657.013 524.077 L 652.19 524.077 Z',
		apartmentId: '19'
	},
	{
		path: 'M 646.404 523.052 L 646.404 124.113 L 644.155 118.851 L 644.155 50.818 L 500.095 50.818 L 500.095 85.517 L 479.4 85.517 L 479.4 123.139 L 474.377 477.582 L 465.336 477.582 L 465.336 515.547 L 556.353 515.547 L 556.353 524.077 L 646.404 524.077 L 646.404 523.052 Z',
		apartmentId: '19'
	},
	{
		path: 'M 307.415 520.176 L 307.415 121.239 L 296.565 115.975 L 296.565 47.942 L 453.723 47.942 L 453.723 82.641 L 479.481 82.641 L 479.481 120.264 L 479.481 474.709 L 465.336 474.709 L 465.336 512.672 L 397.507 512.672 L 397.507 521.201 L 307.415 521.201 L 307.415 520.176 Z',
		apartmentId: '19'
	},
	{
		path: 'M -0.799 104.425 L -0.799 105.497 L -0.799 270.609 L 3.245 270.609 L 3.245 386.352 L 3.245 518.861 L 150.537 518.861 L 219.091 518.861 L 300.663 518.861 L 300.663 179.476 L 194.056 179.476 L 194.056 104.425 L -0.799 104.425 Z',
		apartmentId: '19'
	},
	{
		path: 'M 11.334 572.274 L 11.334 949.439 L 7.23 954.96 L 7.23 1023.45 L 202.054 1023.45 L 202.054 949.439 L 303.879 949.439 L 310.429 830.624 L 310.429 608.859 L 221.663 608.859 L 221.663 654.128 L 153.07 654.128 L 153.07 609.717 C 153.07 609.152 100.188 609.717 100.188 609.717 L 100.188 572.274 L 11.334 572.274 Z',
		apartmentId: '19'
	},
	{
		path: 'M 318.225 603.527 L 304.682 951.436 L 300.583 956.963 L 300.583 1025.45 L 495.394 1025.45 L 495.394 951.436 L 644.155 951.436 L 644.155 603.527 L 441.226 603.527 L 318.225 603.527 Z',
		apartmentId: '19'
	}
];
const floorPaths4 = [
	{
		path: 'M 957.982 123.5 L 957.982 87.549 L 996.71 87.549 L 996.71 53.888 L 1164.97 53.888 L 1164.97 128.225 L 1163.05 529.478 L 987.377 529.478 L 940.682 529.478 L 940.682 476.38 L 963.562 476.38 L 963.562 129.248 L 957.982 123.5 Z',
		apartmentId: '19'
	},
	{
		path: 'M 766.65 528.991 L 766.65 130.222 L 759.617 123.987 L 759.617 60.853 L 942.98 60.853 L 942.98 90.618 L 973.032 90.618 L 956.529 129.199 L 956.529 483.492 L 944.808 482.567 L 944.808 524.752 L 877.39 524.752 L 877.39 528.991 L 772.276 528.991 L 766.65 528.991 Z',
		apartmentId: '19'
	},
	{
		path: 'M 759.899 528.016 L 759.899 129.199 L 757.274 123.987 L 757.274 55.983 L 589.242 55.983 L 589.242 90.618 L 565.05 90.618 L 565.05 128.225 L 559.191 482.567 L 548.641 482.567 L 548.641 520.514 L 654.832 520.514 L 654.832 528.991 L 759.899 528.991 L 759.899 528.016 Z',
		apartmentId: '19'
	},
	{
		path: 'M 364.389 525.142 L 364.389 126.325 L 351.731 121.113 L 351.731 53.109 L 535.092 53.109 L 535.092 87.744 L 565.145 87.744 L 565.145 125.35 L 565.145 479.693 L 548.641 479.693 L 548.641 517.64 L 469.502 517.64 L 469.502 526.117 L 364.389 526.117 L 364.389 525.142 Z',
		apartmentId: '19'
	},
	{
		path: 'M 4.792 109.567 L 4.792 110.591 L 4.792 275.68 L 9.527 275.68 L 9.527 391.326 L 9.527 523.827 L 181.356 523.827 L 261.339 523.827 L 356.513 523.827 L 356.513 184.586 L 232.177 184.586 L 232.177 109.567 L 4.792 109.567 Z',
		apartmentId: '19'
	},
	{
		path: 'M 18.951 577.217 L 18.951 954.21 L 14.169 959.715 L 14.169 1028.17 L 241.46 1028.17 L 241.46 954.21 L 360.263 954.21 L 367.952 835.447 L 367.952 613.751 L 264.34 613.751 L 264.34 659.006 L 184.309 659.006 L 184.309 614.628 C 184.309 614.044 122.61 614.628 122.61 614.628 L 122.61 577.217 L 18.951 577.217 Z',
		apartmentId: '19'
	},
	{
		path: 'M 377.001 608.442 L 361.201 956.207 L 356.419 961.712 L 356.419 1030.17 L 583.711 1030.17 L 583.711 956.207 L 757.274 956.207 L 757.274 608.442 L 520.511 608.442 L 377.001 608.442 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1168.53 184.635 C 1167.74 283.669 1166.66 483.248 1168.53 489.094 L 1236.52 489.094 L 1236.52 574.343 L 1557.67 574.343 L 1557.67 559.728 L 1721.76 559.728 C 1720.21 505.315 1721.76 408.717 1721.76 379.489 C 1721.76 364.826 1721.76 379.489 1637.37 379.489 L 1637.37 204.12 L 1482.66 204.12 L 1482.66 184.635 L 1168.53 184.635 Z',
		apartmentId: '19'
	},
	{
		path: 'M 998.72 615.75 L 998.72 786.246 L 1162.81 786.246 L 1162.81 961.615 L 1561.33 961.615 L 1561.33 937.258 L 1716.04 937.258 L 1716.04 581.65 L 1561.33 581.65 L 1242.52 581.65 L 1242.52 615.75 L 998.72 615.75 Z',
		apartmentId: '19'
	}
];
const floorPaths5 = [
	{
		path: 'M 1057.95 121.504 L 1057.95 85.515 L 1100.71 85.515 L 1100.71 51.867 L 1286.46 51.867 L 1286.46 126.233 L 1284.34 527.917 L 1090.41 527.917 L 1038.86 527.917 L 1038.86 474.761 L 1064.12 474.761 L 1064.12 127.307 L 1057.95 121.504 Z',
		apartmentId: '19'
	},
	{
		path: 'M 846.734 527.476 L 846.734 128.233 L 838.974 121.99 L 838.974 58.792 L 1041.4 58.792 L 1041.4 88.635 L 1074.57 88.635 L 1056.35 127.209 L 1056.35 481.88 L 1043.41 480.955 L 1043.41 523.185 L 968.989 523.185 L 968.989 527.476 L 853 527.476 L 846.734 527.476 Z',
		apartmentId: '19'
	},
	{
		path: 'M 839.281 526.453 L 839.281 127.209 L 836.385 121.99 L 836.385 53.914 L 650.84 53.914 L 650.84 88.635 L 624.187 88.635 L 624.187 126.282 L 617.716 480.955 L 606.07 480.955 L 606.07 518.943 L 723.297 518.943 L 723.297 527.476 L 839.281 527.476 L 839.281 526.453 Z',
		apartmentId: '19'
	},
	{
		path: 'M 402.72 523.576 L 402.72 124.332 L 388.696 119.113 L 388.696 51.036 L 591.112 51.036 L 591.112 85.709 L 624.289 85.709 L 624.289 123.404 L 624.289 478.077 L 606.07 478.077 L 606.07 516.066 L 518.706 516.066 L 518.706 524.601 L 402.72 524.601 L 402.72 523.576 Z',
		apartmentId: '19'
	},
	{
		path: 'M 5.7 107.557 L 5.7 108.628 L 5.7 273.846 L 10.927 273.846 L 10.927 389.617 L 10.927 522.259 L 200.613 522.259 L 288.909 522.259 L 393.973 522.259 L 393.973 182.656 L 256.716 182.656 L 256.716 107.557 L 5.7 107.557 Z',
		apartmentId: '19'
	},
	{
		path: 'M 21.331 575.705 L 21.331 953.104 L 16.052 958.613 L 16.052 1027.18 L 266.964 1027.18 L 266.964 953.104 L 398.115 953.104 L 406.604 834.212 L 406.604 612.278 L 292.222 612.278 L 292.222 657.583 L 203.873 657.583 L 203.873 613.157 C 203.873 612.572 135.763 613.157 135.763 613.157 L 135.763 575.705 L 21.331 575.705 Z',
		apartmentId: '19'
	},
	{
		path: 'M 416.591 606.966 L 399.15 955.1 L 393.871 960.612 L 393.871 1029.18 L 644.783 1029.18 L 644.783 955.1 L 836.385 955.1 L 836.385 606.966 L 575.016 606.966 L 416.591 606.966 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1290.04 182.703 C 1289.46 281.845 1288.17 471.883 1289.62 477.736 L 1356.12 477.736 L 1356.54 558.199 L 1591.66 558.199 L 1718.83 558.199 C 1717.64 503.728 1718.83 407.027 1718.83 377.767 C 1718.83 363.088 1698.86 377.767 1633.44 377.767 L 1633.44 182.703 L 1290.04 182.703 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1102.93 614.279 L 1102.93 784.96 L 1284.08 784.96 L 1284.08 960.514 L 1724.01 960.514 L 1724.01 936.132 L 1724.01 570.39 L 1372.06 570.39 L 1372.06 614.279 L 1102.93 614.279 Z',
		apartmentId: '19'
	}
];
const floorPaths6 = [
	{
		path: 'M 1055.77 112.494 L 1055.77 76.102 L 1098.67 76.102 L 1098.67 42.033 L 1285.02 42.033 L 1285.02 117.267 L 1282.9 523.492 L 1088.31 523.492 L 1036.6 523.492 L 1036.6 469.738 L 1061.93 469.738 L 1061.93 118.327 L 1055.77 112.494 Z',
		apartmentId: '19'
	},
	{
		path: 'M 843.855 523.04 L 843.855 119.294 L 836.05 112.971 L 836.05 49.055 L 1039.14 49.055 L 1039.14 79.215 L 1072.42 79.215 L 1054.14 118.263 L 1054.14 476.963 L 1041.15 476.002 L 1041.15 518.73 L 966.49 518.73 L 966.49 523.04 L 850.137 523.04 L 843.855 523.04 Z',
		apartmentId: '19'
	},
	{
		path: 'M 836.36 522.013 L 836.36 118.263 L 833.445 112.971 L 833.445 44.124 L 647.344 44.124 L 647.344 79.215 L 620.551 79.215 L 620.551 117.301 L 614.063 476.002 L 602.389 476.002 L 602.389 514.415 L 720.019 514.415 L 720.019 523.04 L 836.36 523.04 L 836.36 522.013 Z',
		apartmentId: '19'
	},
	{
		path: 'M 398.37 519.105 L 398.37 115.353 L 384.284 110.062 L 384.284 41.215 L 587.374 41.215 L 587.374 76.305 L 620.68 76.305 L 620.68 114.39 L 620.68 473.095 L 602.389 473.095 L 602.389 511.509 L 514.737 511.509 L 514.737 520.131 L 398.37 520.131 L 398.37 519.105 Z',
		apartmentId: '19'
	},
	{
		path: 'M 0.008 98.375 L 0.008 99.444 L 0.008 266.548 L 5.271 266.548 L 5.271 383.652 L 5.271 517.774 L 195.603 517.774 L 284.197 517.774 L 389.599 517.774 L 389.599 174.331 L 251.871 174.331 L 251.871 98.375 L 0.008 98.375 Z',
		apartmentId: '19'
	},
	{
		path: 'M 15.72 571.825 L 15.72 953.49 L 10.392 959.078 L 10.392 1028.39 L 262.152 1028.39 L 262.152 953.49 L 393.739 953.49 L 402.253 833.254 L 402.253 608.834 L 287.486 608.834 L 287.486 654.645 L 198.854 654.645 L 198.854 609.701 C 198.854 609.127 130.525 609.701 130.525 609.701 L 130.525 571.825 L 15.72 571.825 Z',
		apartmentId: '19'
	},
	{
		path: 'M 412.276 603.437 L 394.784 955.514 L 389.483 961.105 L 389.483 1030.42 L 641.216 1030.42 L 641.216 955.514 L 833.445 955.514 L 833.445 603.437 L 571.237 603.437 L 412.276 603.437 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1288.67 174.373 C 1288.02 274.649 1286.73 466.829 1288.19 472.746 L 1354.92 472.746 L 1355.32 554.119 L 1591.21 554.119 L 1718.82 554.119 C 1717.63 499.046 1718.82 127.521 1718.82 97.928 L 1422.84 102.86 L 1422.84 174.373 L 1288.67 174.373 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1100.88 614.917 L 1100.88 785.851 L 1282.64 785.851 L 1282.64 961.669 L 1724.01 961.669 L 1724.01 937.251 L 1724.01 570.963 L 1370.88 570.963 L 1370.88 614.917 L 1100.88 614.917 Z',
		apartmentId: '19'
	}
];
const floorPaths7 = [
	{
		path: 'M 5.565 61.752 L 5.565 62.927 L 5.565 243.438 L 10.742 243.438 L 10.742 369.977 L 10.742 514.843 L 198.455 514.843 L 285.85 514.843 L 1032.55 514.843 L 1032.55 0.002 L 382.044 0.002 L 382.044 61.752 L 253.977 61.752 L 5.565 61.752 Z',
		apartmentId: '19'
	},
	{
		path: 'M 832.789 998.994 L 832.789 612.723 L 353.872 612.723 L 353.872 527.474 L 10.69 527.474 L 0.452 1074.28 L 622.775 1074.28 L 622.775 998.994 L 832.789 998.994 Z',
		apartmentId: '19'
	},
	{
		path: 'M 1037.66 0.002 L 1037.66 511.484 L 1086.33 511.484 L 1091.45 812.518 L 1278.41 812.518 L 1278.41 996.337 L 1716.35 996.337 L 1716.35 66.592 L 1424.4 66.592 L 1424.4 138.521 L 1280.98 138.521 L 1280.98 0.002 L 1037.66 0.002 Z',
		apartmentId: '19'
	}
];

const images = [img1, img2, img3, img4, img5, img6, img7];
const paths = [
	floorPaths1,
	floorPaths2,
	floorPaths3,
	floorPaths4,
	floorPaths5,
	floorPaths6,
	floorPaths7
];

const currentImg = computed(() => images[+route.params.floor_id - 1]);
const currentPaths = computed(() => paths[+route.params.floor_id - 1]);

const navigateToFloor = floorNum => {
	localStorage.setItem('floorId', floorNum);
	router.push(`/floors/${floorNum}`);
};

useHead({
	title: t('apartments')
});
</script>

<style scoped lang="scss">
@keyframes slide-from-bottom {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes animate-border-color {
	from {
		border: 1px solid transparent;
	}
	to {
		border: 1px solid $clr-secondary-darkest;
	}
}
.floor {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-image: url('~/assets/images/blur.png');
	background-repeat: no-repeat;
	background-size: cover;
	gap: 18px;
	padding-inline: $layout-spacing;
	justify-content: center;
	&__path {
		fill: rgba(255, 255, 255, 0.2);
		transition: fill 0.3s;
		&:hover {
			fill: rgba($clr-primary, 0.7);
		}
	}
	&__wrapper {
		align-self: center;
		width: 50%;
		margin-inline: auto;
		padding-right: 7%;
		display: grid;
		& > * {
			grid-area: 1/1/2/2;
		}
	}
	&__cta {
		align-self: center;
		background-color: $clr-primary;
		color: #fff;
		font-weight: 600;
		text-transform: uppercase;
		padding-block: 17px;
		padding-inline: 35px;
		font-size: 0.7rem;
		letter-spacing: 0.3px;
		transition: background-color 0.3s, color 0.3s;
		&:hover {
			background-color: #fff;
			color: $clr-primary;
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
	}
	&__social {
		align-self: center;
		display: flex;
		gap: 6px;
		pointer-events: all;
		&-item {
			@include flex-center;
			background-color: $clr-primary;
			border-radius: 50%;
			width: 24px;
			aspect-ratio: 1;
			transition: background-color 0.3s;
			&:hover {
				background-color: #fff;
				.floor__social-icon {
					fill: $clr-primary;
				}
			}
		}
		&-icon {
			width: 60%;
			fill: #fff;
			transition: fill 0.3s;
		}
	}
	&__tel {
		align-self: flex-start;
		gap: 11px;
		color: $clr-primary;
		display: grid;
		grid-template-columns: 1fr max-content;
		&:hover {
			.floor__tel-circle {
				background-color: #fff;
			}
			.floor__tel-icon {
				fill: $clr-primary;
			}
		}
		&-circle {
			background-color: $clr-primary;
			border-radius: 50%;
			transition: background-color 0.3s;
			aspect-ratio: 1;
			@include flex-center;
		}
		&-icon {
			width: 16px;
			fill: #fff;
			transition: fill 0.3s;
		}
		&-text {
			font-size: 14px;
			font-weight: 600;
		}
	}
	&__container {
		display: flex;
	}
	&__buttons {
		display: flex;
		gap: 20px;
		flex-direction: column;
	}
	&__button {
		cursor: pointer;
		color: $clr-secondary-darkest;
		display: flex;
		gap: 9px;
		&.active {
			.floor__button-content {
				animation: slide-from-bottom 0.3s forwards;
			}
			.floor__button-num {
				animation: animate-border-color 0.3s forwards;
			}
		}
		& > * {
			font-weight: 700;
		}
		&-floor {
			text-transform: lowercase;
		}
		&-block {
			color: #7b7b99;
		}
		&-content {
			opacity: 0;
			align-self: flex-end;
			display: flex;
			flex-direction: column;
			font-size: min(0.9vw, 14px);
			line-height: 1.1;
		}
		&-num {
			@include flex-center;
			width: min(2.5vw, 40px);
			aspect-ratio: 1;
			border-radius: 50%;
			border: 1px solid transparent;
			box-shadow: 0px 1px 10px 0px rgba(255, 255, 255, 0.33) inset;
			font-weight: 700;
		}
	}
}
</style>
