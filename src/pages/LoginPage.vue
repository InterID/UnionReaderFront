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
      <div style="display: flex; margin-top: 25px;">
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
//const process = require("process");
export default {
  // eslint-disable-next-line vue/no-unused-components
  // components: { EssentialLink },

  setup() {
    const $q = useQuasar();

    let login = ref("");

    let password = ref("");

    let authResponse = ref("");

    let unionUrl = ref("");

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

    getBaseUrlFromProp().then((result) => {
      unionUrl.value = result;
      console.log("111111111",unionUrl.value);
    });

    function onSubmit() {
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
      auth(data.value).then(() => {
        router.push("readers");
      });
      /*axios
        .post(" http://192.168.1.178:8764/api/auth/", data.value, {
          headers: {
            // axios.post("http://dev.union-eam.ru:8686/api/auth/sign-in", data.value, {headers: {

            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer" + response.data;
          localStorage.setItem("token", response.data);
          // localStorage. = response.data;
          //axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data
          router.push("readers");
          //axios.get("http://eam.interid.ru:8764/api/buildings/")
          // commit('login', {token: response.data.token, user: response.data.user})
        });*/
    }

    return {
      login,
      password,
      data,
      onSubmit,
      val: ref(true),
      unionUrl,

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
