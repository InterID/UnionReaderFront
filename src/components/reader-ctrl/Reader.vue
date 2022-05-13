<template>
  <div class="reader__option reader__api">{{ reader.ip }}</div>
  <div class="reader__option reader__port">{{ reader.port }}</div>
  <div class="reader__option reader__status">{{ reader.status }}</div>
  <div class="reader__button">
    <button class="start"
            @click="connectCurrentReader(reader.ip,reader.port)"
    >connect
    </button>
    <button  class="reader__disconnect">disconnect</button>
  </div>
  <div class="reader__button">
    <button class="start"
            @click="startInventory(reader.ip,reader.port)"
    >start
    </button>
    <button
            @click="stopInventory(reader.ip,reader.port)"
    >stop
    </button>
  </div>
  <div class="reader__button">
    <button class="reader__delete"></button>
  </div>
  <ReaderForm v-if="isShowForm"
              :api="reader.ip"
              :port="reader.port"
              @close-form="toggleIsShowForm"
  />
</template>

<script>
import {ref} from "vue";
import ReaderForm from "components/reader-ctrl/ReaderForm";
import {getStore} from "src/store";

export default {
  name: "Reader",
  props: ['reader'],
  components: {ReaderForm},
  setup() {
    const isShowForm = ref(false);
    const toggleIsShowForm = () => {
      isShowForm.value = !isShowForm.value
    }
    const connectCurrentReader = (api, port) => {
      getStore().dispatch("readers/connectReader", {api, port})
    }
    const startInventory = (api, port) => {
      getStore().dispatch("readers/startInventory", {api, port})
    }
    const stopInventory = (api, port) => {
      getStore().dispatch("readers/stopInventory", {api, port})
    }
    return {
      isShowForm,
      toggleIsShowForm,
      startInventory,
      stopInventory,
      connectCurrentReader
    }
  },
}
</script>

<style lang="scss" scoped>
.reader {
  &__option {
    padding: 0 20px;
  }

  &__button {
    button {
      &:first-of-type {
        margin-right: 15px;
      }
    }
  }
  &__delete {
    margin-left: 15px;
    background: white;
    border-radius: 100%;
    background-image: url("../../assets/icons/bin.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px 20px;
    width: 33px;
    height: 33px;
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
  background: red;
}

</style>
