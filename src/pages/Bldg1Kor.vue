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
      style="height: 100vh"
    >
      <q-carousel-slide
        :name="mealData.dayType"
        v-for="mealData in mealDataList"
        :key="mealData.dayType"
      >
        <q-scroll-area class="fit">
          <MealShow :mealData="mealData" :langType="0"></MealShow>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { ref, defineComponent, created, onMounted } from "vue";
import { api } from "boot/axios";
import MealShow from "components/MealShow.vue";

export default defineComponent({
  name: "Bldg2Kor",
  components: {
    MealShow,
  },
  setup() {
    var slide = ref(0);
    var mealDataList = ref([]);
    var dayDate = ref(["월", "화", "수", "목", "금", "토", "일"]);

    function initMealData() {
      var tempDate2 = new Date(Date.now());
      var day = tempDate2.getDay();
      day -= 1;
      if (day < 0) {
        day += 7;
      }
      slide.value = day;
      for (var i = 0; i < 7; i++) {
        var tempDate = new Date(Date.now());
        tempDate.setDate(tempDate.getDate() + i);
        var y = tempDate.getFullYear().toString();
        var m = (tempDate.getMonth() + 1).toString();
        var d = tempDate.getDate().toString();
        var dd = tempDate.getDay();
        dd -= 1;
        if (dd < 0) {
          dd += 7;
        }
        mealDataList.value.push({
          sortKey: i,
          dayType: dd,
          currentTime: m + "월 " + d + "일 " + "(" + dayDate.value[dd] + ")",
          breakfast: "아직 식단이 준비되지 않았습니다.\n",
          lunch: "아직 식단이 준비되지 않았습니다.\n",
          lunch_corner: "아직 식단이 준비되지 않았습니다.\n",
          dinner: "아직 식단이 준비되지 않았습니다.\n",
        });
      }
      //console.log(mealDataList.value);
    }

    async function getReqeust(tempDay) {
      var date = new Date(Date.now());
      date.setDate(date.getDate() + tempDay);
      var y = date.getFullYear().toString();
      var m = (date.getMonth() + 1).toString();
      var d = date.getDate();
      var query = "/meals/date/" + y + "/" + m + "/" + d + "/1/0";
      //console.log(query);
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
          //console.log(query.split("/")[5]);
          mealDataList.value.push({
            sortKey: tempDate,
            dayType: dd,
            currentTime:
              y + "년 " + m + "월 " + d + "일 " + "(" + dayDate.value[dd] + ")",
            breakfast: response.data.breakfast,
            lunch: response.data.lunch,
            lunch_corner: response.data.lunch_corner,
            dinner: response.data.dinner,
          });
          mealDataList.value.sort((a, b) => {
            return a.sortKey < b.sortKey;
          });
          //console.log(mealDataList.value);
        })
        .catch((error) => {
          //console.log(error);
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
          //console.log(query.split("/")[5]);
          mealDataList.value.push({
            sortKey: tempDate,
            dayType: dd,
            currentTime:
              y + "년 " + m + "월 " + d + "일 " + "(" + dayDate.value[dd] + ")",
            breakfast: "아직 식단이 준비되지 않았습니다.\n",
            lunch: "아직 식단이 준비되지 않았습니다.\n",
            lunch_corner: "아직 식단이 준비되지 않았습니다.\n",
            dinner: "아직 식단이 준비되지 않았습니다.\n",
          });
          mealDataList.value.sort((a, b) => {
            return a.sortKey < b.sortKey;
          });
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

      var num_of_left = 7 - day;
      if (num_of_left == 1) {
        num_of_left = 7;
      }
      for (var tempDay = 0; tempDay < num_of_left; tempDay++) {
        await getReqeust(tempDay);
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
