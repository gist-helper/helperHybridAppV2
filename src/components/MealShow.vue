<template>
  <div class="column">
    <div class="col-1 q-pb-md text-h6 text-center">Gismeal</div>
    <div class="col-1 q-pb-md text-h5 text-center">
      {{ mealData.currentTime }}
    </div>
    <div class="col q-px-md q-gutter-md">
      <q-card flat bordered class="bg-white my-card">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ mealType[langType][0] }}</div>
            <div class="col-auto row items-center">
              <q-chip icon="alarm" label="08:00 - 09:00" class="bg-amber-2" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-md">
          <div v-for="menu in mealData.breakfast.split('\n')" :key="menu">
            {{ menu }}
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="bg-white my-card">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ mealType[langType][1] }}</div>
            <div class="col-auto row items-center">
              <q-chip class="bg-amber-2" icon="alarm" label="11:30 - 13:00" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-md">
          <div v-for="menu in mealData.lunch.split('\n')" :key="menu">
            {{ menu }}
          </div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        v-if="mealData.dayType != '5' && mealData.dayType != '6'"
        class="bg-white my-card"
      >
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ mealType[langType][2] }}</div>
            <div class="col-auto row items-center">
              <q-chip class="bg-amber-2" icon="alarm" label="11:30 - 13:00" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-md">
          <div v-for="menu in mealData.lunch_corner.split('\n')" :key="menu">
            {{ menu }}
          </div>
        </q-card-section>
      </q-card>
      <q-card
        flat
        bordered
        v-if="
          bldgType == 1 && mealData.dayType != '5' && mealData.dayType != '6'
        "
        class="bg-white my-card"
      >
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ mealType[langType][4] }}</div>
            <div class="col-auto row items-center">
              <q-chip class="bg-amber-2" icon="alarm" label="11:30 - 13:00" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-md">
          <div v-for="menu in mealData.lunch_2nd.split('\n')" :key="menu">
            {{ menu }}
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="bg-white my-card">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ mealType[langType][3] }}
            </div>
            <div class="col-auto row items-center">
              <q-chip class="bg-amber-2" icon="alarm" label="17:00 - 18:30" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-md">
          <div v-for="menu in mealData.dinner.split('\n')" :key="menu">
            {{ menu }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<!--
    <div class="column">
    <div class="col-1 text-h5 text-center">02월 03일 (금)</div>
    <div class="col q-px-md q-gutter-md">

    </div>
-->
<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "MealShow",
  props: {
    mealData: {
      type: Object,
    },
    langType: {
      type: Number,
      defalut: 0,
    },
    bldgType: {
      type: Number,
      defalut: 2,
    },
  },
  setup() {
    const mealType = ref([
      ["조식", "중식(일반식)", "중식(특식)", "석식", "중식(2층)"],
      [
        "Breakfast",
        "Lunch(Normal)",
        "Lunch(special)",
        "Dinner",
        "Lunch(2nd Floor)",
      ],
    ]);
    return {
      mealType,
    };
  },
});
</script>
