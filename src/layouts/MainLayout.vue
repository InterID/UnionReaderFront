<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar style="justify-content: space-between">
        <q-btn flat dense class="q-mr-sm" @click="$router.replace('/readers')"
          >Readers</q-btn
        >
        <q-btn
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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    return {};
  },
};
</script>

<style scoped>
.login-form {
  margin: auto;
}
</style>
