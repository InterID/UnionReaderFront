<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
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
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
// import { api } from 'boot/axios'

// import EssentialLink from "components/EssentialLink";
import axios from "axios";
import wrapper from "core-js/internals/array-iteration";

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
      password
    };

    let data = ref({
      login:login,
      password:password,
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

      axios.post("http://127.0.0.1:7878/api/auth/", data.value, {headers: {
      // axios.post("http://dev.union-eam.ru:8686/api/auth/sign-in", data.value, {headers: {

        "Access-Control-Allow-Origin": "*",
      }})
        .then(response => {
          axios.defaults.headers.common['Authorization'] = 'Bearer' + response.data;
          localStorage.setItem('token', JSON.stringify(response.data))
          // localStorage. = response.data;
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
          // commit('login', {token: response.data.token, user: response.data.user})
        });

      console.log(authResponse);
    }

    return {
      login,
      password,
      data,
      onSubmit,

      onReset() {
        login.value = null;
        password.value = null;
      }
    };
  }
};
</script>