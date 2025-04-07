<template>
	<GenplanWrapper
		pathname="floors/placeholder"
		:background-image="currentImg"
		:paths="currentPaths"
		@change-floor="changeFloor" />
</template>

<script setup>
import img1 from '~/assets/images/floors.avif';
import img2 from '~/assets/images/floors-2.avif';
import img3 from '~/assets/images/floors-3.avif';

const { t } = useI18n();

const currentIndex = ref(0);

const currentPaths = computed(() => floorPaths[currentIndex.value]);
const currentImg = computed(() => images[currentIndex.value]);

const firstFloorPaths = [
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1129.5 330.996 L 1451 305.996 L 1821.5 348.826 L 1821.5 363.826 L 1850 366.496 L 1850 447.996 L 1800 447.996 L 1800 439.996 L 1451 427.996 L 1129.5 435.996 L 1129.5 330.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 568 360.496 L 1052.5 317.996 L 1126.5 323.996 L 1126.5 438.496 L 1027.5 438.496 L 568 447.996 L 568 360.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 545.5 452.996 L 1029.5 439.996 L 1081 439.996 L 1081 509.496 L 1032.5 509.496 L 545.5 509.496 L 545.5 452.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 545.5 510.996 L 1029.5 510.996 L 1081 510.996 L 1081 600.496 L 1032 600.496 L 545.5 576.996 L 545.5 510.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 548.5 581.996 L 1031 602.996 L 1079.5 602.996 L 1079.5 655.496 L 913.502 662.996 L 913.502 713.48 L 464 662.996 L 464 622.996 L 548.5 616.496 L 548.5 581.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1083.5 437.996 L 1457 429.996 L 1799.5 440.496 L 1799.5 449.496 L 1850 449.496 L 1850 523.36 L 1082 526.996 L 1083.5 437.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1082 528.496 L 1850 524.996 L 1850 590.496 L 1459 621.496 L 1082 604.996 L 1082 528.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1085 607.496 L 1457 622.996 L 1850 591.496 L 1850 677.996 L 1612.5 711.179 L 1569.5 711.179 L 1260.5 755.496 L 916.502 713.496 L 916.502 666.088 L 1085 658.496 L 1085 607.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1571.5 712.496 L 1611 714.496 L 1850 683.496 L 1850 752.996 L 1800 761.996 L 1800 769.496 L 1765.5 775.996 L 1751.5 775.996 L 1751.5 779.996 L 1612.5 805.496 L 1571.5 800.996 L 1571.5 712.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1571.5 804.996 L 1609.5 809.496 L 1801 771.996 L 1801 764.996 L 1850 755.996 L 1850 830.496 L 1820 838.239 L 1820 847.239 L 1609.5 898.496 L 1571.5 894.996 L 1571.5 804.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 63.5 629.996 L 1262.5 758.496 L 1569 715.496 L 1569 877.277 L 1256 952.996 L 63.5 718.996 L 63.5 629.996 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 1572 900.496 L 1611 905.496 L 1820 852.996 L 1820 900.496 L 1776 911.996 L 1776 924.996 L 1716 940.996 L 1688 935.996 L 1674 942.996 L 1572 926.996 L 1572 900.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 261 387.496 L 566.5 362.496 L 566.5 433.996 L 543.5 433.996 L 542 451.496 L 261 458.996 L 261 387.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 241.5 460.496 L 546 453.496 L 546 516.996 L 241.5 516.996 L 241.5 460.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 241.5 516.496 L 546 518.996 L 546 582.496 L 241.5 573.496 L 241.5 516.496 Z'
	},
	{
		blockId: 'E1',
		floorId: '07',
		path: 'M 223 577.339 L 546 586.076 L 546 615.996 L 462 620.996 L 462 665.496 L 59 626.996 L 59 601.996 L 223 597.297 L 223 577.339 Z'
	}
];
const secondFloorPaths = [
	{
		path: 'M97.5 408.5H63.5V422.5H38V488L475.5 495V417.5H448V394L97.5 379.5V408.5Z',
		blockId: 'E1'
	},
	{ path: 'M475.5 497.5L36 489.5V564.5L475.5 568.5V497.5Z', blockId: 'E1' },
	{ path: 'M475.5 570.5L36 568V637.5L475.5 640V570.5Z', blockId: 'E1' },
	{ path: 'M475.5 642.5L36 640V709.5L475.5 712V642.5Z', blockId: 'E1' },
	{ path: 'M475.5 715.5L36 713V785H475.5V715.5Z', blockId: 'E1' },
	{ path: 'M475.5 787H36V870.5L475.5 865.5V787Z', blockId: 'E1' },
	{ path: 'M447 868.5L94.5 871.721V913.977L81 914V947.5L447 932V868.5Z', blockId: 'E1' },
	{ path: 'M976.5 512.5V434.5L478.5 422.5V512.5H976.5Z', blockId: 'E1' },
	{ path: 'M976.5 569V515.5L478.5 513V569H976.5Z', blockId: 'E1' },
	{ path: 'M976.5 624V570.5H478.5V626.5L976.5 624Z', blockId: 'E1' },
	{ path: 'M977 680.5V625.5L479 627V692.5L977 680.5Z', blockId: 'E1' },
	{ path: 'M976.5 741V684.5L478.5 694.5V753L976.5 741Z', blockId: 'E1' },
	{ path: 'M976.5 796.5V744L478.5 754V810L976.5 796.5Z', blockId: 'E1' },
	{ path: 'M971 845.5V799.5L478.5 812V865.5L971 845.5Z', blockId: 'E1' },
	{ path: 'M1455 823.5V781L980 798V846L1455 823.5Z', blockId: 'E1' },
	{ path: 'M981 437V513.5H1442.5V450L981 437Z', blockId: 'E1' },
	{ path: 'M981 515.5V568L1455 570V518L981 515.5Z', blockId: 'E1' },
	{ path: 'M981 571V624.5H1455V572L981 571Z', blockId: 'E1' },
	{ path: 'M981 626V679.5L1455 671.5V626H981Z', blockId: 'E1' },
	{ path: 'M981 681.5V740.5L1455 725.5V674L981 681.5Z', blockId: 'E1' },
	{ path: 'M980 742.5V796.5L1455 778.5V728L980 742.5Z', blockId: 'E1' },
	{
		path: 'M1636 508.5L1444.5 515V450L1636 434L1832.5 441.5V465H1849.5V515L1636 508.5Z',
		blockId: 'E1'
	},
	{ path: 'M1636 571.5L1456 571V517L1636 510.5L1849.5 517.5V571.5H1636Z', blockId: 'E1' },
	{ path: 'M1636 629L1456 625.5V572.5H1636H1849.5V629H1636Z', blockId: 'E1' },
	{ path: 'M1636 681.5L1456 674.5V627L1636 630H1849.5V679.5L1636 681.5Z', blockId: 'E1' },
	{ path: 'M1636 739L1456 726V676L1636 683L1849.5 681V735L1636 739Z', blockId: 'E1' },
	{ path: 'M1636 800L1456 780.5V727L1636 740L1849.5 737V791L1636 800Z', blockId: 'E1' },
	{ path: 'M1636 802.5L1457 782.5V827.5L1636 855.5L1850 846.5V793L1636 802.5Z', blockId: 'E1' }
];
const thirdFloorPaths = [
	{
		path: 'M273.999 483.5L94 480V413L124 411.5V393.5L361 367.5L687.5 381.5V480L273.999 483.5Z',
		blockId: 'E1'
	},
	{ path: 'M348.5 567L94 552V483L348.5 485L722 480V560.5L348.5 567Z', blockId: 'E1' },
	{ path: 'M348.5 650L94 620V554L348.5 568L722 562.5V638.5L348.5 650Z', blockId: 'E1' },
	{ path: 'M270 726.5V804.5L242 806.5L96 756V690.5L270 726.5Z', blockId: 'E1' },
	{ path: 'M270 805.5V872.5L233.5 876.5L96 820.5V758.5L241.5 808L270 805.5Z', blockId: 'E1' },
	{
		path: 'M155.5 893.5L126 881V868H122.5L123 846L120.5 844L121.5 834.5L214.5 871L162 881L155.5 893.5Z',
		blockId: 'E1'
	},
	{
		path: 'M348.5 742L94 687.5V621.5L348.5 652L722 639V686L848.5 703.5V746L481.5 777L348.5 742Z',
		blockId: 'E1'
	},
	{ path: 'M274.5 729V874L482 947L1872 739V645L482 780L274.5 729Z', blockId: 'E1' },
	{
		path: 'M691.5 374.5V476.5L742 480L1301.5 485.5V415H1281.5V393.5L743.5 369.5L691.5 374.5Z',
		blockId: 'E1'
	},
	{ path: 'M722.5 484.5V560H759.5L1299 546.5V487.5L759.5 484.5H722.5Z', blockId: 'E1' },
	{ path: 'M722.5 562V639.5L758 642L1299 613.5V547.5L759.5 562H722.5Z', blockId: 'E1' },
	{
		path: 'M722.5 640.5V684.5L851 702V744L1384 692.5V659.5L1279.5 651.5V619L759.5 644.5L722.5 640.5Z',
		blockId: 'E1'
	},
	{
		path: 'M1282 414.5V394.5L1647.5 408V418L1716.5 419.5V484.5L1302 486.5L1304 414.5H1282Z',
		blockId: 'E1'
	},
	{ path: 'M1302.5 545V488L1747.5 486V536L1302.5 545Z', blockId: 'E1' },
	{ path: 'M1302.5 613V545.5L1747.5 538V585.5L1302.5 613Z', blockId: 'E1' },
	{
		path: 'M1302.5 614.5L1715.5 589V614L1869.5 623.5V644L1385.5 690.5V658.5L1282.5 651.5V618L1302.5 614.5Z',
		blockId: 'E1'
	}
];

const floorPaths = [firstFloorPaths, secondFloorPaths, thirdFloorPaths];
const images = [img1, img2, img3];

const changeFloor = direction => {
	if (direction === 'next') {
		currentIndex.value = (currentIndex.value + 1) % images.length;
	} else {
		currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
	}
};

useHead({
	title: t('floors')
});
</script>
