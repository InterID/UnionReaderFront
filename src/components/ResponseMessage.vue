<template>
  <div class="response-message" :class="{error: alert.isError}" v-if="alert">{{ alert.message }}</div>
</template>

<script>
import {computed} from "vue";
import {getStore} from "src/store";

export default {
  name: "ResponseMessage",
  setup() {
    const alert = computed(() => {
      return getStore().getters["readers/getResponseMessage"];
    })
    return { alert }
  }
}
</script>

<style scoped>
.response-message {
  text-align: center;
  animation: opacity 600ms ease;
  color: green;
}
.error{
  color: red;
}
@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
