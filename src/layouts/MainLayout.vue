<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar style="justify-content: space-between">
        <q-btn flat dense class="q-mr-sm" @click="$router.replace('/readers')"
          >Readers</q-btn
        >
        <q-btn
          v-if="path.path !== '/'"
          flat
          round
          dense
          icon="settings"
          @click="$router.replace('/settings')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const path = computed(() => {
      return useRoute();
    });
    return { path };
  },
};
</script>

<style scoped>
.login-form {
  margin: auto;
}
</style>
