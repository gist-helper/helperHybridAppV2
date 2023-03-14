<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grey-1 text-black">
      <q-toolbar class="q-py-sm">
        <q-btn flat dense icon="replay" size="lg" :ripple="false" @click="showLoading()"/>
        <q-toolbar-title class="text-center text-h6">
          {{ nextFiveDates[dateIndex].str[langType] }}
        </q-toolbar-title>
        <q-btn flat dense icon="settings" size="lg" :ripple="false"
          @click="isSettingOpen = true"/> 
      </q-toolbar>
      <div class="fit row wrap justify-center text-h6">
        <div style="width: 80vw">
          <q-btn-toggle
            v-model="bldgType"
            spread no-caps rounded unelevated 
            toggle-color="negative" toggle-text-color="white"
            color="grey-4" text-color="grey"
            :ripple="false"
            :options="bldgOptions[langType]"
          />
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white">
      <q-toolbar>
        <q-tabs
          v-model="dateIndex"
          class="fit text-grey-7 text-bold text-subtitle1"
          indicator-color="white"
          active-color="negative"
          align="center">
        <q-tab 
          v-for="(dateInfo, index) of nextFiveDates" :key="index"
          class="q-pa-sm"
          no-caps
          :ripple="false"
          :name="index">
          <div>
            {{dateInfo.date}}
          </div>
          <div>
            {{ dayDate[langType][dateInfo.day]}}
          </div>
        </q-tab>
      </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
  <q-dialog v-model="isSettingOpen">
    <q-card class="settings-card" flat outlined>
      <q-card-section class="text-h6">
        {{ settingMsg }}
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-option-group
        v-model="langType"
        :options="langOptions"
        color="primary"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat no-caps v-close-popup
          color="primary"
          :ripple="false" :label="confirmMsg[langType]"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, defineComponent, onBeforeUnmount, onMounted } from "vue";
import { useQuasar } from 'quasar';
import { storeToRefs } from "pinia";
import { useMealsStore } from "src/stores/meals";

export default defineComponent({
  name: "MainLayout",
  components: {},
  setup() {
    // const variable
    const dayDate = ref([
      ["일", "월", "화", "수", "목", "금", "토"], 
      ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]
    ]);
    const bldgOptions = ref([
      [
        {label: '1학생식당', value: 0},
        {label: '2학생식당', value: 1}
      ],
      [
        {label: 'Std.Bldg.1', value: 0},
        {label: 'Std.Bldg.2', value: 1}
      ]
    ]);
    const langOptions = ref([
      {
        label: '한국어 / Korean',
        value: 0, 
      },
      {
        label: '영어 / English',
        value: 1,
      }
    ]);
    const settingMsg = ref('언어 선택 / Select Language');
    const confirmMsg = ref(['확인', 'Apply']);
    
    // useQuasar
    const $q = useQuasar()
    let timer

    // store information
    const mealInfo = useMealsStore();
    const { langType, bldgType, dateIndex, nextFiveDates } = storeToRefs(mealInfo);
    const { setbldgType, initNextFiveDates, updateNextFiveDates } = mealInfo;

    // when create page
    initNextFiveDates();

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    // when monut page
    onMounted( async() => {
      updateNextFiveDates();
    })

    return {
      nextFiveDates,
      dateIndex,
      langType,
      showLoading () {
        $q.loading.show()

        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
        updateNextFiveDates();
      },
      isSettingOpen: ref(false),

      bldgType,
      bldgOptions,

      dayDate,
      
      langOptions,
      settingMsg,
      confirmMsg,
    };
  },
});
</script>

<style lang="sass" scoped>
.settings-card
  width: 80vw
  max-width: 500px
</style>