<template>
  <div v-if="(nextFiveDates[dateIndex].day == 0 || nextFiveDates[dateIndex].day == 6) && bldgType == 0"
    class="text-h6 text-center absolute absolute-center bg-grey-1" style="width: 100vw">
    {{ errMsg[langType] }}
  </div>
  <div v-else 
    class="column wrap justify-center items-center content-center q-col-gutter-y-sm">
    <div v-for="(mealContent, index) in nextFiveDates[dateIndex].meals[bldgType][langType]" :key="index"
      class="col" >
      <q-card 
        class="meal-card"
        flat bordered>
        <q-card-section class="q-pa-xs">
          <q-list>
            <q-item dense class="q-py-sm">
              <q-item-section class="text-subtitle1 text-bold">
                <q-item-label>
                  {{ mealType[bldgType][langType][index] }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  {{mealTime[bldgType][index]}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item dense class="q-pb-sm">
              <q-item-section>
                <q-item-label>
                  <div v-for="(meals, index) in mealContent.split('\n')" :key="index">
                  {{ meals }}
                </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { storeToRefs } from "pinia";
import { useMealsStore } from "src/stores/meals";

export default defineComponent({
  name: 'MealShow',
	setup() {
		// const variable
		const mealType = ref([
			[
    	  ["아침", "점심 (일반)", "점심 (코너)", "점심 (2층 르네상스)", "저녁"],
    	  ["Breakfast", "Lunch (Normal)", "Lunch (Coner)", "Lunch (2nd Floor)", "Dinner"],
    	],
			[
    	  ["아침", "점심 (일반)", "점심 (코너)", "저녁"],
    	  ["Breakfast", "Lunch (Normal)", "Lunch (Coner)", "Dinner"],
    	]
		]);
		const mealTime = ref([
			[ "08:00 ~ 09:00", "11:30 ~ 13:00", "11:30 ~ 13:00", "11:30 ~ 13:00", "17:00 ~ 18:30"],
			[ "08:00 ~ 09:00", "11:30 ~ 13:00", "11:30 ~ 13:00", "17:00 ~ 18:30"],
		])
		const errMsg = ref([
			"1학생식당은 평일에만 운영됩니다 :)",
			"The std.bldg.1 is only open on weekdays :)",
		])

		// store information
    const mealInfo = useMealsStore();
    const { langType, bldgType, dateIndex, nextFiveDates } = storeToRefs(mealInfo);
		const { setbldgType } = mealInfo;

		return {
			nextFiveDates,
			dateIndex,
			
			errMsg,
			
			langType,
			bldgType,

			mealType,
			mealTime,

			slide: ref('style'),

			onLeft({ reset }) {
				reset();
				setbldgType(0);
        console.log('slide left');
      },

      onRight({ reset }) {
				reset();
				setbldgType(1);
        console.log('slide right');
      }
		}
	}
})
</script>

<style lang="sass" scoped>
.meal-card
	width: 90vw
</style>