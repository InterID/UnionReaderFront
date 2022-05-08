<template>
  <div class="reader__option reader__api">{{ reader.ip }}</div>
  <div class="reader__option reader__port">{{ reader.port }}</div>
  <div class="reader__option reader__status">{{ reader.status }}</div>
  <div class="reader__button">
    <button class="start"
            @click="startInventory(reader.api,reader.port)"
    >Start
    </button>
    <button class="stop"
            @click="stopInventory(reader.api,reader.port)"
    >Stop
    </button>
  </div>
  <div class="reader__button">
    <button  @click="toggleIsShowForm">edit</button>
  </div>
  <div class="reader__button">
    <button disabled class="reader__disconnect">disconnect</button>
  </div>
  <ReaderForm v-if="isShowForm"
              :api="reader.ip"
              :port="reader.port"
              @close-form="toggleIsShowForm"
  />
</template>

<script>
import {computed, ref} from "vue";
import ReaderForm from "components/reader-ctrl/ReaderForm";
import {getStore} from "src/store";

export default {
  name: "${ COMPONENT_NAME }",
  props: ['reader'],
  components: {ReaderForm},
  setup(props) {
    const actionInventory = computed(() => {
      return props.reader.status === "NOT_INVENTORY" ? "start" : "stop";
    })
    const isShowForm = ref(false);
    const toggleIsShowForm = () => {
      isShowForm.value = !isShowForm.value
    }
    const startInventory = async (api, port) => {
      try {
        const result = await getStore().dispatch("readers/startInventory", {api, port})
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
    const stopInventory = async (api, port) => {
      try {
        const result = await getStore().dispatch("readers/stopInventory", {api, port})
        console.log(result);
      } catch (e) {
        console.log(e)
      }
    }
    return {
      actionInventory,
      isShowForm,
      toggleIsShowForm,
      startInventory,
      stopInventory,
    }
  },
}
</script>

<style lang="scss" scoped>
.reader {
  &__option {
    padding: 0 20px;
  }
}

button {
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.start {
}

.stop {
  margin-left: 15px;
  background: red;
}
</style>
