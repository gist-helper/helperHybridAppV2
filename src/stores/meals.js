import { defineStore } from 'pinia';
import { api } from "boot/axios";

export const useMealsStore = defineStore('meals', {
  state: () => ({
    langType: 0,
    bldgType: 1,
    dateIndex: 0,
    nextFiveDates: [],
    nextFiveDatesDays: [],
  }),

  getters: {},

  actions: {
    setbldgType (bldgType) {
      this.bldgType = bldgType
    },
    getKorDateStr (current) {
      var options = {
        weekday: "short",
        month: "long",
        day: "numeric",
      }
      return current.toLocaleDateString("ko-KR", options)
    },
    getEngDateStr (current) {
      var options = {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
      return current.toLocaleDateString("en-US", options)
    },
    initNextFiveDates () {
      // reset next five dates data
      this.nextFiveDates = [];
      this.nextFiveDatesDays = [];

      // get current time
      var current = new Date(Date.now());

      // for next five dates
      for(var i = 0 ; i < 5 ; i++) {
        // init meals information
        var meals = [[[], []],[[], []]];

        // for bldg 1, 2
        for (var bldgNum = 0 ; bldgNum < 2 ; bldgNum++) {
          // for lang kor, eng
          for (var langType = 0 ; langType < 2 ; langType++) {
            // bldg 1, kor
            if (bldgNum == 0 && langType == 0) {
              for (var j = 0 ; j < 5 ; j++) [
                meals[bldgNum][langType].push("아직 식단이 준비되지 않았습니다.")
              ]
            }
            // bldg 1, eng
            else if (bldgNum == 0 && langType == 1) {
              for(var j = 0 ; j < 5 ; j++) [
                meals[bldgNum][langType].push("The meal is being prepared.")
              ]
            }
            // bldg 2, kor
            else if (bldgNum == 1 && langType == 0) {
              for(var j = 0 ; j < 4 ; j++) [
                meals[bldgNum][langType].push("아직 식단이 준비되지 않았습니다.")
              ]
            }
            // bldg 2, eng
            else if (bldgNum == 1 && langType == 1) {
              for(var j = 0 ; j < 4 ; j++) [
                meals[bldgNum][langType].push("The meal is being prepared.")
              ]
            }
          }
        }

        var dateInfo = {
          year: current.getFullYear(),
          month: current.getMonth() + 1,
          date: current.getDate(),
          day: current.getDay(), 
          str: [this.getKorDateStr(current), this.getEngDateStr(current)],
          meals: meals
        }
        this.nextFiveDates.push(dateInfo);
        this.nextFiveDatesDays.push(current.getDay());
        
        // add one day        
        current.setDate(current.getDate() + 1);
      }
    },
    async updateNextFiveDates () {
      // get meals data from server
      for (var i = 0 ; i < this.nextFiveDates.length ; i++) {
        var currentDates = this.nextFiveDates[i];
        var currentDay = currentDates.day;

        // for bldg 1, 2
        for (var bldgNum = 1 ; bldgNum < 3 ; bldgNum++) {
          // for lang kor, eng
          for (var langType = 0 ; langType < 2 ; langType++) {
            // sat sun no request for bldg 1
            if(bldgNum == 1 && (currentDay == 0 || currentDay == 6)) {
              continue
            }
            var query = "/meals/date/" + currentDates.year + "/" + currentDates.month + "/" + currentDates.date + "/" + bldgNum + "/" + langType;
            await api
              .get(query)
              .then((response) => {
                //console.log(query, i)
                //console.log(response.data);

                var currentMeals = []
                if (bldgNum == 1) {
                  currentMeals = [
                    response.data.breakfast,
                    response.data.lunch,
                    response.data.lunch_corner,
                    response.data.lunch_bldg1_2,
                    response.data.dinner
                  ]
                }
                else {
                  var corner = response.data.lunch_corner
                  if (currentDay == 0 || currentDay == 6) {
                    corner = langType == 0 ? "점심 코너는 평일에만 운영됩니다. :)" : "The lunch corner is only open on weekdays. :)";
                  }
                  else if (corner.length == 0) {
                    corner = langType == 0 ? "점심 코너를 운영하지 않습니다. :)" : "Lunch Corner is closed today. :)";
                  }
                  currentMeals = [
                    response.data.breakfast,
                    response.data.lunch,
                    corner,
                    response.data.dinner
                  ]
                }
                this.nextFiveDates[i].meals[bldgNum - 1][langType] = currentMeals;
              })
              .catch((error) => {
                //console.log(error);
              })
          }
        }
      }
    }
  }
})
