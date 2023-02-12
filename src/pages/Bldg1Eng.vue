<template>
  <q-page class="flex-center">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :arrows="arrows"
      :navigation="navigation"
      control-color="black"
      class="bg-amber-2 text-black"
    >
      <q-carousel-slide
        :name="mealData.dayType"
        v-for="mealData in mealDataList"
        :key="mealData.dayType"
      >
        <MealShow :mealData="mealData"></MealShow>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { ref, defineComponent, created, onMounted } from "vue";
import { api } from "boot/axios";
import MealShow from "components/MealShow.vue";

export default defineComponent({
  name: "Bldg1Eng",
  components: {
    MealShow,
  },
  setup() {
    var slide = ref(0);
    var mealDataList = ref([]);
    var dayDate = ref(["월", "화", "수", "목", "금", "토", "일"]);

    function initMealData() {
      for (var i = 0; i < 7; i++) {
        mealDataList.value.push({
          sortKey: i,
          dayType: i,
          currentTime: "00월 00일 (" + dayDate.value[i] + ")",
          breakfast: "아직 식단이 준비되지 않았습니다.\n",
          lunch: "아직 식단이 준비되지 않았습니다.\n",
          lunch_corner: "아직 식단이 준비되지 않았습니다.\n",
          dinner: "아직 식단이 준비되지 않았습니다.\n",
        });
      }
      //console.log(mealDataList.value);
    }

    async function getReqeust(tempDay, day) {
      var date = new Date(Date.now());
      date.setDate(date.getDate() + tempDay - day);
      var y = date.getFullYear().toString();
      var m = (date.getMonth() + 1).toString();
      var d = date.getDate();
      var query = "/meals/date/" + y + "/" + m + "/" + d + "/2/0";
      console.log(query);
      await api
        .get(query)
        .then((response) => {
          var tempDate = new Date(Date.now());
          tempDate.setDate(tempDate.getDate() + mealDataList.value.length);
          var y = tempDate.getFullYear().toString();
          var m = (tempDate.getMonth() + 1).toString();
          var d = tempDate.getDate().toString();
          var dd = tempDate.getDay();
          dd -= 1;
          if (dd < 0) {
            dd += 7;
          }
          console.log(query.split("/")[5]);
          mealDataList.value.push({
            sortKey: query.split("/")[5],
            dayType: dd,
            currentTime: m + "월 " + d + "일 " + "(" + dayDate.value[dd] + ")",
            breakfast: response.data.breakfast,
            lunch: response.data.lunch,
            lunch_corner: response.data.lunch_corner,
            dinner: response.data.dinner,
          });
          mealDataList.value.sort((a, b) => {
            return a.sortKey < b.sortKey;
          });
          console.log(mealDataList.value);
        })
        .catch((error) => {
          console.log(error);
          mealDataList.value = [];
          if (mealDataList.value.length == 0) {
            initMealData();
          }
        });
    }

    onMounted(async () => {
      initMealData();
      const today = new Date(Date.now());
      //console.log(today.getFullYear());
      //console.log(today.getMonth());
      //console.log(today.getDate());
      //console.log(today.getDay());

      // Today
      // Sunday - Saturday : 0 - 6
      var day = today.getDay();
      day -= 1;
      if (day < 0) {
        day += 7;
      }
      mealDataList.value = [];
      slide.value = day;
      for (var tempDay = day; tempDay < 7; tempDay++) {
        await getReqeust(tempDay, day);
      }
    });
    return {
      mealDataList,
      slide,
      arrows: ref(true),
      navigation: ref(true),
      navigationPositions: [
        { value: "top", label: "top" },
        { value: "right", label: "right" },
        { value: "bottom", label: "bottom (default)" },
        { value: "left", label: "left" },
      ],
    };
  },
});
</script>
