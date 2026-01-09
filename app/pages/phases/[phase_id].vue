<template>
  <GenplanWrapper :background-image="backgroundImage" :data="blocks" />
  <ButtonBack :to="$localePath('/genplan')" class="back-button" />
</template>

<script setup>
const { t } = useI18n();
const { params } = useRoute();
const charvakStore = useCharvakStore();

const backgroundImage = computed(() => `${DOMAIN_URL}/${charvakStore.selectedPhase?.image}`);

const blocks = ref([]);
const { data } = await useFetch(`${API_URL}/buildings`, { query: { phase_id: params.phase_id } });
const arr = [];
data.value.forEach(el => {
  const obj = { children: [...el.children, { id: el.id, image: el.image }], image: el.image };
  if (el.commercials.length > 0) {
    obj.commercial = el.commercials[0];
    obj.commercial.image = el.image;
  }
  el.blocks.forEach(block => {
    arr.push({
      ...block,
      ...obj
    });
  });
});
blocks.value = arr;

////Commercial
// {
// 		"path": "M 1020.67 251.775 L 1115.34 228.15 L 1168 249.75 L 1176.67 247.725 L 1198 255.825 L 1198 262.575 L 1202.67 264.6 L 1200.67 304.425 L 1100.67 329.4 L 1056 307.8 L 1040 313.2 L 1003.34 294.3 L 1002.67 274.05 L 998.003 272.025 L 998.003 264.6 L 1020.67 258.525 L 1020.67 251.775 Z",
// 		"commercial": {
// 			"name": "testName",
// 			"description": "testDesc",
// 			"img": null
// 		}
// 	},
// 	{
// 		"commercial": {
// 			"name": "testName",
// 			"description": "testDesc",
// 			"img": null
// 		},
// 		"path": "M 623.337 388.125 L 627.337 434.7 L 650.67 437.4 L 658.67 435.375 L 658.67 442.8 L 678.67 461.7 L 708.67 452.925 L 706.004 423.9 L 704.67 400.275 L 709.337 398.25 L 708.67 392.85 L 782.003 371.925 L 788.67 377.325 L 794.003 378 L 840.67 411.75 L 861.337 407.025 L 856.003 273.375 L 836.67 262.575 L 792.003 273.375 L 795.337 321.975 L 758.003 331.425 L 758.003 338.175 L 762.003 340.2 L 650.004 370.575 L 650.004 381.375 L 623.337 388.125 Z"
// 	}

const route = useRoute();
useHead({
  title: t('buildings'),
  meta: [
    {
      name: 'description',
      content: t('seo-phases-desc', { id: route.params.phase_id })
    },
    {
      name: 'keywords',
      content: [
        `Phase ${route.params.phase_id} Chorvoq Darvozasi`,
        `Phase ${route.params.phase_id} apartments Tashkent`,
        `Phase ${route.params.phase_id} building plans`,
        `Chorvoq Phase ${route.params.phase_id} layout`,
        `new phase ${route.params.phase_id} Tashkent region`,
        `Phase ${route.params.phase_id} pricing Chorvoq`,
        `Phase ${route.params.phase_id} availability`,
        `Chorvoq phase development`
      ].join(', ')
    }
  ]
});
</script>

<style scoped lang="scss"></style>
