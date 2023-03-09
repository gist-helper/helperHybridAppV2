<template>
  <q-layout view="lHr lpr fFr">
    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-list>
        <q-item-label header> Related Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-tabs align="left">
          <q-route-tab no-caps to="/" exact>제 2학생회관</q-route-tab>
          <q-route-tab no-caps to="/bldg2eng" exact
            >Student Bldg. 2</q-route-tab
          >
          <q-route-tab no-caps to="/bldg1kor" exact>제 1학생회관</q-route-tab>
          <q-route-tab no-caps to="/bldg1eng" exact
            >Student Bldg. 1</q-route-tab
          >
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "식단표 카카오톡 채널",
    caption: "Kakao Chatbot",
    icon: "record_voice_over",
    link: "https://pf.kakao.com/_dxcBxlb",
  },
  //{
  //  title: "제 1학생회관 위치",
  //  caption: "Student Building 1 Location",
  //  icon: "apartment",
  //  link: "https://www.gist.ac.kr/cyber/",
  //},
  //{
  //  title: "제 2학생회관 위치",
  //  caption: "Student Building 2 Location",
  //  icon: "apartment",
  //  link: "https://pf.kakao.com/_dxcBxlb",
  //},
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
