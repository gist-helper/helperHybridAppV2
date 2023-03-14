<template>
  <q-page class="bg-grey-1">
		<q-carousel
      v-model="bldgType"
			class="fit bg-grey-1"
      swipeable>
			<q-carousel-slide :name="0" style="min-height: 500px">
				<MealShow></MealShow>
			</q-carousel-slide>
			<q-carousel-slide :name="1">
				<MealShow></MealShow>
			</q-carousel-slide>
		</q-carousel>
  </q-page>
</template>
  
<script>
import { ref, defineComponent } from 'vue'
import { storeToRefs } from "pinia";
import { useMealsStore } from "src/stores/meals";
import MealShow from "components/MealShow.vue"

export default defineComponent({
  name: 'MealsView',
	components: {
		MealShow
	},
	setup() {
		// store information
    const mealInfo = useMealsStore();
    const { bldgType } = storeToRefs(mealInfo);

		return {
			bldgType,
		}
	}
})
</script>