<template>
  <q-layout>
    <q-header reveal elevated>
      <q-toolbar style="flex-direction: row-reverse">
        <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>Quasar Framework</q-toolbar-title>-->

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
// import { api } from 'boot/axios'

// import EssentialLink from "components/EssentialLink";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/no-unused-components
  // components: { EssentialLink },

  setup() {
    const $q = useQuasar();

    let login = ref("");

    let password = ref("");

    let authResponse = ref("");

    const request = {
      login,
      password,
    };
    //console.info(process.env);
    let data = ref({
      login: login,
      password: password,
    });
    const router = useRouter();

    function onSubmit() {
      //console.log(process.env.MyData);

      // if (accept.value !== true) {
      //   $q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     messpassword: 'You need to accept the license and terms first'
      //   })
      // }
      // else {
      //   $q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     messpassword: 'Submitted'
      //   })
      // }
      //
    }

    return {
      login,
      password,
      data,
      onSubmit,

      onReset() {
        login.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style scoped>
.login-form {
  margin: auto;
}
</style>
