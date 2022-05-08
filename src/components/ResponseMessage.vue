<template>
  <Transition name="fade">
    <div v-if="alert" class="container"
         @mouseenter="store.dispatch('readers/clearModalTimeout')"
         @mouseleave="store.dispatch('readers/hideModal')"
    >
      <div :class="{error: alert.isError}" class="response-message">{{ alert.message }}</div>
    </div>
  </Transition>
</template>


<script>
export default {
  name: "ResponseMessage",
}
</script>
<script setup>
import {computed} from "vue";
import {useStore} from "vuex"

const store = useStore();
const alert = computed(() => {
  return store.getters["readers/getResponseMessage"];
})
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  transform: translateY(20px);
  display: flex;
  z-index: 300;
  justify-content: center;
}
.response-message {
  text-align: center;
  color: green;
  padding: 20px;
  z-index: 300;
  background-color: white;
  width: 50%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
}

.error {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
