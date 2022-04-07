<template>
  <div class="q-pa-md login-form" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="login"
        label="Логин *"
        hint="Введите логин"
        lazy-rules
        :rules="[
          // val => val && val.length > 0 || 'Please type something'
        ]"
      />
      <!--{{login}}-->
      <q-input
        filled
        v-model="password"
        type="password"
        hint="Введите пароль"
        label="Пароль *"
        lazy-rules
        :rules="[
          // val => val !== null && val !== '' || 'Please type your password',
          // val => val > 0 && val < 100 || 'Please type a real password'
        ]"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
      <div style="display: flex; margin-top: 25px">
        <q-checkbox v-model="val" />
        <q-input
          filled
          v-model="unionUrl"
          type="unionUrl"
          hint="Адрес сервера Union"
          label=""
          lazy-rules
          style="width: 100%"
          :rules="[
            // val => val !== null && val !== '' || 'Please type your password',
            // val => val > 0 && val < 100 || 'Please type a real password'
          ]"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { api } from 'boot/axios'
import { auth } from "../api/index.js";

// import EssentialLink from "components/EssentialLink";
import axios from "axios";
import wrapper from "core-js/internals/array-iteration";
import { getBaseUrlFromProp } from "src/api";
//import { getStore } from "./src/store/index.js";
//import { getStore } from "
import { getStore } from "../store";
export default {
  // eslint-disable-next-line vue/no-unused-components
  // components: { EssentialLink },

  setup() {
    const $q = useQuasar();
    //store.tore
    //console.log(getStore().dispatch("settings/setBaseUrlState"));
    //store = getStore().dispatch("settings/setBaseUrlState");
    //store.dispatch("settings/setBaseUrlState");
    let login = ref("");

    let password = ref("");

    let authResponse = ref("");

    let unionUrl = ref("");

    let val = ref(false);

    const request = {
      login,
      password,
    };

    let data = ref({
      login: login,
      password: password,
    });
    const router = useRouter();

    getBaseUrlFromProp().then((result) => {
      unionUrl.value = result;
    });

    function onSubmit() {

      if (val.value) {
        auth(data.value, unionUrl).then(() => {
          router.push("settings");
          getStore().dispatch("settings/setBaseUrlState", true);
        });
      } else {
        auth(data.value).then(() => {
          router.push("readers");
        });
      }
    }

    return {
      login,
      password,
      data,
      onSubmit,

      unionUrl,
      val,

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
